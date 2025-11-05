<template>
  <aside class="comments-sidebar">
    <!-- 评分概览 -->
    <div class="comments-panel">
      <h3 class="panel-title">Rating Overview</h3>
      <div class="rating-overview">
        <div class="rating-score">
          <span class="score">{{ averageRating.toFixed(1) }}</span>
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(averageRating) }">★</span>
          </div>
          <span class="total-count">({{ ratingStats.count }} reviews)</span>
        </div>
      </div>
    </div>

    <!-- 写评论 -->
    <div class="comments-panel">
      <h3 class="panel-title">Rate & Review</h3>
      <form @submit.prevent="submitReview" class="review-form">
        <div class="form-group">
          <label for="rating">Rating <span class="required">*</span></label>
          <div class="rating-input">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              @click="form.rating = i"
              @mouseenter="hoverRating = i"
              @mouseleave="hoverRating = 0"
              class="star-btn"
              :class="{ 
                active: i <= form.rating,
                hover: hoverRating > 0 && i <= hoverRating
              }"
            >
              ★
            </button>
            <span v-if="form.rating > 0" class="rating-hint">{{ form.rating }} star{{ form.rating > 1 ? 's' : '' }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="nickname">Nickname <span class="required">*</span></label>
          <input
            id="nickname"
            v-model="form.nickname"
            type="text"
            placeholder="Enter your nickname"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="comment">Comment <span class="required">*</span></label>
          <textarea
            id="comment"
            v-model="form.comment"
            placeholder="Share your thoughts about this game..."
            rows="4"
            class="form-textarea"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          :disabled="submitting || !canSubmit || !isFormValid"
          class="submit-btn"
          :class="{ disabled: submitting || !canSubmit || !isFormValid }"
        >
          {{ submitting ? 'Submitting...' : canSubmit ? 'Submit Review' : `Wait ${remainingTime}s` }}
        </button>
      </form>
    </div>

    <!-- 所有评论 -->
    <div class="comments-panel">
      <h3 class="panel-title">All Reviews</h3>
      <div v-if="loadingData" class="loading">Loading reviews...</div>
      <div v-else-if="reviews.length === 0" class="no-reviews">No reviews yet. Be the first to review!</div>
      <div v-else class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <span class="reviewer-name">{{ review.name }}</span>
            <div class="review-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">★</span>
            </div>
            <span class="review-date">{{ formatDate(review.timestamp) }}</span>
          </div>
          <div v-if="review.text" class="review-content">{{ review.text }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { commentAPI, ratingAPI } from '@/services/api.js'

// Props
const props = defineProps({
  gameId: {
    type: [String, Number],
    required: true
  }
})

// 响应式数据
const reviews = ref([])
const ratingStats = ref({ average: 0, count: 0, ratings: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } })
const loadingData = ref(false)
const submitting = ref(false)

// 表单数据
const form = ref({
  nickname: '',
  rating: 0,
  comment: ''
})

// 悬停评分
const hoverRating = ref(0)

// 提交限制
const lastSubmitTime = ref(null)
const canSubmit = ref(true)
const remainingTime = ref(0)
let timer = null

// 计算属性
const averageRating = computed(() => {
  const avg = ratingStats.value.average
  return typeof avg === 'number' ? avg : 0
})

// 表单验证
const isFormValid = computed(() => {
  return form.value.rating > 0 && 
         form.value.nickname?.trim() && 
         form.value.comment?.trim()
})


// 检查是否可以提交
function checkCanSubmit() {
  if (!lastSubmitTime.value) {
    canSubmit.value = true
    return
  }
  
  const now = Date.now()
  const timeDiff = now - lastSubmitTime.value
  const oneMinute = 60 * 1000
  
  if (timeDiff >= oneMinute) {
    canSubmit.value = true
    remainingTime.value = 0
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  } else {
    canSubmit.value = false
    remainingTime.value = Math.ceil((oneMinute - timeDiff) / 1000)
  }
}

// 开始倒计时
function startCountdown() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    checkCanSubmit()
  }, 1000)
}

// 加载评论和评分数据
const loadData = async () => {
  if (!props.gameId) return
  
  loadingData.value = true
  try {
    // 并行加载评论和评分数据
    const [commentsData, ratingsData] = await Promise.all([
      commentAPI.getComments(props.gameId),
      ratingAPI.getRatings(props.gameId)
    ])
    
    reviews.value = commentsData || []
    
    // 处理评分数据，确保数字类型
    if (ratingsData) {
      ratingStats.value = {
        average: parseFloat(ratingsData.average) || 0,
        count: parseInt(ratingsData.count) || 0,
        ratings: {
          '1': parseInt(ratingsData.ratings?.['1']) || 0,
          '2': parseInt(ratingsData.ratings?.['2']) || 0,
          '3': parseInt(ratingsData.ratings?.['3']) || 0,
          '4': parseInt(ratingsData.ratings?.['4']) || 0,
          '5': parseInt(ratingsData.ratings?.['5']) || 0
        }
      }
    } else {
      ratingStats.value = { average: 0, count: 0, ratings: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } }
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    // 如果API连接失败，设置默认值而不是崩溃
    reviews.value = []
    ratingStats.value = { average: 0, count: 0, ratings: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } }
  } finally {
    loadingData.value = false
  }
}

// 提交评论和评分（一起提交）
async function submitReview() {
  // 验证表单：必须填写所有字段
  if (!isFormValid.value || submitting.value) {
    if (!form.value.rating) {
      alert('Please select a rating')
      return
    }
    if (!form.value.nickname?.trim()) {
      alert('Please enter your nickname')
      return
    }
    if (!form.value.comment?.trim()) {
      alert('Please enter your comment')
      return
    }
    return
  }
  
  // 检查时间限制
  if (!canSubmit.value) {
    alert(`⏰ You can only submit once per minute. Please wait ${remainingTime.value} seconds before trying again.`)
    return
  }
  
  submitting.value = true
  
  try {
    // 提交评论（包含评分信息）
    const commentData = {
      pageId: props.gameId,
      name: form.value.nickname.trim(),
      text: form.value.comment.trim(),
      rating: form.value.rating
    }
    
    await commentAPI.submitComment(commentData)
    
    // 记录提交时间
    lastSubmitTime.value = Date.now()
    checkCanSubmit()
    startCountdown()
    
    // 清空表单
    form.value.nickname = ''
    form.value.rating = 0
    form.value.comment = ''
    
    // 重新加载数据
    await Promise.all([
      loadData(),
      ratingAPI.getRatings(props.gameId).then(data => {
        if (data) {
          ratingStats.value = {
            average: parseFloat(data.average) || 0,
            count: parseInt(data.count) || 0,
            ratings: {
              '1': parseInt(data.ratings?.['1']) || 0,
              '2': parseInt(data.ratings?.['2']) || 0,
              '3': parseInt(data.ratings?.['3']) || 0,
              '4': parseInt(data.ratings?.['4']) || 0,
              '5': parseInt(data.ratings?.['5']) || 0
            }
          }
        }
      })
    ])
    
    alert('✅ Review submitted successfully!')
  } catch (error) {
    console.error('提交失败:', error)
    if (error.message.includes('Failed to fetch')) {
      alert('❌ 无法连接到服务器，请检查网络连接或稍后重试。')
    } else {
      alert(`❌ 提交失败: ${error.message || '请稍后重试'}`)
    }
  } finally {
    submitting.value = false
  }
}

// 日期格式化
function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return dateString
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadData()
  checkCanSubmit()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 监听 gameId 变化
watch(() => props.gameId, () => {
  loadData()
})
</script>

<style scoped>
.comments-sidebar {
  width: 100%;
  max-width: 400px;
}

.comments-panel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}

.panel-title {
  color: #e8e8ee;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 评分概览样式 */
.rating-overview {
  text-align: center;
}

.rating-score {
  margin-bottom: 20px;
}

.score {
  font-size: 48px;
  font-weight: 700;
  color: #ffd700;
  display: block;
  margin-bottom: 8px;
}

.stars {
  font-size: 24px;
  color: #ffd700;
  margin-bottom: 8px;
}

.star {
  color: #444;
  margin-right: 2px;
}

.star.filled {
  color: #ffd700;
}

.total-count {
  color: #888;
  font-size: 14px;
}


/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #e8e8ee;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e8e8ee;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ffd700;
  background: rgba(255, 255, 255, 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.rating-input {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rating-hint {
  color: #ffd700;
  font-size: 14px;
  font-weight: 600;
}

.required {
  color: #ff6b6b;
  font-size: 12px;
}

.optional {
  color: #9ca3af;
  font-size: 12px;
  font-weight: normal;
}

.star-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #444;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 4px;
}

.star-btn:hover,
.star-btn.active,
.star-btn.hover {
  color: #ffd700;
}

.star-btn.hover {
  opacity: 0.7;
}

.submit-btn {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(.disabled) {
  background: linear-gradient(135deg, #ff5252, #ff7979);
  transform: translateY(-2px);
}

.submit-btn.disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
}

/* 评论列表样式 */
.loading,
.no-reviews {
  text-align: center;
  color: #888;
  padding: 20px;
  font-style: italic;
}

/* 评论列表自然展开，无高度限制 */

.review-item {
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.review-item:last-child {
  border-bottom: none;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.reviewer-name {
  color: #e8e8ee;
  font-weight: 600;
  font-size: 14px;
}

.review-rating {
  display: flex;
  gap: 2px;
}

.review-rating .star {
  font-size: 14px;
}

.review-date {
  color: #888;
  font-size: 12px;
}

.review-content {
  color: #ccc;
  font-size: 14px;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .comments-sidebar {
    max-width: 100%;
    padding: 0;
  }
  
  .comments-panel {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .review-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>


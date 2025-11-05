<template>
  <div class="admin-dashboard">
    <!-- 顶部：管理员信息和项目信息 -->
    <div class="admin-header">
      <div class="admin-info">
        <h1>管理后台</h1>
        <div class="admin-details">
          <span class="admin-name">欢迎，{{ adminInfo.username }}</span>
          <span class="project-info">项目：{{ adminInfo.project }}</span>
        </div>
      </div>
      <div class="admin-actions">
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
    </div>

    <!-- 主体内容：左右布局 -->
    <div class="admin-content">
      <!-- 左侧菜单 -->
      <div class="admin-sidebar">
        <nav class="admin-menu">
          <div 
            class="menu-item" 
            :class="{ active: activeTab === 'comments' }"
            @click="activeTab = 'comments'"
          >
            <span class="menu-icon">💬</span>
            <span class="menu-text">评论管理</span>
          </div>
          <div 
            class="menu-item" 
            :class="{ active: activeTab === 'ratings' }"
            @click="activeTab = 'ratings'"
          >
            <span class="menu-icon">⭐</span>
            <span class="menu-text">评分管理</span>
          </div>
        </nav>
      </div>

      <!-- 右侧内容区域 -->
      <div class="admin-main">
        <div class="content-header">
          <h2>{{ activeTab === 'comments' ? '游戏评论管理' : '游戏评分管理' }}</h2>
          <div class="stats-summary">
            <div class="stat-item">
              <span class="stat-number">{{ totalGames }}</span>
              <span class="stat-label">游戏</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalReviews }}</span>
              <span class="stat-label">评论</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalRatings }}</span>
              <span class="stat-label">评分</span>
            </div>
          </div>
        </div>

        <!-- 游戏列表 -->
        <div v-if="loading" class="loading">正在加载数据...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="games-list">
          <div v-if="Object.keys(gameData).length === 0" class="no-data">
            <p>暂无游戏数据。</p>
          </div>
          
          <div v-for="(data, pageId) in gameData" :key="pageId" class="game-card">
            <div class="game-header">
              <div class="game-info">
                <h3 class="game-title">{{ getGameTitle(pageId) }}</h3>
                <div class="game-stats">
                  <span class="rating-avg">平均：{{ calculateAverage(data.ratings) }}</span>
                  <span class="rating-count">{{ calculateTotal(data.ratings) }} 评分</span>
                  <span class="comment-count">{{ data.comments.length }} 评论</span>
                </div>
              </div>
              <button 
                v-if="activeTab === 'comments'"
                @click="openAddModal(pageId)" 
                class="add-review-btn"
              >
                + 添加评论/评分
              </button>
              <button 
                v-else
                @click="openRatingModal(pageId, data.ratings)" 
                class="add-review-btn"
              >
                + 管理评分
              </button>
            </div>

            <!-- 评论管理 -->
            <div v-if="activeTab === 'comments'" class="reviews-list">
              <div v-if="data.comments.length === 0" class="no-reviews">
                暂无评论
              </div>
              <div v-else>
                <div v-for="comment in data.comments" :key="comment.id" class="review-item">
                  <div class="review-content">
                    <div class="review-header">
                      <span class="reviewer-name">{{ comment.name }}</span>
                      <span class="review-time">{{ formatTime(comment.timestamp) }}</span>
                    </div>
                    <div v-if="comment.rating" class="review-rating">
                      <div class="rating-stars">
                        <span
                          v-for="n in 5"
                          :key="n"
                          class="star"
                          :class="{ filled: n <= comment.rating }"
                        >★</span>
                      </div>
                      <span class="rating-value">{{ comment.rating }}/5</span>
                    </div>
                    <div v-if="comment.text" class="review-text">{{ comment.text }}</div>
                    <div v-if="!comment.text && comment.rating" class="review-text-only-rating">仅评分，无评论</div>
                  </div>
                  <div class="review-actions">
                    <button @click="openEditModal(pageId, comment)" class="edit-btn">
                      编辑
                    </button>
                    <button @click="deleteReview(pageId, comment.id)" class="delete-btn">
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 评分管理 -->
            <div v-else class="ratings-management">
              <div class="ratings-summary">
                <div class="summary-item">
                  <span class="summary-label">总评分：</span>
                  <span class="summary-value">{{ calculateTotal(data.ratings) }}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">平均分：</span>
                  <span class="summary-value">{{ calculateAverage(data.ratings) }}</span>
                </div>
              </div>
              
              <div class="ratings-breakdown">
                <div 
                  v-for="rating in [5, 4, 3, 2, 1]" 
                  :key="rating" 
                  class="rating-row"
                >
                  <span class="rating-label">{{ rating }} 星</span>
                  <span class="rating-count-display">{{ data.ratings[rating] || 0 }}</span>
                  <button 
                    @click="openRatingEditModal(pageId, rating, data.ratings[rating] || 0)"
                    class="edit-rating-btn"
                  >
                    编辑
                  </button>
                </div>
              </div>
              
              <div class="ratings-actions">
                <button 
                  @click="openRatingModal(pageId, data.ratings)" 
                  class="manage-all-ratings-btn"
                >
                  批量修改评分数量
                </button>
                <button 
                  @click="openAddRatingModal(pageId)" 
                  class="add-single-rating-btn"
                >
                  添加单个评分
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 批量修改评分弹窗 -->
    <div v-if="showRatingModal" class="modal-overlay" @click="showRatingModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>批量修改评分数量</h3>
          <button @click="showRatingModal = false" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>游戏：{{ getGameTitle(ratingModalData.pageId) }}</label>
          </div>
          <div 
            v-for="rating in [5, 4, 3, 2, 1]" 
            :key="rating" 
            class="form-group"
          >
            <label>{{ rating }} 星评分数量</label>
            <input
              :value="ratingModalData.ratingCounts[rating]"
              @input="handleRatingInput(rating, $event)"
              type="number"
              min="0"
              class="form-input"
            />
            <small style="color: #666; font-size: 12px;">当前值: {{ ratingModalData.ratingCounts[rating] }}</small>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showRatingModal = false" class="cancel-btn">取消</button>
          <button @click="saveRatings" class="save-btn">保存</button>
        </div>
      </div>
    </div>

    <!-- 编辑单个评分弹窗 -->
    <div v-if="showRatingEditModal" class="modal-overlay" @click="showRatingEditModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ singleRatingEdit.count === 0 ? '添加评分' : '编辑评分' }}</h3>
          <button @click="showRatingEditModal = false" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>游戏：{{ getGameTitle(singleRatingEdit.pageId) }}</label>
          </div>
          <div class="form-group">
            <label>评分等级</label>
            <select v-model.number="singleRatingEdit.rating" class="form-input">
              <option :value="5">5 星</option>
              <option :value="4">4 星</option>
              <option :value="3">3 星</option>
              <option :value="2">2 星</option>
              <option :value="1">1 星</option>
            </select>
          </div>
          <div class="form-group">
            <label>数量</label>
            <input
              v-model.number="singleRatingEdit.count"
              type="number"
              min="0"
              class="form-input"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showRatingEditModal = false" class="cancel-btn">取消</button>
          <button @click="saveSingleRating" class="save-btn">保存</button>
        </div>
      </div>
    </div>

    <!-- 添加/编辑评论弹窗 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? '编辑评论/评分' : '添加评论/评分' }}</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>游戏：{{ getGameTitle(currentPageId) }}</label>
          </div>
          
          <div class="form-group">
            <label for="review-rating">评分 <span class="required">*</span></label>
            <div class="rating-input">
              <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ filled: n <= modalForm.rating }"
                @click="modalForm.rating = n"
              >{{ n <= modalForm.rating ? '★' : '☆' }}</span>
            </div>
            <span class="rating-selected">{{ modalForm.rating }}/5 星</span>
          </div>
          
          <div class="form-group">
            <label for="reviewer-name">姓名 <span class="optional">(可选)</span></label>
            <input
              id="reviewer-name"
              v-model="modalForm.name"
              type="text"
              placeholder="请输入评论者姓名（可选，默认：Anonymous）"
            />
          </div>
          
          <div class="form-group">
            <label for="review-text">评论内容 <span class="optional">(可选)</span></label>
            <textarea
              id="review-text"
              v-model="modalForm.text"
              rows="4"
              placeholder="请输入评论内容（可选）"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="review-time">评论时间</label>
            <input
              id="review-time"
              v-model="modalForm.timestamp"
              type="datetime-local"
              :placeholder="getCurrentDateTime()"
            />
            <small class="form-hint">不选择则使用当前时间</small>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="saveReview" class="save-btn" :disabled="!isFormValid">
            {{ isEditing ? '更新' : '添加' }}{{ modalForm.text ? '评论' : '评分' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminAPI } from '@/services/api.js'
import { games } from '@/data/games.js'

const router = useRouter()

// 响应式数据
const loading = ref(true)
const error = ref('')
const gameData = ref({})
const showModal = ref(false)
const isEditing = ref(false)
const currentPageId = ref('')
const currentCommentId = ref(null)
const activeTab = ref('comments')

// 评分管理相关
const showRatingModal = ref(false)
const showRatingEditModal = ref(false)
const ratingModalData = ref({
  pageId: '',
  ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } // 使用数字键以便绑定
})
const singleRatingEdit = ref({
  pageId: '',
  rating: 0,
  count: 0
})

// 管理员信息
const adminInfo = ref({
  username: 'admin',
  project: 'Tower Jump'
})

// 弹窗表单
const modalForm = ref({
  name: '',
  rating: 0,
  text: '',
  timestamp: ''
})

// 计算属性
const totalGames = computed(() => Object.keys(gameData.value).length)

const totalReviews = computed(() => {
  return Object.values(gameData.value).reduce((total, data) => {
    return total + data.comments.length
  }, 0)
})

const totalRatings = computed(() => {
  return Object.values(gameData.value).reduce((total, data) => {
    return total + calculateTotal(data.ratings)
  }, 0)
})

const isFormValid = computed(() => {
  // 只要求评分必须，姓名和评论内容可选
  return modalForm.value.rating > 0
})

// 方法
const fetchGameData = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    const data = await adminAPI.getAllGameData(token)
    gameData.value = data || {}
  } catch (err) {
    error.value = '加载数据失败：' + err.message
  } finally {
    loading.value = false
  }
}

const getGameTitle = (pageId) => {
  // 根据pageId从games数据中获取游戏标题
  const game = games.find(g => g.addressBar === pageId)
  return game ? game.title : (pageId || '未知游戏')
}

const getCurrentDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const calculateAverage = (ratings) => {
  const total = calculateTotal(ratings)
  if (total === 0) return '0.0'
  
  const sum = Object.entries(ratings).reduce((acc, [rating, count]) => {
    return acc + (parseInt(rating) * count)
  }, 0)
  
  return (sum / total).toFixed(1)
}

const calculateTotal = (ratings) => {
  return Object.values(ratings).reduce((total, count) => total + count, 0)
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openAddModal = (pageId) => {
  currentPageId.value = pageId
  isEditing.value = false
  currentCommentId.value = null
  modalForm.value = {
    name: '',
    rating: 0,
    text: '',
    timestamp: getCurrentDateTime()
  }
  showModal.value = true
}

const openEditModal = (pageId, comment) => {
  currentPageId.value = pageId
  isEditing.value = true
  currentCommentId.value = comment.id
  
  // 格式化时间用于datetime-local输入
  let formattedTime = ''
  if (comment.timestamp) {
    const date = new Date(comment.timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    formattedTime = `${year}-${month}-${day}T${hours}:${minutes}`
  } else {
    formattedTime = getCurrentDateTime()
  }
  
  modalForm.value = {
    name: comment.name,
    rating: comment.rating || 0,
    text: comment.text,
    timestamp: formattedTime
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalForm.value = {
    name: '',
    rating: 0,
    text: '',
    timestamp: ''
  }
}

const saveReview = async () => {
  if (!isFormValid.value) return
  
  try {
    const token = localStorage.getItem('adminToken')
    
    // 处理时间：如果用户选择了时间则使用选择的时间，否则使用当前时间
    let finalTimestamp
    if (modalForm.value.timestamp && modalForm.value.timestamp.trim()) {
      finalTimestamp = new Date(modalForm.value.timestamp).toISOString()
    } else {
      finalTimestamp = new Date().toISOString()
    }
    
    const reviewData = {
      pageId: currentPageId.value,
      name: modalForm.value.name?.trim() || 'Anonymous',
      text: modalForm.value.text?.trim() || null,
      rating: modalForm.value.rating > 0 ? modalForm.value.rating : null,
      timestamp: finalTimestamp
    }
    
    if (isEditing.value) {
      // 编辑逻辑 - 直接更新
      await adminAPI.updateFeedback(currentPageId.value, currentCommentId.value, reviewData, token)
    } else {
      // 添加逻辑
      await adminAPI.addManualFeedback(reviewData, token)
    }
    
    closeModal()
    await fetchGameData() // 重新加载数据
  } catch (err) {
    alert('保存评论失败：' + err.message)
  }
}

const deleteReview = async (pageId, commentId) => {
  if (!confirm('确定要删除这条评论吗？')) return
  
  try {
    const token = localStorage.getItem('adminToken')
    await adminAPI.deleteFeedback(pageId, commentId, token)
    await fetchGameData() // 重新加载数据
  } catch (err) {
    alert('删除评论失败：' + err.message)
  }
}

const logout = () => {
  localStorage.removeItem('adminToken')
  router.push('/admin/login')
}

// 评分管理方法
const openRatingModal = (pageId, ratings) => {
  console.log('打开评分弹窗 - pageId:', pageId, 'ratings:', ratings)
  ratingModalData.value = {
    pageId,
    ratingCounts: {
      1: parseInt(ratings['1']) || 0,
      2: parseInt(ratings['2']) || 0,
      3: parseInt(ratings['3']) || 0,
      4: parseInt(ratings['4']) || 0,
      5: parseInt(ratings['5']) || 0
    }
  }
  console.log('设置后的 ratingModalData:', ratingModalData.value)
  showRatingModal.value = true
}

// 处理评分输入
const handleRatingInput = (rating, event) => {
  const rawValue = event.target.value
  const value = rawValue === '' ? 0 : parseInt(rawValue) || 0
  // 确保响应式更新
  if (!ratingModalData.value.ratingCounts) {
    ratingModalData.value.ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  }
  ratingModalData.value.ratingCounts[rating] = value
  // 触发响应式更新
  ratingModalData.value = { ...ratingModalData.value }
  console.log(`评分输入 - ${rating}星:`, value, '当前 ratingCounts:', JSON.parse(JSON.stringify(ratingModalData.value.ratingCounts)))
}

const openRatingEditModal = (pageId, rating, count) => {
  singleRatingEdit.value = {
    pageId,
    rating,
    count
  }
  showRatingEditModal.value = true
}

const openAddRatingModal = (pageId) => {
  singleRatingEdit.value = {
    pageId,
    rating: 5,
    count: 1
  }
  showRatingEditModal.value = true
}

const saveRatings = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    // 确保所有评分数量都是整数，并转换为字符串键（API需要）
    const ratingCounts = {
      '1': parseInt(ratingModalData.value.ratingCounts[1]) || 0,
      '2': parseInt(ratingModalData.value.ratingCounts[2]) || 0,
      '3': parseInt(ratingModalData.value.ratingCounts[3]) || 0,
      '4': parseInt(ratingModalData.value.ratingCounts[4]) || 0,
      '5': parseInt(ratingModalData.value.ratingCounts[5]) || 0
    }
    
    console.log('准备发送评分数据 - ratingModalData:', JSON.stringify(ratingModalData.value, null, 2))
    console.log('ratingModalData.value.ratingCounts:', ratingModalData.value.ratingCounts)
    console.log('ratingModalData.value.ratingCounts 原始值:', {
      1: ratingModalData.value.ratingCounts[1],
      2: ratingModalData.value.ratingCounts[2],
      3: ratingModalData.value.ratingCounts[3],
      4: ratingModalData.value.ratingCounts[4],
      5: ratingModalData.value.ratingCounts[5]
    })
    console.log('发送评分数据 (字符串键):', ratingCounts)
    console.log('发送评分数据 (JSON):', JSON.stringify(ratingCounts))
    
    // 验证数据
    const total = Object.values(ratingCounts).reduce((sum, val) => sum + val, 0)
    if (total === 0) {
      alert('请至少输入一个评分数量！')
      return
    }
    
    const response = await adminAPI.updateRatings(ratingModalData.value.pageId, ratingCounts, token)
    console.log('API 响应:', response)
    
    showRatingModal.value = false
    await fetchGameData()
    alert('评分更新成功！')
  } catch (err) {
    console.error('更新评分失败:', err)
    alert('更新评分失败：' + err.message)
  }
}

const saveSingleRating = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    // 获取当前的评分数据
    const currentData = gameData.value[singleRatingEdit.value.pageId]
    const currentRatings = currentData?.ratings || { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
    
    // 创建新的评分数据，确保所有值都是数字
    const newRatings = {
      '1': parseInt(currentRatings['1']) || 0,
      '2': parseInt(currentRatings['2']) || 0,
      '3': parseInt(currentRatings['3']) || 0,
      '4': parseInt(currentRatings['4']) || 0,
      '5': parseInt(currentRatings['5']) || 0
    }
    // 更新当前编辑的等级，确保是整数
    newRatings[String(singleRatingEdit.value.rating)] = parseInt(singleRatingEdit.value.count) || 0
    
    console.log('发送单个评分数据:', newRatings)
    // 使用批量更新API
    const response = await adminAPI.updateRatings(singleRatingEdit.value.pageId, newRatings, token)
    console.log('API 响应:', response)
    
    showRatingEditModal.value = false
    await fetchGameData()
    alert('评分更新成功！')
  } catch (err) {
    console.error('更新评分失败:', err)
    alert('更新评分失败：' + err.message)
  }
}

// 生命周期
onMounted(() => {
  fetchGameData()
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #f8fafc;
}

/* 顶部管理员信息 */
.admin-header {
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.admin-info h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.admin-details {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.9;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
}

.logout-btn:hover {
  background: #dc2626;
}

/* 主体内容 */
.admin-content {
  display: flex;
  min-height: calc(100vh - 80px);
}

/* 左侧菜单 */
.admin-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 1rem 0;
}

.admin-menu {
  padding: 0 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item.active {
  background: #3b82f6;
  color: white;
}

.menu-item:hover:not(.active) {
  background: #f1f5f9;
}

.menu-icon {
  font-size: 1.25rem;
}

.menu-text {
  font-weight: 500;
}

/* 右侧内容 */
.admin-main {
  flex: 1;
  padding: 2rem;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.875rem;
  font-weight: 600;
}

.stats-summary {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 游戏列表 */
.games-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.game-card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.game-title {
  margin: 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
}

.game-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.add-review-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
}

.add-review-btn:hover {
  background: #059669;
}

/* 评论列表 */
.reviews-list {
  padding: 1.5rem;
}

.no-reviews {
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 2rem;
}

.review-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: #f8fafc;
}

.review-content {
  flex: 1;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
  color: #1e293b;
}

.review-time {
  font-size: 0.875rem;
  color: #64748b;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars .star {
  color: #d1d5db;
  font-size: 1rem;
}

.rating-stars .star.filled {
  color: #f59e0b;
}

.rating-value {
  font-size: 0.875rem;
  color: #64748b;
}

.review-text {
  color: #374151;
  line-height: 1.5;
}

.review-text-only-rating {
  color: #9ca3af;
  margin-top: 8px;
  font-style: italic;
  font-size: 14px;
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

.review-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.edit-btn, .delete-btn {
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}

.edit-btn {
  background: #3b82f6;
  color: white;
}

.edit-btn:hover {
  background: #2563eb;
}

.delete-btn {
  background: #ef4444;
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #1e293b;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
}

.rating-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-input .star {
  font-size: 1.5rem;
  cursor: pointer;
  color: #d1d5db;
  transition: color 0.2s;
}

.rating-input .star.filled {
  color: #f59e0b;
}

.rating-selected {
  font-size: 0.875rem;
  color: #059669;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.cancel-btn, .save-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cancel-btn {
  background: #f1f5f9;
  color: #64748b;
}

.cancel-btn:hover {
  background: #e2e8f0;
}

.save-btn {
  background: #3b82f6;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #2563eb;
}

.save-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* 加载和错误状态 */
.loading, .error, .no-data {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}

.error {
  color: #ef4444;
}

/* 评分管理样式 */
.ratings-management {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.ratings-summary {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.ratings-breakdown {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.rating-row:last-child {
  border-bottom: none;
}

.rating-label {
  min-width: 60px;
  font-weight: 500;
  color: #1e293b;
}

.rating-count-display {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3b82f6;
}

.edit-rating-btn {
  padding: 0.375rem 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.edit-rating-btn:hover {
  background: #2563eb;
}

.ratings-actions {
  display: flex;
  gap: 1rem;
}

.manage-all-ratings-btn,
.add-single-rating-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

.manage-all-ratings-btn {
  background: #3b82f6;
  color: white;
}

.manage-all-ratings-btn:hover {
  background: #2563eb;
}

.add-single-rating-btn {
  background: #10b981;
  color: white;
}

.add-single-rating-btn:hover {
  background: #059669;
}
</style>

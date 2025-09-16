<template>
  <div class="home">
    <header class="site-header">
      <div class="container">
        <div class="brand">
          <img src="/images/logo.png" alt="Tower Jump Logo" class="logo" />
          <span class="brand-text">Tower Jump</span>
        </div>
        <nav class="nav" aria-label="Main navigation">
          <a href="/" class="nav-link" @click.prevent="scrollTo('game')">Game</a>
          <a href="/" class="nav-link" @click.prevent="scrollTo('about')">About</a>
          <a href="/" class="nav-link" @click.prevent="scrollTo('faq')">FAQ</a>
        </nav>
      </div>
    </header>

    <main>
      <div class="container">
        <section class="game-layout">
            <div class="game-content" :class="{ 'page-fullscreen': isPageFullscreen }">
            <section ref="gameRef" class="game-section">
              <h1 class="game-title">Play {{ currentGame?.title || 'Tower Jump' }} Online</h1>
              <p class="game-subtitle">Lightweight, fast, play instantly</p>
              <div class="game-iframe-container">
                <div class="game-iframe-wrapper">
                  <iframe v-if="isPlaying" ref="gameIframe" class="game-iframe" :src="iframeSrc" :title="currentGame?.title || 'Game'"
                    allowfullscreen @load="onFrameLoad"></iframe>

                  <div v-if="!isPlaying" class="game-play-overlay">
                    <div class="overlay-backdrop"></div>
                    <div class="overlay-content">
                      <img class="overlay-logo" :src="currentGame?.imageUrl || '/images/logo.png'" alt="Game logo"
                        width="96" height="96" />
                      <button type="button" class="play-button" aria-label="Play game" title="Play" @click="startPlay">
                        <svg class="play-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M8 5v14l11-7z" fill="currentColor" />
                        </svg>
                        <span class="play-text">PLAY</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 操作栏：左标题，右侧全屏/网页全屏按钮 -->
              <div class="game-controls">
                <div class="controls-title">{{ currentGame?.title || 'Tower Jump' }}</div>
                <div class="controls-actions">
                  <button
                    class="control-btn"
                    @click="toggleFullscreen"
                    title="Fullscreen"
                    aria-label="Fullscreen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </button>
                  <button
                    class="control-btn"
                    @click="togglePageFullscreen"
                    title="Page Fullscreen"
                    aria-label="Page Fullscreen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            <section ref="aboutRef" class="about-section">
              <h2 class="section-title">About {{ currentGame?.title || 'Tower Jump' }}</h2>
              <div class="about-content" v-html="currentGame?.detailsHtml"></div>
            </section>
          </div>

          <aside class="comments-sidebar">
            <GameReviews :game-id="currentGame?.id || 1" />
          </aside>
        </section>

        <section class="section-games">
          <h2 class="section-title">More Games</h2>
          <GameList />
        </section>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container">
        <span class="copyright">© {{ new Date().getFullYear() }} {{ currentGame?.title || 'Tower Jump' }}</span>
        <a href="/" class="back-to-top" aria-label="Back to top" @click.prevent="scrollToTop">Back to Top ↑</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { games } from '@/data/games.js'
import GameList from '@/components/GameList.vue'
import GameReviews from '@/components/GameReviews.vue'

const route = useRoute()
const router = useRouter()

// 游戏相关状态
const isPlaying = ref(false)
const iframeSrc = ref('')
const isPageFullscreen = ref(false)
const gameIframe = ref(null)

// 当前游戏（根据路由参数或默认第一个游戏）
const currentGame = ref(null)

// 模板引用
const gameRef = ref(null)
const aboutRef = ref(null)





// 游戏切换功能
function switchGame(game) {
  if (!game || !game.addressBar) return

  // 更新URL - 第一个游戏使用根路径，其他游戏直接使用addressBar
  const isFirstGame = games[0] && games[0].addressBar === game.addressBar
  const newPath = isFirstGame ? '/' : `/${game.addressBar}`
  router.push(newPath)

  // 切换游戏
  currentGame.value = game
}







// 初始化当前游戏
function initializeGame() {
  const addressBar = route.params.addressBar || 'tower-jump'
  const game = games.find(g => g.addressBar === addressBar)

  if (game) {
    currentGame.value = game
  } else {
    // 如果没找到游戏，使用第一个游戏
    currentGame.value = games[0] || null
  }
}

// 游戏播放控制
function startPlay() {
  if (isPlaying.value) return
  iframeSrc.value = currentGame.value?.iframeUrl || '/TowerJump.html'
  isPlaying.value = true
}

// 浏览器全屏（iframe 元素）
function toggleFullscreen() {
  if (!gameIframe.value) return
  if (!document.fullscreenElement) {
    gameIframe.value.requestFullscreen?.().catch(() => { })
  } else {
    document.exitFullscreen?.()
  }
}

// 网页全屏（铺满视口）
function togglePageFullscreen() {
  if (isPageFullscreen.value) {
    exitPageFullscreen()
  } else {
    enterPageFullscreen()
  }
}

async function enterPageFullscreen() {
  isPageFullscreen.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  // 调整 iframe 样式以适应视口
  setTimeout(() => {
    if (gameIframe.value) {
      gameIframe.value.style.width = '100%'
      gameIframe.value.style.height = '100%'
      gameIframe.value.style.objectFit = 'contain'
    }
  }, 50)
}

async function exitPageFullscreen() {
  isPageFullscreen.value = false
  document.body.style.overflow = 'auto'
  await nextTick()
  setTimeout(() => {
    if (gameIframe.value) {
      gameIframe.value.style.width = '100%'
      gameIframe.value.style.height = '100%'
      gameIframe.value.style.objectFit = 'cover'
    }
  }, 50)
}

function onFrameLoad(event) {
  const el = event?.target
  if (el && el.classList) {
    el.classList.add('is-loaded')
  }
}

// 滚动到指定部分
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
const supportsSmooth =
  typeof document !== 'undefined' &&
  document.documentElement &&
  'scrollBehavior' in document.documentElement.style

function getHeaderHeight() {
  const header = document.querySelector('.site-header')
  return header ? header.getBoundingClientRect().height : 0
}

function scrollTo(name) {
  if (name === 'faq') {
    // FAQ 现在在 About 部分中，查找 FAQ 锚点
    const faqElement = document.querySelector('#faq')
    if (faqElement) {
      const rect = faqElement.getBoundingClientRect()
      const top = rect.top + window.scrollY - getHeaderHeight() - 8
      const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
      window.scrollTo({ top, behavior })
      return
    }
  }

  const map = { game: gameRef, about: aboutRef }
  const targetRef = map[name]
  const el = targetRef?.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const top = rect.top + window.scrollY - getHeaderHeight() - 8
  const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
  window.scrollTo({ top, behavior })
}

function scrollToTop() {
  const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
}

// 监听路由变化
watch(() => route.params.addressBar, (newAddressBar) => {
  if (newAddressBar) {
    const game = games.find(g => g.addressBar === newAddressBar)
    if (game) {
      currentGame.value = game
    }
  }
})

onMounted(async () => {
  // 初始化游戏
  initializeGame()

  // 初始化完成
})

onUnmounted(() => {
  if (isPageFullscreen.value) exitPageFullscreen()
})
</script>

<style scoped>
.home {
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 15, 20, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}


.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.brand-text {
  font-size: 18px;
  background: linear-gradient(135deg, #ff6b6b, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #cfd3ff;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 6px;
}

.nav-link:hover {
  background: rgba(207, 211, 255, 0.12);
}

/* 游戏布局 */
.game-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  padding: 20px;
  min-height: calc(100vh - 64px);
}

.game-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section {
  padding: 56px 0;
}

.game-section .game-title {
  font-size: 28px;
}

.subtitle {
  opacity: 0.8;
  margin-top: 6px;
  margin-bottom: 16px;
}

.game-iframe-container {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 520px;
  border-radius: 14px;
  overflow: hidden;
  background: #111319;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.game-iframe-wrapper {
  position: absolute;
  inset: 0;
}

.game-iframe-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.game-iframe {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.game-iframe.is-loaded {
  opacity: 1;
}

/* 游戏控制栏 */
.game-controls {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.controls-title {
  font-weight: 600;
  color: #e8e8ee;
  font-size: 14px;
}

.controls-actions {
  display: flex;
  gap: 8px;
}

.control-btn {
  height: 36px;
  min-width: 36px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #e8e8ee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.control-btn:active {
  transform: translateY(0);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 网页全屏样式 */
.game-content.page-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #1a1a1a;
  padding: 8px;
  border-radius: 0;
}

.game-content.page-fullscreen .game-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-content.page-fullscreen .game-title,
.game-content.page-fullscreen .game-subtitle {
  display: none;
}

.game-content.page-fullscreen .game-iframe-container {
  height: calc(100vh - 60px);
  border-radius: 8px;
  flex: 1;
}

.game-content.page-fullscreen .game-iframe-wrapper {
  height: 100%;
}

.game-content.page-fullscreen .game-iframe {
  height: 100%;
  object-fit: contain;
}

/* 网页全屏时隐藏其他内容 */
.game-content.page-fullscreen .about-section {
  display: none;
}

/* 网页全屏时隐藏右侧评论栏 */
.game-content.page-fullscreen ~ .comments-sidebar {
  display: none;
}

/* 网页全屏时隐藏游戏列表 */
.game-content.page-fullscreen ~ .section-games {
  display: none;
}

.game-play-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(17, 19, 25, 0.45);
  z-index: 2;
}

.overlay-backdrop {
  position: absolute;
  inset: 0;
  backdrop-filter: saturate(140%) blur(14px);
  -webkit-backdrop-filter: saturate(140%) blur(14px);
  z-index: 1;
}

.overlay-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 3;
}

.overlay-logo {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  object-fit: cover;
}

.play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 56px;
  padding: 0 24px;
  border: none;
  border-radius: 999px;
  background: #ff7aa2;
  color: #1b1120;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 10px 24px rgba(255, 122, 162, 0.35);
}

.play-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.play-btn:active {
  transform: translateY(0) scale(0.98);
}

.play-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35), 0 10px 24px rgba(255, 122, 162, 0.35);
}

.play-btn .icon {
  width: 20px;
  height: 20px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.lead {
  line-height: 1.9;
  opacity: 0.97;
  max-width: 65ch;
  margin-bottom: 10px;
}

.feature-list {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.feature-list li {
  position: relative;
  list-style: none;
  padding: 10px 12px 10px 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  line-height: 1.8;
  font-weight: 550;
}

.feature-list li:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

.section-faq {
  padding-top: 40px;
}

.faq-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 12px;
}

.faq-q {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.faq-content {
  margin-top: 8px;
  opacity: 0.95;
  line-height: 1.8;
}

/* 评论评分侧栏 */
.comments-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comments-panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  color: #e8e8ee;
}

.comments-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #cfd3ff;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.rating-score {
  font-size: 24px;
  font-weight: 700;
  color: #ff7aa2;
}

.rating-stars .star {
  color: #d1d5db;
  font-size: 18px;
  margin-right: 2px;
}

.rating-stars .star.filled {
  color: #f59e0b;
}

.rating-count {
  font-size: 14px;
  color: #9ca3af;
}

.rating-distribution {
  margin-top: 12px;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.rating-label {
  width: 30px;
  color: #9ca3af;
}

.bar-container {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #f59e0b;
  transition: width 0.3s ease;
}

.rating-count {
  width: 20px;
  text-align: right;
  color: #9ca3af;
}

/* 表单样式 */
.form-field {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #cfd3ff;
  margin-bottom: 8px;
  font-weight: 500;
}

.required {
  color: #ff7aa2;
}

.form-input,
.form-textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #e8e8ee;
  font-size: 14px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ff7aa2;
  background: rgba(255, 255, 255, 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

.stars-input {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}

.stars-input .star {
  font-size: 20px;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.2s;
}

.stars-input .star.filled {
  color: #f59e0b;
}

.stars-input .star.hover {
  color: #fbbf24;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #ff7aa2;
  color: #1b1120;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #ff6b9d;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 评论列表样式 */
.reviews-list {
  max-height: 400px;
  overflow-y: auto;
}

.review-item {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
  margin-top: 12px;
}

.review-item:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.review-name {
  color: #cfd3ff;
  font-weight: 600;
  font-size: 14px;
}

.review-date {
  color: #9ca3af;
  font-size: 12px;
}

.review-rating {
  margin-bottom: 8px;
}

.review-stars {
  display: flex;
  gap: 2px;
}

.review-stars .star {
  font-size: 14px;
  color: #d1d5db;
}

.review-stars .star.filled {
  color: #f59e0b;
}

.review-text {
  color: #e8e8ee;
  line-height: 1.6;
  font-size: 14px;
}

.loading-text {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
  font-style: italic;
}

.no-reviews {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
  font-style: italic;
}

/* 页脚样式 */
.site-footer {
  margin-top: auto;
  padding: 24px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: #0f0f14;
}

.site-footer .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 0.85;
}

.back-to-top {
  color: #cfd3ff;
  text-decoration: none;
}

.back-top:hover {
  color: #ff7aa2;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .game-layout {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .comments-sidebar {
    max-height: none;
  }

  .header-inner {
    height: 56px;
  }

  .section {
    padding: 40px 0;
  }

  .game-iframe-container {
    height: 65vh;
    min-height: 460px;
  }

  .overlay-logo {
    width: 84px;
    height: 84px;
  }

  .play-button {
    height: 52px;
    padding: 0 22px;
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .game-layout {
    padding: 16px;
  }

  .section {
    padding: 20px 0;
  }

  .game-section .game-title {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .faq-q {
    font-size: 16px;
  }

  .lead,
  .faq-content {
    font-size: 12px;
  }

  .nav-link,
  .back-to-top {
    font-size: 12px;
  }

  .game-iframe-container {
    height: 60vh;
    min-height: 380px;
  }

  .overlay-logo {
    width: 72px;
    height: 72px;
  }

  .play-button {
    height: 48px;
    padding: 0 20px;
    font-size: 14px;
  }

  .comments-panel {
    padding: 12px;
  }

  .comments-title {
    font-size: 14px;
  }
}

.rating {
  font-size: 18px;
  color: #333;
}

.muted {
  color: #666;
  /* 次要文字 */
}

.small {
  font-size: 12px;
}

.reviews {
  display: grid;
  gap: 8px;
  padding-left: 18px;
}

.review-skeleton {
  color: #333;
}

.btn.wide {
  width: 100%;
  margin-top: 8px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-text {
  text-align: center;
  color: #666;
  padding: 10px;
  font-size: 14px;
}

.no-reviews {
  text-align: center;
  color: #666;
  padding: 20px;
  font-style: italic;
}

.quick-rating {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.quick-rating-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.quick-rating-stars {
  display: flex;
  gap: 4px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
  padding: 2px;
}

.star-btn:hover {
  opacity: 0.7;
}

.star-btn.active {
  opacity: 1;
}

.star-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 评分分布样式 */
.rating-distribution {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.rating-label {
  width: 30px;
  color: #666;
}

.bar-container {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #f59e0b;
  transition: width 0.3s ease;
}

.rating-count {
  width: 20px;
  text-align: right;
  color: #666;
}

/* 无评分数据样式 */
.no-ratings {
  text-align: center;
  padding: 12px;
  color: #666;
  font-style: italic;
}

/* 评分选择提示 */
.rating-selected {
  margin-top: 6px;
  font-size: 12px;
  color: #059669;
  font-weight: 500;
}

/* 评论中的评分显示 */
.review-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 0;
  font-size: 12px;
}

.review-rating-label {
  color: #666;
}

.review-stars {
  display: flex;
  gap: 2px;
}

/* 自适应 */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

/* 深色模式下也保持浅灰背景与 #333 文本，确保风格一致 */
@media (prefers-color-scheme: dark) {

  .main,
  .panel,
  .btn,
  .controls,
  .iframe-wrap,
  .player {
    background: #f3f4f6;
    border-color: #2a2b31;
  }

  .controls .title,
  .panel-title,
  .rating,
  .review-skeleton,
  .about {
    color: #333;
  }

  .muted {
    color: #666;
  }
}

/* v-html 内容样式 */
.about-content {
  color: #e8e8ee;
  line-height: 1.7;
  font-size: 16px;
}

.about-content :deep(h1),
.about-content :deep(h2),
.about-content :deep(h3),
.about-content :deep(h4),
.about-content :deep(h5),
.about-content :deep(h6) {
  color: #e8e8ee;
  margin: 24px 0 16px 0;
  font-weight: 600;
  line-height: 1.3;
}

.about-content :deep(h1) {
  font-size: 28px;
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
}

.about-content :deep(h2) {
  font-size: 24px;
  border-bottom: 1px solid #333;
  padding-bottom: 6px;
}

.about-content :deep(h3) {
  font-size: 20px;
  color: #d1d5db;
}

.about-content :deep(h4) {
  font-size: 18px;
  color: #d1d5db;
}

.about-content :deep(h5) {
  font-size: 16px;
  color: #d1d5db;
}

.about-content :deep(h6) {
  font-size: 14px;
  color: #d1d5db;
}

.about-content :deep(p) {
  margin: 16px 0;
  color: #e8e8ee;
  line-height: 1.7;
}

.about-content :deep(ul),
.about-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.about-content :deep(li) {
  margin: 8px 0;
  color: #e8e8ee;
  line-height: 1.6;
}

.about-content :deep(strong),
.about-content :deep(b) {
  color: #f3f4f6;
  font-weight: 600;
}

.about-content :deep(em),
.about-content :deep(i) {
  color: #d1d5db;
  font-style: italic;
}

.about-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  color: #fbbf24;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.about-content :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  color: #e8e8ee;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid #333;
}

.about-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

.about-content :deep(blockquote) {
  border-left: 4px solid #333;
  margin: 16px 0;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.02);
  color: #d1d5db;
  font-style: italic;
}

.about-content :deep(a) {
  color: #60a5fa;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.about-content :deep(a:hover) {
  color: #93c5fd;
  border-bottom-color: #60a5fa;
}

.about-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.about-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  overflow: hidden;
}

.about-content :deep(th),
.about-content :deep(td) {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #333;
}

.about-content :deep(th) {
  background: rgba(255, 255, 255, 0.05);
  color: #f3f4f6;
  font-weight: 600;
}

.about-content :deep(td) {
  color: #e8e8ee;
}

.about-content :deep(tr:hover) {
  background: rgba(255, 255, 255, 0.03);
}

/* FAQ 特定样式 */
.about-content :deep(.faq-item) {
  margin: 20px 0;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
}

.about-content :deep(.faq-q) {
  margin: 0;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  color: #f3f4f6;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.about-content :deep(.faq-q:hover) {
  background: rgba(255, 255, 255, 0.08);
}

.about-content :deep(.faq-content) {
  padding: 16px 20px;
  color: #e8e8ee;
  line-height: 1.6;
}

.about-content :deep(.faq-content p) {
  margin: 0 0 12px 0;
}

.about-content :deep(.faq-content p:last-child) {
  margin-bottom: 0;
}

/* 特色列表样式 */
.about-content :deep(.feature-list) {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}

.about-content :deep(.feature-list li) {
  position: relative;
  padding-left: 24px;
  margin: 12px 0;
  color: #e8e8ee;
}

.about-content :deep(.feature-list li::before) {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 16px;
}

/* 段落样式 */
.about-content :deep(.lead) {
  font-size: 18px;
  line-height: 1.6;
  color: #d1d5db;
  margin: 20px 0;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border-left: 4px solid #60a5fa;
}
</style>
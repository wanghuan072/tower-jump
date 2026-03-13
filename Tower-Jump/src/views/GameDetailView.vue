<template>
  <div class="game-detail-page">
    <SiteHeader />

    <main>
      <div class="container">
        <section class="game-layout">
          <div
            class="game-content"
            :class="{ 'page-fullscreen': isPageFullscreen, 'is-playing': isPlaying }"
          >
            <section ref="gameRef" class="game-section">
              <h1 class="game-title">
                {{ $t('GameDetailPage.heroPlay') }} {{ currentGame?.title }}
                {{ $t('GameDetailPage.heroOnline') }}
              </h1>
              <p class="game-subtitle">{{ $t('GameDetailPage.heroSubtitle') }}</p>
              <div class="game-iframe-container">
                <div class="game-iframe-wrapper">
                  <iframe
                    ref="gameIframe"
                    class="game-iframe"
                    :class="{ 'is-visible': isPlaying }"
                    :src="isPlaying ? iframeSrc : undefined"
                    :title="currentGame?.title || 'Game'"
                    allow="autoplay; fullscreen; gamepad; microphone; camera; payment; geolocation"
                    @load="onFrameLoad"
                  ></iframe>

                  <div v-if="!isPlaying" class="game-play-overlay" style="z-index: 10">
                    <div class="overlay-backdrop"></div>
                    <div class="overlay-content">
                      <img
                        class="overlay-logo"
                        :src="currentGame?.imageUrl || '/images/logo.png'"
                        :alt="$t('GameDetailPage.gameLogoAlt')"
                        width="96"
                        height="96"
                      />
                      <button
                        type="button"
                        class="play-button"
                        :aria-label="$t('GameDetailPage.playButtonLabel')"
                        :title="$t('GameDetailPage.playButtonLabel')"
                        @click="startPlay"
                      >
                        <svg
                          class="play-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M8 5v14l11-7z" fill="currentColor" />
                        </svg>
                        <span class="play-text">{{ $t('GameDetailPage.playButtonText') }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 操作栏：左标题，右侧全屏/网页全屏按钮 -->
              <div class="game-controls">
                <div class="controls-title">{{ currentGame?.title }}</div>
                <div class="controls-actions">
                  <button
                    class="control-btn"
                    @click="toggleFullscreen"
                    :title="$t('GameDetailPage.fullscreenLabel')"
                    :aria-label="$t('GameDetailPage.fullscreenLabel')"
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
                    :title="$t('GameDetailPage.pageFullscreenLabel')"
                    :aria-label="$t('GameDetailPage.pageFullscreenLabel')"
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

            <section id="about" ref="aboutRef" class="about-section">
              <h2 class="section-title">{{ $t('GameDetailPage.gameInfoTitle') }}: {{ currentGame?.title }}</h2>
              <div class="about-content" v-html="currentGame?.detailsHtml"></div>
            </section>
          </div>

          <aside class="comments-sidebar">
            <!-- New Games 板块 -->
            <section v-if="newGames.length > 0" class="new-games-section">
              <h3 class="panel-title">{{ $t('GameDetailPage.newGamesTitle') }}</h3>
              <div class="new-games-grid">
                <a
                  v-for="game in newGames"
                  :key="game.id"
                  :href="getGameUrl(game)"
                  class="new-game-card"
                >
                  <div class="new-game-thumb">
                    <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
                  </div>
                  <div class="new-game-meta">
                    <h4 class="new-game-title">{{ game.title }}</h4>
                  </div>
                </a>
              </div>
            </section>

            <GameReviews :game-id="currentGame?.addressBar || 'tower-jump'" />
          </aside>
        </section>

        <section id="games" class="section-games">
          <h2 class="section-title">{{ $t('GameDetailPage.moreGamesTitle') }}</h2>
          <GameList :limit="16" />
        </section>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getGames } from '@/composables/getGames'
import { useLocalePath } from '@/composables/useLocalePath'
import { useSEO } from '../composables/useSEO'
import GameList from '../components/GameList.vue'
import GameReviews from '../components/GameReviews.vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const { withLocale } = useLocalePath()

const games = computed(() => getGames(locale.value))

// SEO管理
const { setGameSEO } = useSEO()

// 游戏相关状态
const isPlaying = ref(false)
const iframeSrc = ref('')
const isPageFullscreen = ref(false)
const gameIframe = ref(null)

// 当前游戏
const currentGame = ref(null)

// 筛选新游戏
const newGames = computed(() => {
  return games.value.filter((game) => game.isNew === true).slice(0, 4)
})

// 生成游戏URL
function getGameUrl(game) {
  if (!game || !game.addressBar) return '#'
  // 详情页路径：/:addressBar
  return withLocale(`/${game.addressBar}`)
}

// 初始化当前游戏
function initializeGame() {
  const addressBar = route.params.addressBar
  if (!addressBar) {
    // 如果没有参数，跳转到首页或列表页
    router.replace('/')
    return
  }

  const game = games.value.find((g) => g.addressBar === addressBar)

  if (game) {
    currentGame.value = game
    // 设置游戏SEO
    setGameSEO(addressBar)
    // 重置播放状态
    isPlaying.value = false
    iframeSrc.value = ''
  } else {
    // 游戏不存在，跳转到404或首页
    router.replace('/')
  }
}

// 游戏播放控制
function startPlay() {
  if (isPlaying.value) return
  iframeSrc.value = currentGame.value?.iframeUrl || ''
  isPlaying.value = true
}

// 浏览器全屏
function toggleFullscreen() {
  if (!gameIframe.value) return
  if (!document.fullscreenElement) {
    gameIframe.value.requestFullscreen?.().catch(() => {})
  } else {
    document.exitFullscreen?.()
  }
}

// 网页全屏
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

// 监听路由变化（同组件内切换游戏）
watch(
  () => route.params.addressBar,
  (newAddressBar) => {
    if (newAddressBar) {
      initializeGame()
    }
  }
)

onMounted(() => {
  initializeGame()
})

onUnmounted(() => {
  if (isPageFullscreen.value) exitPageFullscreen()
})
</script>

<style scoped>
.game-detail-page {
  position: relative;
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* 背景装饰 - 网格图案 */
.game-detail-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

/* 背景装饰 - 光晕效果 */
.game-detail-page::after {
  content: '';
  position: fixed;
  top: -50%;
  right: -20%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(
    circle,
    rgba(255, 107, 107, 0.25) 0%,
    rgba(255, 107, 107, 0.1) 40%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(40px);
  opacity: 0.5;
}

.game-detail-page > * {
  position: relative;
  z-index: 1;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 游戏布局 */
.game-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  padding: 20px 0;
  min-height: calc(100vh - 64px);
}

.game-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.game-section .game-title {
  font-size: 28px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.game-section .game-subtitle {
  font-size: 14px;
  color: #e8e8ee;
  margin-bottom: 20px;
}

.game-iframe-container {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 520px;
  border-radius: 14px;
  overflow: hidden;
  background: #111319;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
  transition: opacity 0.3s ease-out;
  pointer-events: auto;
}

.game-iframe.is-visible {
  opacity: 1;
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.game-content.is-playing .game-controls,
.game-content.page-fullscreen .game-controls {
  backdrop-filter: none;
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
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: #e8e8ee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.game-content.is-playing .control-btn,
.game-content.page-fullscreen .control-btn {
  backdrop-filter: none;
}

.control-btn:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 215, 0, 0.15) 100%);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.control-btn:active {
  transform: translateY(0);
}

/* 网页全屏样式 */
.game-content.page-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #0f0f14;
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

.game-content.page-fullscreen .about-section {
  display: none;
}

.game-content.page-fullscreen ~ .comments-sidebar {
  display: none;
}

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
  backdrop-filter: saturate(140%) blur(20px);
  -webkit-backdrop-filter: saturate(140%) blur(20px);
  z-index: 1;
  background: radial-gradient(circle at center, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
}

.game-content.is-playing .overlay-backdrop {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
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
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  color: #1b1120;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 24px rgba(255, 107, 107, 0.4), 0 0 20px rgba(255, 215, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.play-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.play-button:hover::before {
  left: 100%;
}

.play-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.5), 0 0 30px rgba(255, 215, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.play-button:active {
  transform: translateY(0) scale(0.98);
}

.section-title,
.panel-title {
  font-size: 24px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

/* New Games 板块样式 */
.new-games-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.game-content.is-playing ~ * .new-games-section,
.game-content.page-fullscreen ~ * .new-games-section {
  backdrop-filter: none;
}

.new-games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.new-game-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: block;
}

.new-game-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.new-game-thumb {
  aspect-ratio: 1/1;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.new-game-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.new-game-card:hover .new-game-thumb img {
  transform: scale(1.05);
}

.new-game-meta {
  padding: 10px;
}

.new-game-title {
  font-size: 14px;
  font-weight: 600;
  color: #e8e8ee;
  margin: 0;
  line-height: 1.4;
  text-align: center;
}

/* About Section */
.about-section {
  margin-top: 30px;
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
  margin-bottom: 15px;
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
  margin-bottom: 15px;
  color: #e8e8ee;
  line-height: 1.7;
}

.about-content :deep(ul),
.about-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.about-content :deep(li) {
  margin-bottom: 5px;
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
  content: '✓';
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
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border-left: 4px solid #60a5fa;
}

@media (max-width: 768px) {
  .about-content :deep(p) {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .about-content :deep(h2) {
    font-size: 18px;
  }
  .about-content :deep(h3) {
    font-size: 16px;
  }
  .about-content :deep(h4) {
    font-size: 14px;
  }
  .about-content :deep(h5) {
    font-size: 12px;
  }
}

/* 响应式 */
@media (max-width: 1024px) {
  .game-layout {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .game-iframe-container {
    height: 60vh;
  }
}

@media (max-width: 768px) {
  .game-iframe-container {
    height: 50vh;
  }
  
  .game-section .game-title {
    font-size: 24px;
  }
}
</style>

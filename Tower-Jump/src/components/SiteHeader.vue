<template>
  <header class="site-header">
    <div class="container">
      <div class="logo">
        <a href="/">
          <img src="/images/logo.webp" alt="Tower Jump Logo" class="logo-image" />
          <span class="logo-text">Tower Jump</span>
        </a>
      </div>
      <nav class="nav" aria-label="Main navigation">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/tower-jump-2">Tower Jump 2</a>
        <!-- <div class="nav-link" @click="handleScroll('about')">Game Info</div> -->
        <a class="nav-link" href="/all-jump-games">All Jump Games</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleScroll = async (name) => {
  // 如果不在首页，先跳转到首页
  if (route.name !== 'home' && route.name !== 'game-detail') {
    await router.push('/')
    // 等待路由跳转和DOM更新
    setTimeout(() => {
      scrollToElement(name)
    }, 100)
  } else {
    scrollToElement(name)
  }
}

const scrollToElement = (name) => {
  const element = document.querySelector(`#${name}`)
  if (!element) return

  const supportsSmooth = 'scrollBehavior' in document.documentElement.style
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  const headerHeight = 64 // 固定头部高度
  const rect = element.getBoundingClientRect()
  const top = rect.top + window.scrollY - headerHeight - 8
  const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
  window.scrollTo({ top, behavior })
}
</script>

<style scoped>
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
  background: rgba(15, 15, 20, 0.95);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;
}

.logo-image {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.logo-text {
  font-size: 18px;
  background: linear-gradient(135deg, #ff6b6b, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-link {
  color: #cfd3ff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 99px;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .logo-text {
    display: none;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style>

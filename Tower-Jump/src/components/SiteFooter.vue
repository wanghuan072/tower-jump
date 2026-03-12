<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <!-- 左侧：Logo和简介 -->
        <div class="footer-brand">
          <div class="footer-logo-section">
            <img src="/images/logo.webp" :alt="$t('footer.logoAlt')" class="footer-logo" />
            <div class="footer-brand-text">
              <h3 class="footer-brand-title">{{ $t('footer.brandTitle') }}</h3>
              <p class="footer-description">
                {{ $t('footer.brandDescription') }}
              </p>
            </div>
          </div>
        </div>

        <!-- 中间：Hot Games -->
        <div class="footer-links-section">
          <h4 class="footer-links-title">{{ $t('footer.hotGamesTitle') }}</h4>
          <nav class="footer-links">
            <a 
              v-for="game in hotGames" 
              :key="game.id" 
              :href="getGameUrl(game)"
              class="footer-link"
            >
              {{ game.title }}
            </a>
          </nav>
        </div>

        <!-- 中间：链接 -->
        <div class="footer-links-section">
          <h4 class="footer-links-title">{{ $t('footer.quickLinksTitle') }}</h4>
          <nav class="footer-links">
            <a :href="withLocale('/about-us')" class="footer-link" rel="noopener noreferrer nofollow">{{ $t('footer.linkAbout') }}</a>
            <a :href="withLocale('/contact')" class="footer-link" rel="noopener noreferrer nofollow">{{ $t('footer.linkContact') }}</a>
            <a :href="withLocale('/privacy-policy')" class="footer-link" rel="noopener noreferrer nofollow">{{ $t('footer.linkPrivacy') }}</a>
            <a :href="withLocale('/terms-of-service')" class="footer-link" rel="noopener noreferrer nofollow">{{ $t('footer.linkTerms') }}</a>
            <a :href="withLocale('/copyright')" class="footer-link" rel="noopener noreferrer nofollow">{{ $t('footer.linkCopyright') }}</a>
          </nav>
        </div>

        <!-- 右侧：返回顶部 -->
        <div class="footer-action">
          <a href="#" @click.prevent="scrollToTop" class="back-to-top" :aria-label="$t('footer.backToTopAria')">
            <span>{{ $t('footer.backToTop') }}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- 底部：Copyright -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} {{ $t('footer.brandTitle') }}. {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getGames } from '@/composables/getGames'
import { useLocalePath } from '@/composables/useLocalePath'

const { locale } = useI18n()
const { withLocale } = useLocalePath()
const games = computed(() => getGames(locale.value))

const hotGames = computed(() => {
  return games.value.filter((game) => game.isHot === true).slice(0, 5)
})

function getGameUrl(game) {
  if (!game || !game.addressBar) return '#'
  return withLocale(`/${game.addressBar}`)
}

const scrollToTop = () => {
  const supportsSmooth = 'scrollBehavior' in document.documentElement.style
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.site-footer {
  margin-top: auto;
  padding: 48px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, transparent 0%, rgba(15, 15, 20, 0.8) 100%);
  backdrop-filter: blur(10px);
  color: #e8e8ee;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 0.5fr;
  gap: 30px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-logo-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.footer-logo {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.footer-brand-text {
  flex: 1;
}

.footer-brand-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

.footer-links-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-links-title {
  font-size: 16px;
  font-weight: 600;
  color: #e8e8ee;
  margin: 0 0 16px 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.footer-link {
  color: #cfd3ff;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding: 4px 0;
  width: fit-content;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff6b6b, #ffd700);
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: #fff;
  transform: translateX(4px);
}

.footer-link:hover::after {
  width: 100%;
}

.footer-action {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #cfd3ff;
  text-decoration: none;
  font-size: 14px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.back-to-top:hover {
  color: #fff;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 215, 0, 0.15) 100%);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
}

.copyright {
  color: #6b7280;
  font-size: 13px;
  margin: 0;
  text-align: center;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
  
  .footer-brand, .footer-links-section, .footer-action {
    align-items: center;
    justify-content: center;
  }
  
  .footer-logo-section {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-description {
    max-width: 100%;
  }
}
</style>

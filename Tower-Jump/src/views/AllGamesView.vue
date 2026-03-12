<template>
  <div class="all-games-page">
    <SiteHeader />

    <main>
      <div class="container">
        <section class="games-section">
          <h1 class="page-title">{{ $t('AllGamesPage.pageTitle') }}</h1>
          <GameList />
        </section>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import GameList from '../components/GameList.vue'
import { useSEO } from '../composables/useSEO'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { setSEO } = useSEO()
const { t } = useI18n()

onMounted(() => {
  setSEO({
    title: t('tdk.AllGamesPage.title'),
    description: t('tdk.AllGamesPage.description'),
    keywords: t('tdk.AllGamesPage.keywords'),
    ogTitle: t('tdk.AllGamesPage.title'),
    ogDescription: t('tdk.AllGamesPage.description'),
    twitterTitle: t('tdk.AllGamesPage.title'),
    twitterDescription: t('tdk.AllGamesPage.description'),
  })
})
</script>

<style scoped>
.all-games-page {
  position: relative;
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 背景装饰 - 网格图案 */
.all-games-page::before {
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

.all-games-page > * {
  position: relative;
  z-index: 1;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.games-section {
  padding: 40px 0;
  min-height: 60vh;
}

.page-title {
  font-size: 32px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  text-align: center;
}
</style>

<template>
  <div class="page">
    <SiteHeader />
    <div class="content">
      <h1>{{ $t('AboutPage.title') }}</h1>
      
      <h2>{{ $t('AboutPage.section1Title') }}</h2>
      <p>{{ $t('AboutPage.section1Text') }}</p>

      <h2>{{ $t('AboutPage.section2Title') }}</h2>
      <p>{{ $t('AboutPage.section2Text') }}</p>

      <h2>{{ $t('AboutPage.section3Title') }}</h2>
      <p>{{ $t('AboutPage.section3Text') }}</p>

      <h2>{{ $t('AboutPage.section4Title') }}</h2>
      <p>
        {{ $t('AboutPage.section4TextPrefix') }}
        <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>.
      </p>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { useSEO } from '../composables/useSEO'
import { useI18n } from 'vue-i18n'

const { setSEO } = useSEO()
const { t } = useI18n()

onMounted(() => {
  setSEO({
    title: t('tdk.AboutPage.title'),
    description: t('tdk.AboutPage.description'),
    keywords: t('tdk.AboutPage.keywords'),
    ogTitle: t('tdk.AboutPage.title'),
    ogDescription: t('tdk.AboutPage.description'),
    twitterTitle: t('tdk.AboutPage.title'),
    twitterDescription: t('tdk.AboutPage.description'),
  })
})
</script>

<style scoped>
.page{
  background: #0f0f14;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  color: #e8e8ee;
  min-height: 100vh;
  padding: 40px 20px;
}

.content h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #e8e8ee;
}

.content h2 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #e8e8ee;
}

.content p {
  font-size: 16px;
  color: #e8e8ee;
  margin-bottom: 20px;
}

.content a {
  color: #60a5fa;
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content {
    padding: 0 10px;
  }

  .content h1 {
    font-size: 28px;
  }

  .content h2 {
    font-size: 20px;
  }

  .content p {
    font-size: 14px;
  }
}
</style>

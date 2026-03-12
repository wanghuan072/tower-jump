<template>
  <div class="page">
    <SiteHeader />
    <div class="content">
      <h1>{{ $t('CopyrightPage.title') }}</h1>
      
      <h2>{{ $t('CopyrightPage.h2_1') }}</h2>
      <p>{{ $t('CopyrightPage.p1') }}</p>

      <h2>{{ $t('CopyrightPage.h2_2') }}</h2>
      <p>{{ $t('CopyrightPage.p2') }}</p>

      <h2>{{ $t('CopyrightPage.h2_3') }}</h2>
      <p>{{ $t('CopyrightPage.p3') }}</p>

      <h2>{{ $t('CopyrightPage.h2_4') }}</h2>
      <p>{{ $t('CopyrightPage.p4') }}</p>

      <h2>{{ $t('CopyrightPage.h2_5') }}</h2>
      <p>{{ $t('CopyrightPage.p5') }}</p>

      <h2>{{ $t('CopyrightPage.h2_6') }}</h2>
      <p>
        {{ $t('CopyrightPage.p6Prefix') }}
        <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>.
      </p>

      <h2>{{ $t('CopyrightPage.h2_7') }}</h2>
      <p>{{ $t('CopyrightPage.p7') }}</p>
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
    title: t('tdk.CopyrightPage.title'),
    description: t('tdk.CopyrightPage.description'),
    keywords: t('tdk.CopyrightPage.keywords'),
    ogTitle: t('tdk.CopyrightPage.title'),
    ogDescription: t('tdk.CopyrightPage.description'),
    twitterTitle: t('tdk.CopyrightPage.title'),
    twitterDescription: t('tdk.CopyrightPage.description'),
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

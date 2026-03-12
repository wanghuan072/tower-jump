<template>
  <div class="page">
    <SiteHeader />
    <div class="content">
      <h1>{{ $t('ContactPage.title') }}</h1>
      
      <p>{{ $t('ContactPage.intro') }}</p>

      <h2>{{ $t('ContactPage.emailTitle') }}</h2>
      <p>
        {{ $t('ContactPage.emailLabel') }}
        <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>
      </p>
      <p>{{ $t('ContactPage.responseTime') }}</p>

      <h2>{{ $t('ContactPage.helpTitle') }}</h2>
      <p>{{ $t('ContactPage.helpIntro') }}</p>
      <ul>
        <li>{{ $t('ContactPage.helpItem1') }}</li>
        <li>{{ $t('ContactPage.helpItem2') }}</li>
        <li>{{ $t('ContactPage.helpItem3') }}</li>
        <li>{{ $t('ContactPage.helpItem4') }}</li>
      </ul>

      <h2>{{ $t('ContactPage.thanksTitle') }}</h2>
      <p>{{ $t('ContactPage.thanksText') }}</p>
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
    title: t('tdk.ContactPage.title'),
    description: t('tdk.ContactPage.description'),
    keywords: t('tdk.ContactPage.keywords'),
    ogTitle: t('tdk.ContactPage.title'),
    ogDescription: t('tdk.ContactPage.description'),
    twitterTitle: t('tdk.ContactPage.title'),
    twitterDescription: t('tdk.ContactPage.description'),
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

.content ul {
  margin-bottom: 20px;
  padding-left: 30px;
}

.content li {
  font-size: 16px;
  color: #e8e8ee;
  margin-bottom: 10px;
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

  .content p,
  .content li {
    font-size: 14px;
  }
}
</style>

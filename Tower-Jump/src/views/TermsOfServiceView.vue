<template>
  <div class="page">
    <SiteHeader />
    <div class="content">
      <h1>{{ $t('TermsOfServicePage.title') }}</h1>
      <p class="updated">{{ $t('TermsOfServicePage.updated') }}</p>
      
      <h2>{{ $t('TermsOfServicePage.h2_1') }}</h2>
      <p>{{ $t('TermsOfServicePage.p1') }}</p>
      <p><strong>{{ $t('TermsOfServicePage.ageNotice') }}</strong></p>

      <h2>{{ $t('TermsOfServicePage.h2_2') }}</h2>
      <p>{{ $t('TermsOfServicePage.p2') }}</p>

      <h2>{{ $t('TermsOfServicePage.h2_3') }}</h2>
      <p>{{ $t('TermsOfServicePage.p3') }}</p>
      <ul>
        <li>{{ $t('TermsOfServicePage.li1') }}</li>
        <li>{{ $t('TermsOfServicePage.li2') }}</li>
        <li>{{ $t('TermsOfServicePage.li3') }}</li>
        <li>{{ $t('TermsOfServicePage.li4') }}</li>
        <li>{{ $t('TermsOfServicePage.li5') }}</li>
      </ul>

      <h2>{{ $t('TermsOfServicePage.h2_4') }}</h2>
      <p>
        {{ $t('TermsOfServicePage.p4Prefix') }}
        <a href="/privacy-policy">{{ $t('TermsOfServicePage.p4LinkText') }}</a>{{ $t('TermsOfServicePage.p4Suffix') }}
      </p>

      <h2>{{ $t('TermsOfServicePage.h2_5') }}</h2>
      <p>{{ $t('TermsOfServicePage.p5') }}</p>

      <h2>{{ $t('TermsOfServicePage.h2_6') }}</h2>
      <p>{{ $t('TermsOfServicePage.p6') }}</p>

      <h2>{{ $t('TermsOfServicePage.h2_7') }}</h2>
      <p>
        {{ $t('TermsOfServicePage.p7Prefix') }}
        <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>.
      </p>

      <h2>{{ $t('TermsOfServicePage.h2_8') }}</h2>
      <p>{{ $t('TermsOfServicePage.p8') }}</p>

      <h2>{{ $t('TermsOfServicePage.h2_9') }}</h2>
      <p>
        {{ $t('TermsOfServicePage.p9Prefix') }}
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
    title: t('tdk.TermsOfServicePage.title'),
    description: t('tdk.TermsOfServicePage.description'),
    keywords: t('tdk.TermsOfServicePage.keywords'),
    ogTitle: t('tdk.TermsOfServicePage.title'),
    ogDescription: t('tdk.TermsOfServicePage.description'),
    twitterTitle: t('tdk.TermsOfServicePage.title'),
    twitterDescription: t('tdk.TermsOfServicePage.description'),
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
  margin-bottom: 10px;
  color: #e8e8ee;
}

.content .updated {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 30px;
  font-style: italic;
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

.content strong {
  color: #f3f4f6;
  font-weight: 600;
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

<template>
  <div class="page">
    <SiteHeader />
    <div class="content">
      <h1>{{ $t('PrivacyPolicyPage.title') }}</h1>
      <p class="updated">{{ $t('PrivacyPolicyPage.updated') }}</p>
      
      <h2>{{ $t('PrivacyPolicyPage.h2_1') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p1') }}</p>
      <p>{{ $t('PrivacyPolicyPage.p2') }}</p>
      <p>
        {{ $t('PrivacyPolicyPage.p3Prefix') }}
        <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>.
      </p>

      <h2>{{ $t('PrivacyPolicyPage.h2_2') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p4') }}</p>
      <ul>
        <li>{{ $t('PrivacyPolicyPage.li1') }}</li>
        <li>{{ $t('PrivacyPolicyPage.li2') }}</li>
        <li>{{ $t('PrivacyPolicyPage.li3') }}</li>
      </ul>
      <p>{{ $t('PrivacyPolicyPage.p5') }}</p>

      <h2>{{ $t('PrivacyPolicyPage.h2_3') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p6') }}</p>
      <ul>
        <li>{{ $t('PrivacyPolicyPage.li4') }}</li>
        <li>{{ $t('PrivacyPolicyPage.li5') }}</li>
        <li>{{ $t('PrivacyPolicyPage.li6') }}</li>
        <li>{{ $t('PrivacyPolicyPage.li7') }}</li>
      </ul>

      <h2>{{ $t('PrivacyPolicyPage.h2_4') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p7') }}</p>

      <h2>{{ $t('PrivacyPolicyPage.h2_5') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p8') }}</p>
      <p>{{ $t('PrivacyPolicyPage.p9') }}</p>

      <h2>{{ $t('PrivacyPolicyPage.h2_6') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p10') }}</p>
      <p>{{ $t('PrivacyPolicyPage.p11') }}</p>

      <h2>{{ $t('PrivacyPolicyPage.h2_7') }}</h2>
      <p>{{ $t('PrivacyPolicyPage.p12') }}</p>

      <h2>{{ $t('PrivacyPolicyPage.h2_8') }}</h2>
      <p>
        {{ $t('PrivacyPolicyPage.p13Prefix') }}
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
    title: t('tdk.PrivacyPolicyPage.title'),
    description: t('tdk.PrivacyPolicyPage.description'),
    keywords: t('tdk.PrivacyPolicyPage.keywords'),
    ogTitle: t('tdk.PrivacyPolicyPage.title'),
    ogDescription: t('tdk.PrivacyPolicyPage.description'),
    twitterTitle: t('tdk.PrivacyPolicyPage.title'),
    twitterDescription: t('tdk.PrivacyPolicyPage.description'),
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

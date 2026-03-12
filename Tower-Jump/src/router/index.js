import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    // 德语（/de 前缀）
    {
      path: '/de',
      name: 'de-home',
      component: () => import('../views/HomeView.vue'),
    },
    // 法语（/fr 前缀）
    {
      path: '/fr',
      name: 'fr-home',
      component: () => import('../views/HomeView.vue'),
    },
    // 日语（/ja 前缀）
    {
      path: '/ja',
      name: 'ja-home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/all-jump-games',
      name: 'all-jump-games',
      component: () => import('../views/AllGamesView.vue'),
    },
    {
      path: '/de/all-jump-games',
      name: 'de-all-jump-games',
      component: () => import('../views/AllGamesView.vue'),
    },
    {
      path: '/fr/all-jump-games',
      name: 'fr-all-jump-games',
      component: () => import('../views/AllGamesView.vue'),
    },
    {
      path: '/ja/all-jump-games',
      name: 'ja-all-jump-games',
      component: () => import('../views/AllGamesView.vue'),
    },
    // 页面路由
    {
      path: '/about-us',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/de/about-us',
      name: 'de-about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/fr/about-us',
      name: 'fr-about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/ja/about-us',
      name: 'ja-about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/de/contact',
      name: 'de-contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/fr/contact',
      name: 'fr-contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/ja/contact',
      name: 'ja-contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/copyright',
      name: 'copyright',
      component: () => import('../views/CopyrightView.vue'),
    },
    {
      path: '/de/copyright',
      name: 'de-copyright',
      component: () => import('../views/CopyrightView.vue'),
    },
    {
      path: '/fr/copyright',
      name: 'fr-copyright',
      component: () => import('../views/CopyrightView.vue'),
    },
    {
      path: '/ja/copyright',
      name: 'ja-copyright',
      component: () => import('../views/CopyrightView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/de/privacy-policy',
      name: 'de-privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/fr/privacy-policy',
      name: 'fr-privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/ja/privacy-policy',
      name: 'ja-privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('../views/TermsOfServiceView.vue'),
    },
    {
      path: '/de/terms-of-service',
      name: 'de-terms-of-service',
      component: () => import('../views/TermsOfServiceView.vue'),
    },
    {
      path: '/fr/terms-of-service',
      name: 'fr-terms-of-service',
      component: () => import('../views/TermsOfServiceView.vue'),
    },
    {
      path: '/ja/terms-of-service',
      name: 'ja-terms-of-service',
      component: () => import('../views/TermsOfServiceView.vue'),
    },
    // 管理员路由
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('../views/admin/Login.vue'),
      meta: {
        // 管理员登录页面不需要SEO优化
        hideFromSEO: true
      }
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../views/admin/CommentRatingManagement.vue'),
      meta: { 
        requiresAuth: true,
        hideFromSEO: true
      }
    },
    // 游戏详情页（放在最后以避免冲突）
    {
      path: '/:addressBar',
      name: 'game-detail',
      component: () => import('../views/GameDetailView.vue'),
    }
    ,
    // 德语游戏详情页（放在最后）
    {
      path: '/de/:addressBar',
      name: 'de-game-detail',
      component: () => import('../views/GameDetailView.vue'),
    }
    ,
    // 法语游戏详情页（放在最后）
    {
      path: '/fr/:addressBar',
      name: 'fr-game-detail',
      component: () => import('../views/GameDetailView.vue'),
    }
    ,
    // 日语游戏详情页（放在最后）
    {
      path: '/ja/:addressBar',
      name: 'ja-game-detail',
      component: () => import('../views/GameDetailView.vue'),
    }
  ],
})

// 管理员认证检查函数
const checkAdminAuth = (to, from, next) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    next('/admin/login')
  } else {
    next()
  }
}

// 路由守卫
router.beforeEach((to, from, next) => {
  // 根据语言前缀设置语言（切换语言通过刷新/跳转页面生效）
  const p = to.path || '/'
  const lang =
    p === '/de' || p.startsWith('/de/')
      ? 'de'
      : p === '/fr' || p.startsWith('/fr/')
        ? 'fr'
        : p === '/ja' || p.startsWith('/ja/')
          ? 'ja'
          : 'en'
  i18n.global.locale.value = lang

  // 检查是否需要管理员认证
  if (to.meta.requiresAuth) {
    checkAdminAuth(to, from, next)
  } else {
    next()
  }
})

export default router

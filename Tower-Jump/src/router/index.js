import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/:addressBar',
      name: 'game-detail',
      component: () => import('../views/HomeView.vue'),
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
  // 检查是否需要管理员认证
  if (to.meta.requiresAuth) {
    checkAdminAuth(to, from, next)
  } else {
    next()
  }
})

export default router

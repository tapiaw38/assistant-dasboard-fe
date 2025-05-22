import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/core/shared/DefaultLayout/DefaultLayout.vue'
import { createAuthGuard, IsAuthenticated } from './auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          beforeEnter: [createAuthGuard(new IsAuthenticated())],
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import('../views/AuthView.vue'),
        },
        {
          path: '/my-account',
          name: 'my-account',
          beforeEnter: [createAuthGuard(new IsAuthenticated())],
          component: () => import('../views/MyAccount.vue'),
        },
        {
          path: '/conversation',
          name: 'conversation',
          beforeEnter: [createAuthGuard(new IsAuthenticated())],
          component: () => import('../views/ConversationView.vue'),
        },
        {
          path: '/web-integration',
          name: 'web-integration',
          beforeEnter: [createAuthGuard(new IsAuthenticated())],
          component: () => import('../views/WebIntegrationView.vue'),
        },
        {
          path: '/store-integration',
          name: 'store-integration',
          beforeEnter: [createAuthGuard(new IsAuthenticated())],
          component: () => import('../views/StoreIntegrationView.vue'),
        },
      ],
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/core/shared/DefaultLayout/DefaultLayout.vue'
import { isAuthenticatedGuard } from './auth'

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
          beforeEnter: [isAuthenticatedGuard],
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
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('../views/MyAccount.vue'),
        },
        {
          path: '/conversation',
          name: 'conversation',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('../views/ConversationView.vue'),
        },
        {
          path: '/web-integration',
          name: 'web-integration',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('../views/WebIntegrationView.vue'),
        },
        {
          path: '/store-integration',
          name: 'store-integration',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('../views/StoreIntegrationView.vue'),
        },
      ],
    },
  ],
})

export default router

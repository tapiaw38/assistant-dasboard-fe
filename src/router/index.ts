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
      ],
    },
  ],
})

export default router

import { useAuth } from '@/composables/useAuth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { user } = useAuth()

  if (!user.value && to.name === 'dashboard') {
    return next({ name: 'auth' })
  }

  return next()
}

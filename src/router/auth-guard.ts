import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

export interface AuthStrategy {
  check(): Promise<boolean>
}

export class IsAuthenticated implements AuthStrategy {
  async check(): Promise<boolean> {
    const { isAuthenticated } = useAuth()
    return isAuthenticated.value
  }
}

export const createAuthGuard = (strategy: AuthStrategy) => {
  return async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const allowed = await strategy.check()
    if (allowed) {
      next()
    } else {
      next({ name: 'auth' })
    }
  }
}

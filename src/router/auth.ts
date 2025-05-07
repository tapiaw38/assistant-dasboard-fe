import { useAuth } from '@/composables/useAuth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { meUser, isMeUserSuccess } = useAuth()

  await meUser()

  if (isMeUserSuccess.value) next()
  else next({ name: 'login' })
}

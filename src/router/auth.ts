import { useAuth } from '@/composables/useAuth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { meUser, isMeUserSuccess } = useAuth()

  try {
    await meUser()
  } catch (error) {
    console.error('Error al verificar sesión:', error)
    next({ name: 'auth' })
  }

  if (isMeUserSuccess.value) next()
  else next({ name: 'auth' })
}

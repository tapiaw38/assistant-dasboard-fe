import { computed, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { IAuthService } from '@/services/auth/authService'

export const useAuth = () => {
  const services = inject<{ authService: IAuthService }>('services')
  if (!services) throw new Error('Services not provided')

  const authService = services.authService

  const store = useAuthStore(authService)
  const authStore = store()

  const {
    user,
    token,

    isLoginPending,
    isLoginSuccess,
    isLoginError,
    loginError,

    isMeUserPending,
    isMeUserSuccess,
    isMeUserError,
    meUserError,

    isRegisterPending,
    isRegisterSuccess,
    isRegisterError,
    registerError,
  } = storeToRefs(authStore)

  const { loginUser, logoutUser, meUser, registerUser } = authStore

  return {
    // Data
    user,
    token,
    isAuthenticated: computed<boolean>(() => {
      const localToken = localStorage.getItem('token')
      return localToken !== null
    }),

    isLoginPending,
    isLoginSuccess,
    isLoginError,
    loginError,

    isMeUserPending,
    isMeUserSuccess,
    isMeUserError,
    meUserError,

    isRegisterPending,
    isRegisterSuccess,
    isRegisterError,
    registerError,

    // Methods
    loginUser,
    logoutUser,
    meUser,
    registerUser,
    reset: () => authStore.$reset(),
  }
}

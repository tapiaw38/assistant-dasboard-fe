import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export const useAuth = () => {
  const authStore = useAuthStore()

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
  }
}

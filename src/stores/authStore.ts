import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthQueries } from '@/queries/auth'
import type { IAuthService } from '@/services/auth/authService'
import type {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
  User,
} from '@/types/auth.ts'

export const useAuthStore = (authService: IAuthService) =>
  defineStore('auth', () => {
    const user = ref<User | null | undefined>(null)
    const token = ref<string | null>(localStorage.getItem('token'))

    const { loginMutation, meUserQuery, registerMutation } = useAuthQueries(authService)

    const loginUser = async (params: LoginParams) => {
      try {
        const response: LoginResponse = await loginMutation.mutateAsync(params)
        localStorage.setItem('token', response.token)
        user.value = response.data
        token.value = response.token
      } catch (error) {
        console.error('Failed to login:', error)
      }
    }

    const logoutUser = async () => {
      localStorage.removeItem('token')
      sessionStorage.clear()
      user.value = null
      token.value = null
    }

    const meUser = async () => {
      try {
        const { data } = await meUserQuery.refetch()
        user.value = data?.data
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    const registerUser = async (params: RegisterParams) => {
      try {
        const response: RegisterResponse = await registerMutation.mutateAsync(params)
        console.log('Successfully registered:', response)
      } catch (error) {
        console.error('Failed to register:', error)
      }
    }

    return {
      user,
      token,

      loginUser,
      logoutUser,

      isLoginPending: loginMutation.isPending,
      isLoginSuccess: loginMutation.isSuccess,
      isLoginError: loginMutation.isError,
      loginError: loginMutation.error,

      meUser,
      isMeUserPending: meUserQuery.isPending,
      isMeUserSuccess: meUserQuery.isSuccess,
      isMeUserError: meUserQuery.isError,
      meUserError: meUserQuery.error,

      registerUser,
      isRegisterPending: registerMutation.isPending,
      isRegisterSuccess: registerMutation.isSuccess,
      isRegisterError: registerMutation.isError,
      registerError: registerMutation.error,
    }
  })

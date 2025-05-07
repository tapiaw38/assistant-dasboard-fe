import { defineStore } from 'pinia'
import { useAuthQueries } from '@/queries/auth'
import { ref } from 'vue'
import type { LoginParams, LoginResponse, User } from '@/types/auth/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null | undefined>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const { loginMutation, meUserQuery } = useAuthQueries()

  const loginUser = async (params: LoginParams) => {
    await loginMutation.mutateAsync(params, {
      onSuccess: (response: LoginResponse) => {
        user.value = response.data
        token.value = response.token
        localStorage.setItem('token', response.token)
      },
    })
  }

  const logoutUser = async () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  const meUser = async () => {
    try {
      const { data } = await meUserQuery.refetch()
      user.value = data?.data
    } catch (error) {
      console.error('Failed to fetch user data:', error)
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
  }
})

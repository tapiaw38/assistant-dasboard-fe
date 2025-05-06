import { useMutation, useQuery } from '@tanstack/vue-query'
import { login } from '@/services/auth/login'
import { meUser } from '@/services/auth/meUser'
import type { LoginParams, LoginResponse, MeUserResponse } from '@/types/auth/auth'

export const useAuthQueries = () => {
  const loginMutation = useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: login,
  })

  const meUserQuery = useQuery<MeUserResponse, Error>({
    queryKey: ['meUser'],
    queryFn: meUser,
  })

  return {
    loginMutation,
    meUserQuery,
  }
}

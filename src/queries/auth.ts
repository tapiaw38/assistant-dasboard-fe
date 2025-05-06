import { useMutation, useQuery } from '@tanstack/vue-query'
import { login, meUser } from '@/services/auth/auth'
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

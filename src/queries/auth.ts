import { useMutation, useQuery } from '@tanstack/vue-query'
import { login, meUser, register } from '@/services/auth/auth'
import type {
  LoginParams,
  LoginResponse,
  MeUserResponse,
  RegisterParams,
  RegisterResponse,
} from '@/types/auth/auth'

export const useAuthQueries = () => {
  const loginMutation = useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: login,
  })

  const meUserQuery = useQuery<MeUserResponse, Error>({
    queryKey: ['meUser'],
    queryFn: meUser,
  })

  const registerMutation = useMutation<RegisterResponse, Error, RegisterParams>({
    mutationFn: register,
  })

  return {
    loginMutation,
    meUserQuery,
    registerMutation,
  }
}

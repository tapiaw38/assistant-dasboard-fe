import { server } from '@/api/request/server'
import type { LoginParams, LoginResponse, MeUserResponse } from '@/types/auth/auth'

export const login = async ({ email, password }: LoginParams) => {
  const api = server({
    baseURL: 'http://auth.localhost',
  })

  try {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const meUser = async () => {
  const api = server({
    baseURL: 'http://auth.localhost',
  })

  try {
    const { data } = await api.get<MeUserResponse>('/user/me')
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

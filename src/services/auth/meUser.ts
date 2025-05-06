import { server } from '@/api/request/server'
import type { MeUserResponse } from '@/types/auth/auth'

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

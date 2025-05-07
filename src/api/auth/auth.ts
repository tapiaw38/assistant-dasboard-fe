import type { LoginParams, LoginResponse, MeUserResponse } from '../../types/auth/auth'
import { login, meUser } from '@/services/auth/auth'

export const loginHandler = async (LoginParams: LoginParams) => {
  try {
    const response: LoginResponse = await login(LoginParams)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const meUserHandler = async (): Promise<MeUserResponse> => {
  try {
    const response: MeUserResponse = await meUser()
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

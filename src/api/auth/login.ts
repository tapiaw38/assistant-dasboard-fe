import type { LoginParams, LoginResponse } from '../../types/auth/auth'
import { login } from '@/services/auth/login'

export const loginHandler = async (LoginParams: LoginParams) => {
  try {
    const response: LoginResponse = await login(LoginParams)
    debugger
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

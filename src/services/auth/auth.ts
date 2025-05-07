import { server } from '@/api/request/server'
import type {
  LoginParams,
  LoginResponse,
  MeUserResponse,
  RegisterParams,
  RegisterResponse,
} from '@/types/auth/auth'

export const login = async ({ email, password, ssoType, ssoCode }: LoginParams) => {
  const api = server({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  })

  try {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
      sso_type: ssoType,
      code: ssoCode,
    })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const meUser = async () => {
  const api = server({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  })

  try {
    const { data } = await api.get<MeUserResponse>('/user/me')
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const register = async ({
  first_name,
  last_name,
  email,
  username,
  password,
}: RegisterParams) => {
  const api = server({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  })

  try {
    const { data } = await api.post<RegisterResponse>('/auth/register', {
      first_name,
      last_name,
      email,
      username,
      password,
    })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

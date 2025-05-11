import { server } from '@/api/request/server.ts'
import type {
  LoginParams,
  LoginResponse,
  MeUserResponse,
  RegisterParams,
  RegisterResponse,
} from '@/types/auth.ts'

const BASE_URL = 'http://auth.localhost' //import.meta.env.VITE_AUTH_BASE_URL

export const login = async ({ email, password, ssoType, ssoCode }: LoginParams) => {
  const api = server({
    baseURL: BASE_URL,
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
    baseURL: BASE_URL,
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
    baseURL: BASE_URL,
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

import type { AxiosInstance } from 'axios'
import type {
  LoginParams,
  LoginResponse,
  MeUserResponse,
  RegisterParams,
  RegisterResponse,
} from '@/types/auth'

export interface IAuthService {
  login(params: LoginParams): Promise<LoginResponse>
  meUser(): Promise<MeUserResponse>
  register(params: RegisterParams): Promise<RegisterResponse>
}

export class AuthService implements IAuthService {
  constructor(private readonly api: AxiosInstance) {
    this.api = api
  }

  async login({ email, password, ssoType, ssoCode }: LoginParams): Promise<LoginResponse> {
    const { data } = await this.api.post<LoginResponse>('/auth/login', {
      email,
      password,
      sso_type: ssoType,
      code: ssoCode,
    })
    return data
  }

  async meUser(): Promise<MeUserResponse> {
    const { data } = await this.api.get<MeUserResponse>('/user/me')
    return data
  }

  async register(params: RegisterParams): Promise<RegisterResponse> {
    const { data } = await this.api.post<RegisterResponse>('/auth/register', params)
    return data
  }
}

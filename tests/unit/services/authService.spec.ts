import { describe, it, expect, vi } from 'vitest'
import { AuthService } from '../../../src/services/auth/authService'
import type { AxiosInstance } from 'axios'

const mockApi = {
  post: vi.fn(),
  get: vi.fn(),
}

const service = new AuthService(mockApi as unknown as AxiosInstance)

describe('AuthService', () => {
  it('login should return data', async () => {
    mockApi.post.mockResolvedValue({ data: { token: 'abc', data: { id: 1 } } })

    const res = await service.login({
      email: 'test@example.com',
      password: '123456',
      ssoType: '',
      ssoCode: '',
    })

    expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: '123456',
      sso_type: '',
      code: '',
    })
    expect(res.token).toBe('abc')
  })

  it('meUser should return data', async () => {
    mockApi.get.mockResolvedValue({ data: { data: { id: 1, email: 'test' } } })

    const res = await service.meUser()

    expect(mockApi.get).toHaveBeenCalledWith('/user/me')
    expect(res.data.id).toBe(1)
  })

  it('register should send correct data', async () => {
    mockApi.post.mockResolvedValue({ data: { status: 'ok' } })

    const res = await service.register({
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com',
      username: 'johndoe',
      password: '123456',
    })

    expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com',
      username: 'johndoe',
      password: '123456',
    })
    expect(res.status).toBe('ok')
  })
})

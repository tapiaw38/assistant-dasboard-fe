import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { mount } from '@vue/test-utils'
import { h, provide } from 'vue'
import type { IAuthService } from '../../../src/services/auth/AuthService'
import { useAuthStore } from '../../../src/stores/authStore'

const mockService: IAuthService = {
  login: vi.fn().mockResolvedValue({ token: 'abc123', data: { id: 1, name: 'User' } }),
  meUser: vi.fn().mockResolvedValue({ data: { id: 1, name: 'User' } }),
  register: vi.fn().mockResolvedValue({ status: 'ok' }),
}

describe('authStore', () => {
  let store: ReturnType<ReturnType<typeof useAuthStore>>

  beforeEach(() => {
    mount(
      {
        setup() {
          const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false })
          setActivePinia(pinia)

          provide('authService', mockService)

          const authStore = useAuthStore(mockService)()
          store = authStore
          return () => h('div')
        },
      },
      {
        global: {
          plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
        },
      },
    )

    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should login user and set token', async () => {
    await store.loginUser({
      email: 'test@example.com',
      password: '123456',
      ssoType: '',
      ssoCode: '',
    })

    expect(mockService.login).toHaveBeenCalled()
    expect(store.user).toEqual({ id: 1, name: 'User' })
    expect(store.token).toBe('abc123')
    expect(localStorage.getItem('token')).toBe('abc123')
  })

  it('should logout user and clear token', async () => {
    localStorage.setItem('token', 'abc123')
    store.token = 'abc123'
    store.user = { id: 1, name: 'User' }

    await store.logoutUser()

    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('should fetch user with meUser', async () => {
    await store.meUser()

    expect(mockService.meUser).toHaveBeenCalled()
    expect(store.user).toEqual({ id: 1, name: 'User' })
  })

  it('should register user successfully', async () => {
    await store.registerUser({
      email: 'new@example.com',
      password: '123456',
      name: 'New User',
    })

    expect(mockService.register).toHaveBeenCalled()
  })
})

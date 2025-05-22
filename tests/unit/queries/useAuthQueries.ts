import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthQueries } from '../../../src/queries/auth'
import { provide } from 'vue'
import { mount } from '@vue/test-utils'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import type { IAuthService } from '../../../src/services/auth/AuthService'

const mockService: IAuthService = {
  login: vi.fn().mockResolvedValue({ token: 'abc', data: { id: 1 } }),
  meUser: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  register: vi.fn().mockResolvedValue({ status: 'ok' }),
}

describe('useAuthQueries', () => {
  let loginMutation: ReturnType<typeof useAuthQueries>['loginMutation']
  let meUserQuery: ReturnType<typeof useAuthQueries>['meUserQuery']
  let registerMutation: ReturnType<typeof useAuthQueries>['registerMutation']

  beforeEach(() => {
    vi.clearAllMocks()

    mount(
      {
        template: '<div />',
        setup() {
          provide('authService', mockService)
          const queries = useAuthQueries(mockService)
          loginMutation = queries.loginMutation
          meUserQuery = queries.meUserQuery
          registerMutation = queries.registerMutation
          return {}
        },
      },
      {
        global: {
          plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
        },
      },
    )
  })

  it('should use login mutation', async () => {
    const result = await loginMutation!.mutateAsync({
      email: 'test@example.com',
      password: '123456',
      ssoType: '',
      ssoCode: '',
    })

    expect(mockService.login).toHaveBeenCalled()
    expect(result.token).toBe('abc')
  })

  it('should fetch meUser data with query', async () => {
    const { data } = await meUserQuery!.refetch()

    expect(mockService.meUser).toHaveBeenCalled()
    expect(data?.data.id).toBe(1)
  })

  it('should use register mutation', async () => {
    const result = await registerMutation!.mutateAsync({
      email: 'test@example.com',
      password: '123456',
      name: 'Test User',
    })

    expect(mockService.register).toHaveBeenCalled()
    expect(result.status).toBe('ok')
  })
})

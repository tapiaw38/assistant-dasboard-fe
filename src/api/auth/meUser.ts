import type { MeUserResponse } from '../../types/auth/auth'
import { meUser } from '@/services/auth/meUser'

export const meUserHandler = async (): Promise<MeUserResponse> => {
  try {
    const response: MeUserResponse = await meUser()
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

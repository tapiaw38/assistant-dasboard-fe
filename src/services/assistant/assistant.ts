import { server } from '@/api/request/server'
import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
} from '@/types/assistant/assistant'

export const addAssistant = async (assistantProfile: AssistantProfileParams) => {
  const api = server({
    baseURL: 'http://assistant.localhost',
  })

  try {
    const { data } = await api.post<AssistantProfileResponse>('/profile', assistantProfile)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAssistant = async (): Promise<AssistantProfileResponse> => {
  const api = server({
    baseURL: 'http://assistant.localhost',
  })

  try {
    const { data } = await api.get<AssistantProfileResponse>('/profile')
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateAssistant = async (assistantProfile: AssistantProfileUpdateParams) => {
  const api = server({
    baseURL: 'http://assistant.localhost',
  })

  try {
    const { data } = await api.patch<AssistantProfileResponse>('/profile', assistantProfile)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

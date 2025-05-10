import { server } from '@/api/request/server'
import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyResponse,
  ApiKeyParams,
  ApiKeyRemoveResponse,
} from '@/types/assistant/assistant'

export const addAssistant = async (assistantProfile: AssistantProfileParams) => {
  const api = server({
    baseURL: import.meta.env.VITE_ASSISTANT_BASE_URL,
  })

  try {
    const { data } = await api.post<AssistantProfileResponse>('/profile/', assistantProfile)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAssistant = async (): Promise<AssistantProfileResponse> => {
  const api = server({
    baseURL: import.meta.env.VITE_ASSISTANT_BASE_URL,
  })

  try {
    const { data } = await api.get<AssistantProfileResponse>('/profile/')
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateAssistant = async (assistantProfile: AssistantProfileUpdateParams) => {
  const api = server({
    baseURL: import.meta.env.VITE_ASSISTANT_BASE_URL,
  })

  try {
    const { data } = await api.patch<AssistantProfileResponse>('/profile/', assistantProfile)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addApiKey = async (apiKey: ApiKeyParams) => {
  const api = server({
    baseURL: import.meta.env.VITE_ASSISTANT_BASE_URL,
  })

  try {
    const { data } = await api.post<ApiKeyResponse>('/profile/api-key', apiKey)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const removeApiKey = async (apiKeyId: string) => {
  const api = server({
    baseURL: import.meta.env.VITE_ASSISTANT_BASE_URL,
  })

  try {
    const { data } = await api.delete<ApiKeyRemoveResponse>(`/profile/api-key/${apiKeyId}`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

import { server } from '@/api/request/server.ts'
import type { AssistantConversationResponse } from '@/types/conversation'

const BASE_URL = import.meta.env.VITE_ASSISTANT_BASE_URL

export const getUserConversation = async () => {
  const api = server({
    baseURL: BASE_URL,
  })

  try {
    const { data } = await api.get<AssistantConversationResponse>('/conversation/user')
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

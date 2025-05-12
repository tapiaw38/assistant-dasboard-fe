import type { AssistantConversationResponse } from '@/types/conversation'
import { getUserConversation } from '@/services/conversation.ts'

export const getUserConversationHandler = async () => {
  try {
    const response: AssistantConversationResponse = await getUserConversation()
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

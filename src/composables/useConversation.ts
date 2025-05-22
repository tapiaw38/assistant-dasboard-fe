import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useConversationStore } from '@/stores/conversationStore'
import type { IConversationService } from '../services/conversation/conversationService'

export const useConversation = () => {
  const services = inject<{ conversationService: IConversationService }>('services')
  if (!services) throw new Error('Services not provided')

  const conversationService = services.conversationService

  const store = useConversationStore(conversationService)
  const conversationStore = store()

  const {
    conversations,
    isGetUserConversationPending,
    isGetUserConversationSuccess,
    isGetUserConversationError,
    getUserConversationError,
  } = storeToRefs(conversationStore)

  const { getUserConversation } = conversationStore

  return {
    // Data
    conversations,

    isGetUserConversationPending,
    isGetUserConversationSuccess,
    isGetUserConversationError,
    getUserConversationError,

    // Methods
    getUserConversation,
  }
}

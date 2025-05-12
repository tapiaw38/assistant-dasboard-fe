import { storeToRefs } from 'pinia'
import { useConversationStore } from '@/stores/conversationStore'

export const useConversation = () => {
  const conversationStore = useConversationStore()

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

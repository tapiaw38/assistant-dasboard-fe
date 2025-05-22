import { defineStore } from 'pinia'
import { useConversationQueries } from '@/queries/conversation'
import type { IConversationService } from '@/services/conversation/conversationService'
import type { AssistantConversation } from '@/types/conversation'
import { ref } from 'vue'

export const useConversationStore = (conversationService: IConversationService) =>
  defineStore('conversationStore', () => {
    const conversations = ref<AssistantConversation[] | null | undefined>(null)

    const { getUserConversationQuery } = useConversationQueries(conversationService)

    const getUserConversation = async () => {
      try {
        const { data } = await getUserConversationQuery.refetch()
        conversations.value = data?.data
      } catch (error) {
        console.error('Failed to fetch conversation data:', error)
      }
    }

    return {
      conversations,
      getUserConversation,

      isGetUserConversationPending: getUserConversationQuery.isPending,
      isGetUserConversationSuccess: getUserConversationQuery.isSuccess,
      isGetUserConversationError: getUserConversationQuery.isError,
      getUserConversationError: getUserConversationQuery.error,
    }
  })

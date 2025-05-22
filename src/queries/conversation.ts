import { useQuery } from '@tanstack/vue-query'
import type { AssistantConversationResponse } from '@/types/conversation'
import type { IConversationService } from '@/services/conversation/conversationService'

export const useConversationQueries = (conversationService: IConversationService) => {
  const getUserConversationQuery = useQuery<AssistantConversationResponse, Error>({
    queryKey: ['getUserConversation'],
    queryFn: conversationService.getUserConversation.bind(conversationService),
  })

  return {
    getUserConversationQuery,
  }
}

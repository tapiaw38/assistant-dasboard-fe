import { useQuery } from '@tanstack/vue-query'
import { getUserConversationHandler } from '@/api/conversation.ts'
import type { AssistantConversationResponse } from '@/types/conversation'

export const useConversationQueries = () => {
  const getUserConversationQuery = useQuery<AssistantConversationResponse, Error>({
    queryKey: ['getUserConversation'],
    queryFn: getUserConversationHandler,
  })

  return {
    getUserConversationQuery,
  }
}

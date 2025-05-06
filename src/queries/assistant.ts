import { useMutation, useQuery } from '@tanstack/vue-query'
import { addAssistantProfileHandler, getAssistantProfileHandler } from '@/api/assistant/assistant'
import type { AssistantProfileParams, AssistantProfileResponse } from '@/types/assistant/assistant'

export const useAssistantQueries = () => {
  const addAssistantProfileMutation = useMutation<
    AssistantProfileResponse,
    Error,
    AssistantProfileParams
  >({
    mutationFn: addAssistantProfileHandler,
  })

  const getAssistantProfileQuery = useQuery<AssistantProfileResponse, Error>({
    queryKey: ['getAssistantProfile'],
    queryFn: getAssistantProfileHandler,
  })

  return {
    addAssistantProfileMutation,
    getAssistantProfileQuery,
  }
}

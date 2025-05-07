import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  addAssistantProfileHandler,
  getAssistantProfileHandler,
  updateAssistantProfileHandler,
} from '@/api/assistant/assistant'
import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
} from '@/types/assistant/assistant'

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

  const updateAssistantProfileMutation = useMutation<
    AssistantProfileResponse,
    Error,
    AssistantProfileUpdateParams
  >({
    mutationFn: updateAssistantProfileHandler,
  })

  return {
    addAssistantProfileMutation,
    getAssistantProfileQuery,
    updateAssistantProfileMutation,
  }
}

import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  addAssistantProfileHandler,
  getAssistantProfileHandler,
  updateAssistantProfileHandler,
  addApiKeyHandler,
  removeApiKeyHandler,
} from '@/api/assistant.ts'
import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyParams,
  ApiKeyResponse,
  ApiKeyRemoveResponse,
} from '@/types/assistant.ts'

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

  const addApiKeyMutation = useMutation<ApiKeyResponse, Error, ApiKeyParams>({
    mutationFn: addApiKeyHandler,
  })

  const removeApiKeyMutation = useMutation<ApiKeyRemoveResponse, Error, string>({
    mutationFn: removeApiKeyHandler,
  })

  return {
    addAssistantProfileMutation,
    getAssistantProfileQuery,
    updateAssistantProfileMutation,
    addApiKeyMutation,
    removeApiKeyMutation,
  }
}

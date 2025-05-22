import { useMutation, useQuery } from '@tanstack/vue-query'
import type { IAssistantService } from '@/services/assistant/assistantService'
import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyParams,
  ApiKeyResponse,
  ApiKeyRemoveResponse,
  AssistantFileResponse,
  AssistantFileRemoveResponse,
} from '@/types/assistant.ts'

export const useAssistantQueries = (assistantService: IAssistantService) => {
  const addAssistantProfileMutation = useMutation<
    AssistantProfileResponse,
    Error,
    AssistantProfileParams
  >({
    mutationFn: assistantService.addAssistant.bind(assistantService),
  })

  const getAssistantProfileQuery = useQuery<AssistantProfileResponse, Error>({
    queryKey: ['getAssistantProfile'],
    queryFn: assistantService.getAssistant.bind(assistantService),
  })

  const updateAssistantProfileMutation = useMutation<
    AssistantProfileResponse,
    Error,
    AssistantProfileUpdateParams
  >({
    mutationFn: assistantService.updateAssistant.bind(assistantService),
  })

  const addApiKeyMutation = useMutation<ApiKeyResponse, Error, ApiKeyParams>({
    mutationFn: assistantService.addApiKey.bind(assistantService),
  })

  const removeApiKeyMutation = useMutation<ApiKeyRemoveResponse, Error, string>({
    mutationFn: assistantService.removeApiKey.bind(assistantService),
  })

  const addFilesMutation = useMutation<AssistantFileResponse, Error, File[]>({
    mutationFn: assistantService.addFiles.bind(assistantService),
  })

  const removeFileByIdMutation = useMutation<AssistantFileRemoveResponse, Error, string>({
    mutationFn: assistantService.removeFileById.bind(assistantService),
  })

  return {
    addAssistantProfileMutation,
    getAssistantProfileQuery,
    updateAssistantProfileMutation,
    addApiKeyMutation,
    removeApiKeyMutation,
    addFilesMutation,
    removeFileByIdMutation,
  }
}

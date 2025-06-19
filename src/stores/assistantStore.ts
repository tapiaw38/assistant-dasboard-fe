import { defineStore } from 'pinia'
import { useAssistantQueries } from '@/queries/assistant'
import { ref } from 'vue'
import type { IAssistantService } from '@/services/assistant/assistantService'
import type {
  AssistantProfileParams,
  AssistantProfile,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyResponse,
  ApiKeyParams,
  ApiKeyRemoveResponse,
  IntegrationParams,
} from '@/types/assistant.ts'

export const useAssistantStore = (assistantService: IAssistantService) =>
  defineStore('assistant', () => {
    const assistantProfile = ref<AssistantProfile | null | undefined>(null)

    const {
      addAssistantProfileMutation,
      getAssistantProfileQuery,
      updateAssistantProfileMutation,
      addApiKeyMutation,
      removeApiKeyMutation,
      addFilesMutation,
      removeFileByIdMutation,
      addIntegrationMutation,
    } = useAssistantQueries(assistantService)

    const addAssistantProfile = (params: AssistantProfileParams) => {
      addAssistantProfileMutation.mutateAsync(params, {
        onSuccess: (response: AssistantProfileResponse) => {
          assistantProfile.value = response.data
        },
        onError: (error) => {
          console.error('Failed to add assistant profile:', error)
        },
      })
    }

    const getAssistantProfile = async () => {
      try {
        const { data } = await getAssistantProfileQuery.refetch()
        assistantProfile.value = data?.data
      } catch (error) {
        console.error('Failed to fetch assistant profile data:', error)
      }
    }

    const updateAssistantProfile = async (params: AssistantProfileUpdateParams) => {
      try {
        const data = await updateAssistantProfileMutation.mutateAsync(params)
        assistantProfile.value = data?.data
      } catch (error) {
        console.error('Failed to update assistant profile:', error)
      }
    }

    const addApiKey = async (params: ApiKeyParams) => {
      try {
        const data: ApiKeyResponse = await addApiKeyMutation.mutateAsync(params)
        assistantProfile.value!.api_keys = [...data?.data]
      } catch (error) {
        console.error('Failed to add api key:', error)
      }
    }

    const removeApiKey = async (apiKeyId: string) => {
      try {
        const data: ApiKeyRemoveResponse = await removeApiKeyMutation.mutateAsync(apiKeyId)
        const apiKey = assistantProfile.value!.api_keys.find(
          (apiKey) => apiKey.id === data?.data.id,
        )
        if (apiKey) {
          apiKey.is_active = false
        }
      } catch (error) {
        console.error('Failed to remove api key:', error)
      }
    }

    const addFiles = async (files: File[]) => {
      try {
        const data = await addFilesMutation.mutateAsync(files)
        assistantProfile.value!.files = [...data?.data]
      } catch (error) {
        console.error('Failed to add files:', error)
      }
    }

    const removeFileById = async (fileId: string) => {
      try {
        const data = await removeFileByIdMutation.mutateAsync(fileId)
        assistantProfile.value!.files = assistantProfile.value!.files?.filter(
          (file) => file.id !== data?.data.id,
        )
      } catch (error) {
        console.error('Failed to remove file:', error)
      }
    }

    const addIntegration = async (integration: IntegrationParams) => {
      try {
        const data = await addIntegrationMutation.mutateAsync(integration)
        assistantProfile.value!.integrations = [...data?.data]
      } catch (error) {
        console.error('Failed to add integration:', error)
      }
    }

    return {
      assistantProfile,
      addAssistantProfile,
      getAssistantProfile,
      updateAssistantProfile,
      addApiKey,
      removeApiKey,
      addFiles,
      removeFileById,
      addIntegration,

      isAddAssistantProfilePending: addAssistantProfileMutation.isPending,
      isAddAssistantProfileSuccess: addAssistantProfileMutation.isSuccess,
      isAddAssistantProfileError: addAssistantProfileMutation.isError,
      addAssistantProfileError: addAssistantProfileMutation.error,

      isGetAssistantProfilePending: getAssistantProfileQuery.isPending,
      isGetAssistantProfileSuccess: getAssistantProfileQuery.isSuccess,
      isGetAssistantProfileError: getAssistantProfileQuery.isError,
      getAssistantProfileError: getAssistantProfileQuery.error,

      isUpdateAssistantProfilePending: updateAssistantProfileMutation.isPending,
      isUpdateAssistantProfileSuccess: updateAssistantProfileMutation.isSuccess,
      isUpdateAssistantProfileError: updateAssistantProfileMutation.isError,
      updateAssistantProfileError: updateAssistantProfileMutation.error,

      addApiKeyError: addApiKeyMutation.error,
      isAddApiKeyPending: addApiKeyMutation.isPending,
      isAddApiKeySuccess: addApiKeyMutation.isSuccess,
      isAddApiKeyError: addApiKeyMutation.isError,

      isRemoveApiKeyPending: removeApiKeyMutation.isPending,
      isRemoveApiKeySuccess: removeApiKeyMutation.isSuccess,
      isRemoveApiKeyError: removeApiKeyMutation.isError,
      removeApiKeyError: removeApiKeyMutation.error,

      isAddFilesPending: addFilesMutation.isPending,
      isAddFilesSuccess: addFilesMutation.isSuccess,
      isAddFilesError: addFilesMutation.isError,
      addFilesError: addFilesMutation.error,

      isRemoveFileByIdPending: removeFileByIdMutation.isPending,
      isRemoveFileByIdSuccess: removeFileByIdMutation.isSuccess,
      isRemoveFileByIdError: removeFileByIdMutation.isError,
      removeFileByIdError: removeFileByIdMutation.error,

      isAddIntegrationPending: addIntegrationMutation.isPending,
      isAddIntegrationSuccess: addIntegrationMutation.isSuccess,
      isAddIntegrationError: addIntegrationMutation.isError,
      addIntegrationError: addIntegrationMutation.error,
    }
  })

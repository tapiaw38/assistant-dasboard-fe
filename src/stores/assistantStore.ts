import { defineStore } from 'pinia'
import { useAssistantQueries } from '@/queries/assistant'
import { ref } from 'vue'
import type {
  AssistantProfileParams,
  AssistantProfile,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyResponse,
  ApiKeyParams,
  ApiKeyRemoveResponse,
} from '@/types/assistant/assistant'

export const useAssistantStore = defineStore('assistant', () => {
  const assistantProfile = ref<AssistantProfile | null | undefined>(null)

  const {
    addAssistantProfileMutation,
    getAssistantProfileQuery,
    updateAssistantProfileMutation,
    addApiKeyMutation,
    removeApiKeyMutation,
  } = useAssistantQueries()

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
      const apiKeyIndex = assistantProfile.value!.api_keys.findIndex(
        (apiKey) => apiKey.id === data?.data.id,
      )
      assistantProfile.value!.api_keys.splice(apiKeyIndex, 1)
    } catch (error) {
      console.error('Failed to remove api key:', error)
    }
  }

  return {
    assistantProfile,
    addAssistantProfile,
    getAssistantProfile,
    updateAssistantProfile,
    addApiKey,
    removeApiKey,

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
  }
})

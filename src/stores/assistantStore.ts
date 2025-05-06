import { defineStore } from 'pinia'
import { useAssistantQueries } from '@/queries/assistant'
import { ref } from 'vue'
import type {
  AssistantProfileParams,
  AssistantProfile,
  AssistantProfileResponse,
} from '@/types/assistant/assistant'

export const useAssistantStore = defineStore('assistant', () => {
  const assistantProfile = ref<AssistantProfile | null | undefined>(null)

  const { addAssistantProfileMutation, getAssistantProfileQuery } = useAssistantQueries()

  const addAssistantProfile = (params: AssistantProfileParams) => {
    addAssistantProfileMutation.mutate(params, {
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

  return {
    assistantProfile,
    addAssistantProfile,
    getAssistantProfile,
    isAddAssistantProfilePending: addAssistantProfileMutation.isPending,
    isAddAssistantProfileSuccess: addAssistantProfileMutation.isSuccess,
    isAddAssistantProfileError: addAssistantProfileMutation.isError,
    addAssistantProfileError: addAssistantProfileMutation.error,

    isGetAssistantProfilePending: getAssistantProfileQuery.isPending,
    isGetAssistantProfileSuccess: getAssistantProfileQuery.isSuccess,
    isGetAssistantProfileError: getAssistantProfileQuery.isError,
    getAssistantProfileError: getAssistantProfileQuery.error,
  }
})

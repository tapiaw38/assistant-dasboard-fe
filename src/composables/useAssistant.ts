import { storeToRefs } from 'pinia'
import { useAssistantStore } from '@/stores/assistantStore'

export const useAssistant = () => {
  const assistantStore = useAssistantStore()

  const {
    assistantProfile,
    isAddAssistantProfilePending,
    isAddAssistantProfileSuccess,
    isAddAssistantProfileError,
    addAssistantProfileError,
    isGetAssistantProfilePending,
    isGetAssistantProfileSuccess,
    isGetAssistantProfileError,
    getAssistantProfileError,
  } = storeToRefs(assistantStore)

  const { addAssistantProfile, getAssistantProfile } = assistantStore

  return {
    // Data
    assistantProfile,
    addAssistantProfileError,
    isAddAssistantProfilePending,
    isAddAssistantProfileSuccess,
    isAddAssistantProfileError,
    isGetAssistantProfilePending,
    isGetAssistantProfileSuccess,
    isGetAssistantProfileError,
    getAssistantProfileError,

    // Methods
    addAssistantProfile,
    getAssistantProfile,
  }
}

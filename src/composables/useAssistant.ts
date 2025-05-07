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

    isUpdateAssistantProfilePending,
    isUpdateAssistantProfileSuccess,
    isUpdateAssistantProfileError,
    updateAssistantProfileError,
  } = storeToRefs(assistantStore)

  const { addAssistantProfile, getAssistantProfile, updateAssistantProfile } = assistantStore

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

    isUpdateAssistantProfilePending,
    isUpdateAssistantProfileSuccess,
    isUpdateAssistantProfileError,
    updateAssistantProfileError,

    // Methods
    addAssistantProfile,
    getAssistantProfile,
    updateAssistantProfile,
  }
}

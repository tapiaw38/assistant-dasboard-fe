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

    isAddApiKeyError,
    isAddApiKeyPending,
    isAddApiKeySuccess,
    addApiKeyError,

    isRemoveApiKeyPending,
    isRemoveApiKeySuccess,
    isRemoveApiKeyError,
    removeApiKeyError,
  } = storeToRefs(assistantStore)

  const {
    addAssistantProfile,
    getAssistantProfile,
    updateAssistantProfile,
    addApiKey,
    removeApiKey,
  } = assistantStore

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

    addApiKeyError,
    isAddApiKeyPending,
    isAddApiKeySuccess,
    isAddApiKeyError,

    isRemoveApiKeyPending,
    isRemoveApiKeySuccess,
    isRemoveApiKeyError,
    removeApiKeyError,

    // Methods
    addAssistantProfile,
    getAssistantProfile,
    updateAssistantProfile,
    addApiKey,
    removeApiKey,
  }
}

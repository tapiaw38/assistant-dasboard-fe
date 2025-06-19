import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useAssistantStore } from '@/stores/assistantStore'
import type { IAssistantService } from '../services/assistant/assistantService'

export const useAssistant = () => {
  const services = inject<{ assistantService: IAssistantService }>('services')
  if (!services) throw new Error('Services not provided')

  const assistantService = services.assistantService

  const store = useAssistantStore(assistantService)
  const assistantStore = store()

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

    isAddFilesPending,
    isAddFilesSuccess,
    isAddFilesError,
    addFilesError,

    isRemoveFileByIdPending,
    isRemoveFileByIdSuccess,
    isRemoveFileByIdError,
    removeFileByIdError,

    isAddIntegrationPending,
    isAddIntegrationSuccess,
    isAddIntegrationError,
    addIntegrationError,
  } = storeToRefs(assistantStore)

  const {
    addAssistantProfile,
    getAssistantProfile,
    updateAssistantProfile,
    addApiKey,
    removeApiKey,
    addFiles,
    removeFileById,
    addIntegration,
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

    isAddFilesPending,
    isAddFilesSuccess,
    isAddFilesError,
    addFilesError,

    isRemoveFileByIdPending,
    isRemoveFileByIdSuccess,
    isRemoveFileByIdError,
    removeFileByIdError,

    isAddIntegrationPending,
    isAddIntegrationSuccess,
    isAddIntegrationError,
    addIntegrationError,

    // Methods
    addAssistantProfile,
    getAssistantProfile,
    updateAssistantProfile,
    addApiKey,
    removeApiKey,
    addFiles,
    removeFileById,
    addIntegration,
    reset: assistantStore.$reset,
  }
}

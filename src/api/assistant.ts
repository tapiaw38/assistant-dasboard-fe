import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyParams,
  ApiKeyResponse,
  ApiKeyRemoveResponse,
  AssistantFileResponse,
  AssistantFileRemoveResponse,
} from '../types/assistant.ts'
import {
  addAssistant,
  getAssistant,
  updateAssistant,
  addApiKey,
  removeApiKey,
  addFiles,
  removeFileById,
} from '@/services/assistant.ts'

export const addAssistantProfileHandler = async (assistantProfile: AssistantProfileParams) => {
  try {
    const response: AssistantProfileResponse = await addAssistant(assistantProfile)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAssistantProfileHandler = async () => {
  try {
    const response: AssistantProfileResponse = await getAssistant()
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateAssistantProfileHandler = async (
  assistantProfile: AssistantProfileUpdateParams,
) => {
  try {
    const response: AssistantProfileResponse = await updateAssistant(assistantProfile)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addApiKeyHandler = async (apiKey: ApiKeyParams) => {
  try {
    const response: ApiKeyResponse = await addApiKey(apiKey)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const removeApiKeyHandler = async (apiKeyId: string) => {
  try {
    const response: ApiKeyRemoveResponse = await removeApiKey(apiKeyId)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addFilesHandler = async (files: File[]) => {
  try {
    const response: AssistantFileResponse = await addFiles(files)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const removeFileByIdHandler = async (fileId: string) => {
  try {
    const response: AssistantFileRemoveResponse = await removeFileById(fileId)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

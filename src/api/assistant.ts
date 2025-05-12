import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyParams,
  ApiKeyResponse,
  ApiKeyRemoveResponse,
} from '../types/assistant.ts'
import {
  addAssistant,
  getAssistant,
  updateAssistant,
  addApiKey,
  removeApiKey,
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

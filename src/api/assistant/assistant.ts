import type {
  AssistantProfileParams,
  AssistantProfileResponse,
} from '../../types/assistant/assistant'
import { addAssistant, getAssistant } from '@/services/assistant/assistant'

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

import { server } from '@/api/request/server'
import { ConversationService } from './conversationService'

const BASE_URL = import.meta.env.VITE_ASSISTANT_BASE_URL
export const conversationService = new ConversationService(server({ baseURL: BASE_URL }))

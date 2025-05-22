import { server } from '@/api/request/server'
import { AssistantService } from './assistantService'

const BASE_URL = import.meta.env.VITE_ASSISTANT_BASE_URL
export const assistantService = new AssistantService(server({ baseURL: BASE_URL }))

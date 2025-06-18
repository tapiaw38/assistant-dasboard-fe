import { server } from '@/api/request/server'
import { ChatflowService } from './chatflowService'

const BASE_URL = 'http://localhost:3000'
export const chatflowService = new ChatflowService(server({ baseURL: BASE_URL }))

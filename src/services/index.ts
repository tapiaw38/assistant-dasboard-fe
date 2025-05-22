import { authService } from './auth'
import { assistantService } from './assistant'
import { conversationService } from './conversation'
import { chatflowService } from './chatflow'

class Services {
  authService: typeof authService
  assistantService: typeof assistantService
  conversationService: typeof conversationService
  chatflowService: typeof chatflowService

  constructor() {
    this.authService = authService
    this.assistantService = assistantService
    this.conversationService = conversationService
    this.chatflowService = chatflowService
  }
}

const services = new Services()
export default services

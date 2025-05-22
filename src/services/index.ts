import { authService } from './auth'
import { assistantService } from './assistant'
import { conversationService } from './conversation'

class Services {
  authService: typeof authService
  assistantService: typeof assistantService
  conversationService: typeof conversationService

  constructor() {
    this.authService = authService
    this.assistantService = assistantService
    this.conversationService = conversationService
  }
}

const services = new Services()
export default services

import type { AssistantProfile } from './assistant'

export interface AssistantConversation {
  id: string
  title: string
  created_at: string
  profile: AssistantProfile
  messages: ConversationMessage[]
}

export interface ConversationMessage {
  content: string
  sender: string
  created_at: string
}

export interface AssistantConversationResponse {
  data: AssistantConversation[]
}

export interface AssistantConversationParams {
  title: string
}

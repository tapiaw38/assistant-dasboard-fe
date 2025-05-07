export interface AssistantProfileParams {
  assistant_name: string
  business_name: string
  functions: string
  business_context: string
}

export interface AssistantProfileUpdateParams {
  assistant_name: string
  business_name: string
  functions: string
  business_context: string
}

export interface AssistantProfile {
  id: string
  assistant_name: string
  business_name: string
  functions: string
  business_context: string
  user_id: string
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface AssistantProfileResponse {
  data: AssistantProfile
}

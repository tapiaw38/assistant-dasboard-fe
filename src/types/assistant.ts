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
  api_keys: ApiKey[]
}

export interface AssistantProfileResponse {
  data: AssistantProfile
}

export interface ApiKeyParams {
  description: string
}

export interface ApiKey {
  id: string
  user_id: string
  value: string
  description: string
  is_active: boolean
  limit: number
  created_at: string
}

export interface ApiKeyResponse {
  data: ApiKey[]
}

export interface ApiKeyRemoveID {
  id: string
}

export interface ApiKeyRemoveResponse {
  data: ApiKeyRemoveID
}

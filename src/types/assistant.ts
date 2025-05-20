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
  iteration_limit: number
  api_keys: ApiKey[]
  files?: AssistantFile[]
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

export interface AssistantFile {
  id: string
  name: string
  url: string
  created_at: string
}

export interface AssistantFileResponse {
  data: AssistantFile[]
}

export interface AssistantFileRemoveID {
  id: string
}
export interface AssistantFileRemoveResponse {
  data: AssistantFileRemoveID
}

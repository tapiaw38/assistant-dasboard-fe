import type { AxiosInstance } from 'axios'
import type {
  AssistantProfileParams,
  AssistantProfileResponse,
  AssistantProfileUpdateParams,
  ApiKeyResponse,
  ApiKeyParams,
  ApiKeyRemoveResponse,
  AssistantFileResponse,
  AssistantFileRemoveResponse,
  IntegrationParams,
  IntegrationResponse,
} from '@/types/assistant.ts'

export interface IAssistantService {
  addAssistant(assistantProfile: AssistantProfileParams): Promise<AssistantProfileResponse>
  getAssistant(): Promise<AssistantProfileResponse>
  updateAssistant(assistantProfile: AssistantProfileUpdateParams): Promise<AssistantProfileResponse>
  addApiKey(apiKey: ApiKeyParams): Promise<ApiKeyResponse>
  removeApiKey(apiKeyId: string): Promise<ApiKeyRemoveResponse>
  addFiles(files: File[]): Promise<AssistantFileResponse>
  removeFileById(fileId: string): Promise<AssistantFileRemoveResponse>
  addIntegration(integration: IntegrationParams): Promise<IntegrationResponse>
}

export class AssistantService implements IAssistantService {
  constructor(private readonly api: AxiosInstance) {
    this.api = api
  }

  async addAssistant(assistantProfile: AssistantProfileParams): Promise<AssistantProfileResponse> {
    const { data } = await this.api.post<AssistantProfileResponse>('/profile/', assistantProfile)
    return data
  }

  async getAssistant(): Promise<AssistantProfileResponse> {
    const { data } = await this.api.get<AssistantProfileResponse>('/profile/')
    return data
  }

  async updateAssistant(
    assistantProfile: AssistantProfileUpdateParams,
  ): Promise<AssistantProfileResponse> {
    const { data } = await this.api.patch<AssistantProfileResponse>('/profile/', assistantProfile)
    return data
  }

  async addApiKey(apiKey: ApiKeyParams): Promise<ApiKeyResponse> {
    const { data } = await this.api.post<ApiKeyResponse>('/profile/api-key', apiKey)
    return data
  }

  async removeApiKey(apiKeyId: string): Promise<ApiKeyRemoveResponse> {
    const { data } = await this.api.delete<ApiKeyRemoveResponse>(`/profile/api-key/${apiKeyId}`)
    return data
  }

  async addFiles(files: File[]): Promise<AssistantFileResponse> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })

    const { data } = await this.api.post<AssistantFileResponse>('/profile/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  }

  async removeFileById(fileId: string): Promise<AssistantFileRemoveResponse> {
    const { data } = await this.api.delete<AssistantFileRemoveResponse>(`/profile/files/${fileId}`)
    return data
  }

  async addIntegration(integration: IntegrationParams): Promise<IntegrationResponse> {
    const { data } = await this.api.post<IntegrationResponse>('/profile/integrations', integration)
    return data
  }
}

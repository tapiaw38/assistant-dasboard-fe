import type { AxiosInstance } from 'axios'

export interface IChatflowService {
  getQRCode(): Promise<string>
}

export class ChatflowService implements IChatflowService {
  constructor(private readonly api: AxiosInstance) {}

  async getQRCode(): Promise<string> {
    const { data } = await this.api.get<string>('/whatsapp/qr')
    return data
  }
}

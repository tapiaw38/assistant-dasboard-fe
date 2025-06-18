import { useQuery } from '@tanstack/vue-query'
import type { IChatflowService } from '@/services/chatflow/chatflowService'

export function useChatflowQueries(chatflowService: IChatflowService) {
  const getQRCodeQuery = useQuery<string, Error>({
    queryKey: ['qrCode'],
    queryFn: chatflowService.getQRCode.bind(chatflowService),
  })

  return {
    getQRCodeQuery,
  }
}

import type { IChatflowService } from '@/services/chatflow/chatflowService'
import { useChatflowStore } from '@/stores/chatflowStore'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'

export const useChatflow = () => {
  const services = inject<{ chatflowService: IChatflowService }>('services')
  if (!services) throw new Error('Services not provided')

  const chatflowService = services.chatflowService

  const store = useChatflowStore(chatflowService)
  const chatflowStore = store()

  const {
    qrCode,

    isGetQRCodeLoading,
    isGetQRCodeSuccess,
    isGetQRCodeError,
    getQRCodeError,
  } = storeToRefs(chatflowStore)

  const { getQRCode } = chatflowStore

  return {
    // Data
    qrCode,

    isGetQRCodeLoading,
    isGetQRCodeSuccess,
    isGetQRCodeError,
    getQRCodeError,

    // Methods
    getQRCode,
  }
}

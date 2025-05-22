import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IChatflowService } from '@/services/chatflow/chatflowService'
import { useChatflowQueries } from '@/queries/chatflow'

export const useChatflowStore = (chatflowService: IChatflowService) =>
  defineStore('chatflow', () => {
    const qrCode = ref<string | undefined>(undefined)

    const { getQRCodeQuery } = useChatflowQueries(chatflowService)

    const getQRCode = async () => {
      try {
        const { data } = await getQRCodeQuery.refetch()
        qrCode.value = data
      } catch (err) {
        console.error('Error fetching QR code:', err)
      }
    }

    return {
      qrCode,
      getQRCode,

      isGetQRCodeLoading: getQRCodeQuery.isLoading,
      isGetQRCodeSuccess: getQRCodeQuery.isSuccess,
      isGetQRCodeError: getQRCodeQuery.isError,
      getQRCodeError: getQRCodeQuery.error,
    }
  })

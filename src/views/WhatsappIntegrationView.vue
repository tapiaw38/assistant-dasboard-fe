<script setup lang="ts">
import { useChatflow } from '@/composables/useChatflow'
import { onMounted } from 'vue'

const { qrCode, getQRCode } = useChatflow()

onMounted(() => {
  getQRCode()
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl text-gray-500 font-bold mb-2">📥 Mensajes de WhatsApp</h2>
    <div class="mb-4">
      <p class="text-gray-500">Escanea este QR con WhatsApp Web:</p>
      <p class="text-sm text-gray-400 mt-1">
        Asegúrate de estar conectado a internet y tener sesión iniciada en tu teléfono para
        completar la vinculación correctamente.
      </p>
      <div v-if="qrCode" class="flex justify-center my-4">
        <img :src="qrCode" alt="QR de WhatsApp" class="qr-image w-48 h-48" />
      </div>
      <div v-else class="text-gray-500 text-center my-4">Cargando QR...</div>
    </div>
  </div>
</template>

<style scoped>
.qr-image {
  width: 400px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
</style>

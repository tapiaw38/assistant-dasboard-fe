<script setup lang="ts">
import type { IntegrationParams } from '@/types/assistant'
import { onMounted, reactive, computed } from 'vue'
import { useAssistant } from '@/composables/useAssistant'

const { addIntegration, getAssistantProfile, assistantProfile } = useAssistant()

const whatsappIntegration = reactive<IntegrationParams>({
  name: 'whatsapp',
  type: 'integration',
  config: {
    phoneNumber: '',
    whatsappToken: '',
  },
})

const validationErrors = reactive({
  phoneNumber: '',
  whatsappToken: '',
})

const saveConfig = async () => {
  validationErrors.phoneNumber = !whatsappIntegration.config.phoneNumber
    ? 'El número de teléfono es obligatorio.'
    : ''
  validationErrors.whatsappToken = !whatsappIntegration.config.whatsappToken
    ? 'El token de WhatsApp es obligatorio.'
    : ''

  if (validationErrors.phoneNumber || validationErrors.whatsappToken) {
    return
  }
  try {
    await addIntegration(whatsappIntegration)
    console.log('Configuración guardada:', whatsappIntegration)
    await getAssistantProfile()
  } catch (error) {
    console.error('Error al guardar la configuración:', error)
  }
}

const searchWhatsappIntegration = computed(() => {
  return assistantProfile.value?.integrations?.find(
    (integration) => integration.name === 'whatsapp',
  )
})

onMounted(async () => {
  getAssistantProfile()
})
</script>

<template>
  <div class="p-4">
    <form
      class="flex items-center justify-center mt-4 flex flex-column"
      @submit.prevent="saveConfig"
    >
      <div class="mb-4 w-full max-w-md flex">
        <label for="phoneNumber" class="block text-gray-700 text-sm font-bold mb-2"
          >Número de Teléfono:</label
        >
        <input
          id="phoneNumber"
          type="text"
          v-model="whatsappIntegration.config.phoneNumber"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: +1234567890"
          required
        />
      </div>
      <div class="mb-4 w-full max-w-md flex">
        <label for="whatsappToken" class="block text-gray-700 text-sm font-bold mb-2"
          >Token de WhatsApp:</label
        >
        <input
          id="whatsappToken"
          type="text"
          v-model="whatsappIntegration.config.whatsappToken"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: xxxxxxxxxxxxxxxxxxxxxx"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Guardar Configuración
      </button>
    </form>
    <h2 class="text-2xl font-bold mt-6 mb-4 text-primary">Configuración de WhatsApp</h2>
    <span class="font-bold mt-6 mb-4 text-primary">
      Número de Teléfono:
      {{ searchWhatsappIntegration?.config.phoneNumber || 'No configurado' }}
    </span>
    <span class="font-bold mt-6 mb-4 text-primary">
      Token de WhatsApp:
      {{ searchWhatsappIntegration?.config.whatsappToken || 'No configurado' }}
    </span>
  </div>
</template>

<style scoped></style>

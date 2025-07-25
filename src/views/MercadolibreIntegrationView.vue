<script setup lang="ts">
import type { IntegrationParams } from '@/types/assistant'
import { onMounted, reactive, computed } from 'vue'
import { useAssistant } from '@/composables/useAssistant'

const { addIntegration, getAssistantProfile, assistantProfile } = useAssistant()

const meliIntegration = reactive<IntegrationParams>({
  name: 'meli',
  type: 'integration',
  config: {
    user_id: '',
    access_token: '',
  },
})

const validationErrors = reactive({
  user_id: '',
  access_token: '',
})

const saveConfig = async () => {
  validationErrors.user_id = !meliIntegration.config.user_id
    ? 'El ID de usuario es obligatorio.'
    : ''
  validationErrors.access_token = !meliIntegration.config.access_token
    ? 'El token de acceso es obligatorio.'
    : ''

  if (validationErrors.user_id || validationErrors.access_token) {
    return
  }
  try {
    await addIntegration(meliIntegration)
    console.log('Configuración guardada:', meliIntegration)
    await getAssistantProfile()
  } catch (error) {
    console.error('Error al guardar la configuración:', error)
  }
}

const searchMeliIntegration = computed(() => {
  return assistantProfile.value?.integrations?.find((integration) => integration.name === 'meli')
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
        <label for="user_id" class="block text-gray-700 text-sm font-bold mb-2"
          >ID de Usuario:</label
        >
        <input
          id="user_id"
          type="text"
          v-model="meliIntegration.config.user_id"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: 123456789"
          required
        />
      </div>
      <div class="mb-4 w-full max-w-md flex">
        <label for="access_token" class="block text-gray-700 text-sm font-bold mb-2"
          >Token de Acceso:</label
        >
        <input
          id="access_token"
          type="text"
          v-model="meliIntegration.config.access_token"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: APP_USR-xxxxxxxxxxxxxxxxxxxxx"
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
    <h2 class="text-2xl font-bold mt-6 mb-4 text-primary">Configuración de MercadoLibre</h2>
    <span class="font-bold mt-6 mb-4 text-primary">
      ID de Usuario:
      {{ searchMeliIntegration?.config.user_id || 'No configurado' }}
    </span>
    <span class="font-bold mt-6 mb-4 text-primary">
      Token de Acceso:
      {{ searchMeliIntegration?.config.access_token || 'No configurado' }}
    </span>
  </div>
</template>

<style scoped></style>

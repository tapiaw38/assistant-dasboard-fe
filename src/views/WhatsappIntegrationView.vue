<script setup lang="ts">
import type { IntegrationParams } from '@/types/assistant'
import { onMounted, computed } from 'vue'
import { useAssistant } from '@/composables/useAssistant'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

const whatsappSchema = z.object({
  access_token: z
    .string()
    .min(1, 'El token de acceso es obligatorio.')
    .min(10, 'El token de acceso debe tener al menos 10 caracteres.'),
  phone_number_id: z
    .string()
    .min(1, 'El ID del número de teléfono es obligatorio.')
    .regex(/^\d+$/, 'El ID del número de teléfono debe contener solo números.'),
  webhook_verify_token: z
    .string()
    .min(1, 'El token de verificación del webhook es obligatorio.')
    .min(3, 'El token de verificación debe tener al menos 3 caracteres.'),
  app_secret: z
    .string()
    .min(1, 'El secreto de la aplicación es obligatorio.')
    .min(10, 'El secreto de la aplicación debe tener al menos 10 caracteres.'),
})

const { addIntegration, getAssistantProfile, assistantProfile } = useAssistant()

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: toTypedSchema(whatsappSchema),
  initialValues: {
    access_token: '',
    phone_number_id: '',
    webhook_verify_token: '',
    app_secret: '',
  },
})

const { value: accessToken, errorMessage: accessTokenError } = useField<string>('access_token')

const { value: phoneNumberId, errorMessage: phoneNumberIdError } =
  useField<string>('phone_number_id')

const { value: webhookVerifyToken, errorMessage: webhookVerifyTokenError } =
  useField<string>('webhook_verify_token')

const { value: appSecret, errorMessage: appSecretError } = useField<string>('app_secret')

const saveConfig = handleSubmit(async (values) => {
  try {
    const integrationParams: IntegrationParams = {
      name: 'WhatsApp Business',
      type: 'whatsapp',
      config: {
        access_token: values.access_token,
        phone_number_id: values.phone_number_id,
        webhook_verify_token: values.webhook_verify_token,
        app_secret: values.app_secret,
      },
    }

    await addIntegration(integrationParams)
    await getAssistantProfile()

    resetForm()
  } catch (error) {
    console.error('Error al guardar la configuración:', error)
  }
})

const searchWhatsappIntegration = computed(() => {
  return assistantProfile.value?.integrations?.find(
    (integration) => integration.type === 'whatsapp',
  )
})

const loadExistingData = () => {
  if (searchWhatsappIntegration.value?.config) {
    const config = searchWhatsappIntegration.value.config
    accessToken.value = (config.access_token as string) || ''
    phoneNumberId.value = (config.phone_number_id as string) || ''
    webhookVerifyToken.value = (config.webhook_verify_token as string) || ''
    appSecret.value = (config.app_secret as string) || ''
  }
}

onMounted(async () => {
  await getAssistantProfile()
  loadExistingData()
})
</script>

<template>
  <div class="p-4 max-w-6xl mx-auto wsp-container">
    <Card class="mb-6">
      <template #title>
        <h2 class="text-2xl font-bold text-primary mb-4">Configuración de WhatsApp Business</h2>
      </template>
      <template #content>
        <form @submit.prevent="saveConfig" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <FloatLabel>
                <InputText
                  id="access_token"
                  v-model="accessToken"
                  class="w-full"
                  :class="{ 'p-invalid': accessTokenError }"
                />
                <label for="access_token">Token de Acceso</label>
              </FloatLabel>
              <Message v-if="accessTokenError" severity="error" :closable="false" class="mt-2">
                {{ accessTokenError }}
              </Message>
            </div>

            <div class="flex flex-col">
              <FloatLabel>
                <InputText
                  id="phone_number_id"
                  v-model="phoneNumberId"
                  class="w-full"
                  :class="{ 'p-invalid': phoneNumberIdError }"
                />
                <label for="phone_number_id">ID del Número de Teléfono</label>
              </FloatLabel>
              <Message v-if="phoneNumberIdError" severity="error" :closable="false" class="mt-2">
                {{ phoneNumberIdError }}
              </Message>
            </div>

            <div class="flex flex-col">
              <FloatLabel>
                <InputText
                  id="webhook_verify_token"
                  v-model="webhookVerifyToken"
                  class="w-full"
                  :class="{ 'p-invalid': webhookVerifyTokenError }"
                />
                <label for="webhook_verify_token">Token de Verificación del Webhook</label>
              </FloatLabel>
              <Message
                v-if="webhookVerifyTokenError"
                severity="error"
                :closable="false"
                class="mt-2"
              >
                {{ webhookVerifyTokenError }}
              </Message>
            </div>

            <div class="flex flex-col">
              <FloatLabel>
                <InputText
                  id="app_secret"
                  v-model="appSecret"
                  class="w-full"
                  :class="{ 'p-invalid': appSecretError }"
                />
                <label for="app_secret">Secreto de la Aplicación</label>
              </FloatLabel>
              <Message v-if="appSecretError" severity="error" :closable="false" class="mt-2">
                {{ appSecretError }}
              </Message>
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <Button
              type="submit"
              label="Guardar Configuración"
              icon="pi pi-save"
              class="px-6"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            />
          </div>
        </form>
      </template>
    </Card>

    <Card v-if="searchWhatsappIntegration">
      <template #title>
        <h3 class="text-xl font-bold text-primary">Configuración Actual</h3>
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <label class="font-semibold text-gray-700">Token de Acceso:</label>
            <div class="p-3 bg-gray-50 rounded-md border">
              <code class="text-sm text-gray-800 break-all">
                {{ (searchWhatsappIntegration.config.access_token as string) || 'No configurado' }}
              </code>
            </div>
          </div>

          <div class="flex flex-col space-y-2">
            <label class="font-semibold text-gray-700">ID del Número de Teléfono:</label>
            <div class="p-3 bg-gray-50 rounded-md border">
              <code class="text-sm text-gray-800 break-all">
                {{
                  (searchWhatsappIntegration.config.phone_number_id as string) || 'No configurado'
                }}
              </code>
            </div>
          </div>

          <div class="flex flex-col space-y-2">
            <label class="font-semibold text-gray-700">Token de Verificación del Webhook:</label>
            <div class="p-3 bg-gray-50 rounded-md border">
              <code class="text-sm text-gray-800 break-all">
                {{
                  (searchWhatsappIntegration.config.webhook_verify_token as string) ||
                  'No configurado'
                }}
              </code>
            </div>
          </div>

          <div class="flex flex-col space-y-2">
            <label class="font-semibold text-gray-700">Secreto de la Aplicación:</label>
            <div class="p-3 bg-gray-50 rounded-md border">
              <code class="text-sm text-gray-800 break-all">
                {{ (searchWhatsappIntegration.config.app_secret as string) || 'No configurado' }}
              </code>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <Card v-else>
      <template #content>
        <div class="text-center py-8">
          <i class="pi pi-info-circle text-4xl text-gray-400 mb-4"></i>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">
            No hay configuración de WhatsApp Business
          </h3>
          <p class="text-gray-500">
            Complete el formulario anterior para configurar la integración con WhatsApp Business.
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.wsp-container {
  max-width: 1280px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }
}
</style>

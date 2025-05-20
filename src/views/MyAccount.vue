<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Card from 'primevue/card'
import { useAssistant } from '@/composables/useAssistant'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import Button from 'primevue/button'
import DefaultModal from '@/components/core/shared/DefaultModal/DefaultModal.vue'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import { useToogle } from '@/composables/useToogle'
import type { ApiKeyParams } from '@/types/assistant.ts'

const { toogleValue: isVisibleAddApiKey } = useToogle(false)
const { toogleValue: isVisibleRemoveApiKey } = useToogle(false)

const {
  assistantProfile,
  getAssistantProfile,
  addApiKey,
  removeApiKey,

  isGetAssistantProfileSuccess,
  isGetAssistantProfileError,
  isGetAssistantProfilePending,
  getAssistantProfileError,

  isAddApiKeyPending,
  isAddApiKeySuccess,
  isAddApiKeyError,
  addApiKeyError,

  isRemoveApiKeyPending,
  isRemoveApiKeyError,
  isRemoveApiKeySuccess,
  removeApiKeyError,
} = useAssistant()

onMounted(async () => {
  await getAssistantProfile()
})

const addApiKeyParams = reactive<ApiKeyParams>({
  description: '',
})

const modalTitleAddApiKey = ref('Agregar Api Key')
const changeAddApiKeyVisible = (value: boolean) => {
  isVisibleAddApiKey.value = value
}

const addApiKeyHandler = async () => {
  try {
    await addApiKey(addApiKeyParams)
    if (isAddApiKeySuccess.value) {
      getAssistantProfile()
    }
    addApiKeyParams.description = ''
    isVisibleAddApiKey.value = false
  } catch (error) {
    console.error('Error al agregar el api key:', error)
  }
}

const removeApiKeyDeleteData = ref<string | null>(null)

const modalTitleRemoveApiKey = ref('Eliminar Api Key')
const changeRemoveApiKeyVisible = (value: boolean) => {
  isVisibleRemoveApiKey.value = value
}

const removeApiKeyHandler = async () => {
  if (!removeApiKeyDeleteData.value) {
    return
  }
  try {
    await removeApiKey(removeApiKeyDeleteData.value)
    if (isRemoveApiKeySuccess.value) {
      getAssistantProfile()
    }
    isVisibleRemoveApiKey.value = false
  } catch (error) {
    console.error('Error al eliminar el api key:', error)
  }
}

const copyApiKey = (apiKey: string) => {
  navigator.clipboard.writeText(apiKey)
}

const removeApiKeyOpenModal = (apiKeyID: string) => {
  console.log('apiKeyID', apiKeyID)
  removeApiKeyDeleteData.value = apiKeyID
  isVisibleRemoveApiKey.value = true
}
</script>

<template>
  <div class="account-me">
    <h1 class="text-2xl font-bold mb-4 mt-4 text-200 text-gray-500">Mi Cuenta</h1>
    <div class="grid container-account gap-2" v-if="isGetAssistantProfileSuccess">
      <!-- my subscriptions -->
      <div class="flex flex-column gap-2">
        <div class="flex flex-row gap-2 w-full">
          <Card class="flex flex-column gap-2">
            <template #title>
              <div class="flex justify-content-center flex-row mb-2">
                <span class="font-bold text-2xl text-gray-500">Suscripciones</span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-2 justify-content-center align-items-center">
                <span
                  class="text-xl font-bold text-dark-500 flex flex-row gap-2 align-items-center mb-4 justify-content-center"
                >
                  Plan: Free
                  <i class="pi pi-check-circle text-primary text-2xl"></i>
                </span>
                <div class="flex flex-row gap-2 mb-4">
                  <Button
                    label="Editar"
                    icon=""
                    class="p-button-outlined"
                    severity="success"
                    disabled
                    @click="console.log('Edit')"
                  />
                  <Button
                    label="Pausar"
                    icon=""
                    severity="danger"
                    class="p-button-outlined"
                    disabled
                    @click="console.log('Delete')"
                  />
                  <Button
                    label="Cancelar"
                    icon=""
                    class="p-button-danger"
                    disabled
                    @click="console.log('Delete')"
                  />
                </div>
              </div>
              <div class="flex flex-column gap-2 justify-content-center align-items-center">
                <div class="flex flex-row gap-2 mb-2 align-content-center align-items-center">
                  <span class="text-md font-light text-gray-500">
                    Limite de <b class="font-bold text-dark">100</b> solicitudes por mes
                  </span>
                </div>
                <div class="flex flex-row gap-2 align-content-center align-items-center">
                  <span class="text-md font-light text-gray-500">
                    Solicitudes restantes:
                    <b class="font-bold text-dark">{{ assistantProfile?.iteration_limit }}</b>
                  </span>
                  <Button
                    label=""
                    icon="pi pi-refresh"
                    class="p-button-success"
                    disabled
                    @click="console.log('Refresh')"
                  />
                </div>
              </div>
            </template>
          </Card>
          <Card class="flex flex-column gap-2">
            <template #title>
              <div class="flex justify-content-center flex-row mb-1">
                <span class="font-bold text-2xl text-gray-500">Detalles del Plan</span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-2 justify-content-center align-items-center">
                <div class="flex flex-row gap-2 mb-1">
                  <span
                    class="text-xl font-bold text-gray-500 flex flex-row gap-2 align-items-center justify-content-center"
                  >
                    Plan Free
                  </span>
                </div>
                <div class="flex flex-column gap-2 justify-content-center align-items-center">
                  <div class="flex flex-row gap-2 mb-2">
                    <span class="text-md font-light text-gray-500">
                      Limite de <b class="font-bold text-dark">100</b> solicitudes por mes
                    </span>
                  </div>
                  <div class="flex flex-row gap-2 align-content-center align-items-center">
                    <span class="text-md font-light text-gray-500">
                      Costo: <b class="font-bold text-dark">$0</b>
                    </span>
                  </div>
                  <div class="flex flex-row gap-2 align-content-center align-items-center"></div>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="flex flex-row w-full">
          <Card class="flex flex-column gap-2 w-full">
            <template #title>
              <div class="flex justify-content-center flex-row mb-2">
                <span class="font-bold text-2xl text-gray-500">Planes Disponibles</span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-2 justify-content-center align-items-center">
                <div class="flex flex-row gap-2 mb-2">
                  <Button
                    label="Conocer más"
                    icon=""
                    class="p-button-outlined w-full"
                    severity="success"
                    disabled
                    @click="console.log('Edit')"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <!-- Generate Api keys -->
      <div class="flex flex-column gap-2 align-items-start">
        <div v-if="assistantProfile || isGetAssistantProfileSuccess">
          <Card>
            <template #title>
              <div
                class="flex justify-content-between justify-content-center align-content-center flex-row"
              >
                <span class="font-bold text-1xl text-gray-500">Generar Api keys</span>
                <Button
                  label=""
                  icon="pi pi-key"
                  class="p-button-success"
                  @click="isVisibleAddApiKey = true"
                />
              </div>
            </template>
            <template #content>
              <div
                class="flex flex-row gap-2 align-content-center align-items-center"
                v-for="apiKey in assistantProfile?.api_keys"
                :key="apiKey.id"
              >
                <div class="flex flex-column gap-2" v-if="apiKey?.is_active">
                  <Tag :value="apiKey.description" severity="info" rounded class="w-full" />
                  <div class="flex flex-row gap-2">
                    <span class="text-sm font-ligth text-gray-500 api-value">{{
                      apiKey.value
                    }}</span>
                    <div class="flex flex-row gap-2 align-content-center align-items-center">
                      <Button
                        label=""
                        icon="pi pi-copy"
                        class="p-button-warning"
                        @click="copyApiKey(apiKey.value)"
                      />
                      <Button
                        label=""
                        icon="pi pi-trash"
                        class="p-button-danger"
                        @click="removeApiKeyOpenModal(apiKey.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 md:col-6" v-if="isAddApiKeyError">
                <p class="text-danger font-bold">
                  Error al agregar el api key: {{ addApiKeyError }}
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-2" v-else-if="isGetAssistantProfilePending">
      <LoadingSpinner />
    </div>
    <div class="flex flex-row gap-2 text-gray-500" v-else-if="!isGetAssistantProfileSuccess">
      <p class="text-danger font-bold">No se encontraron asistentes</p>
    </div>
    <div class="flex flex-row gap-2" v-if="isGetAssistantProfileError">
      <p class="text-danger font-bold">
        Error al obtener el perfil: {{ getAssistantProfileError }}
      </p>
    </div>
  </div>

  <!-- Add Api Key Modal -->
  <DefaultModal
    @update:visible="changeAddApiKeyVisible"
    :isVisible="isVisibleAddApiKey"
    :title="modalTitleAddApiKey"
  >
    <div class="flex flex-column items-center gap-2 mb-2">
      <label for="api_key_name" class="font-light w-24">Descripción</label>
      <InputText
        id="api_key_name"
        class="flex-auto"
        autocomplete="off"
        v-model="addApiKeyParams.description"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cerrar"
        severity="secondary"
        @click="isVisibleAddApiKey = false"
      ></Button>
      <Button
        type="button"
        label="Guardar"
        v-if="!isAddApiKeyPending"
        @click="addApiKeyHandler"
      ></Button>
      <LoadingSpinner v-else />
    </div>
  </DefaultModal>

  <!-- Remove Api Key Modal -->
  <DefaultModal
    @update:visible="changeRemoveApiKeyVisible"
    :isVisible="isVisibleRemoveApiKey"
    :title="modalTitleRemoveApiKey"
  >
    <div class="flex flex-column items-center gap-2 mb-2">
      <label for="api_key_name" class="font-light w-24">
        ¿Está seguro de que desea eliminar el api key?
      </label>
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cerrar"
        severity="secondary"
        @click="isVisibleRemoveApiKey = false"
      ></Button>
      <Button
        type="button"
        label="Eliminar"
        severity="danger"
        v-if="!isRemoveApiKeyPending"
        @click="removeApiKeyHandler"
      ></Button>
      <LoadingSpinner v-else />
    </div>
    <div class="col-12 md:col-6 mt-2" v-if="isRemoveApiKeyError">
      <p class="text-danger font-bold">Error al eliminar el api key: {{ removeApiKeyError }}</p>
    </div>

    <!-- Error Message -->
    <p v-if="isRemoveApiKeyError">Error: {{ removeApiKeyError?.message }}</p>
  </DefaultModal>
</template>

<style scoped>
.account-me {
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  min-height: 100vh;

  .container-account {
    width: 100%;
    grid-template-columns: 1fr 1fr;
    display: grid;
    justify-items: center;
    align-items: start;
  }

  @media (max-width: 768px) {
    .container-account {
      grid-template-columns: 1fr;
    }
  }
}

.api-value {
  word-break: break-all;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-width: 100%;
}

.container-api-key {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>

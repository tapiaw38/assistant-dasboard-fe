<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import DefaultModal from '@/components/core/shared/DefaultModal/DefaultModal.vue'
import type {
  AssistantProfileParams,
  AssistantProfileUpdateParams,
  ApiKeyParams,
} from '@/types/assistant.ts'
import { useAuth } from '@/composables/useAuth'
import { useToogle } from '@/composables/useToogle'
import { useAssistant } from '@/composables/useAssistant'

const { meUser, isMeUserPending, isMeUserSuccess, isMeUserError, meUserError, user } = useAuth()
const { toogleValue: isVisible } = useToogle(false)
const { toogleValue: isVisibleUpdate } = useToogle(false)
const { toogleValue: isVisibleAddApiKey } = useToogle(false)
const { toogleValue: isVisibleRemoveApiKey } = useToogle(false)
const {
  addAssistantProfile,
  getAssistantProfile,
  updateAssistantProfile,
  addApiKey,
  removeApiKey,

  isAddAssistantProfilePending,
  isAddAssistantProfileSuccess,
  isAddAssistantProfileError,
  addAssistantProfileError,

  isGetAssistantProfilePending,
  isGetAssistantProfileSuccess,
  isGetAssistantProfileError,
  getAssistantProfileError,

  isUpdateAssistantProfilePending,
  isUpdateAssistantProfileSuccess,
  isUpdateAssistantProfileError,
  updateAssistantProfileError,

  isAddApiKeyPending,
  isAddApiKeySuccess,
  isAddApiKeyError,
  addApiKeyError,

  isRemoveApiKeyPending,
  isRemoveApiKeyError,
  isRemoveApiKeySuccess,
  removeApiKeyError,

  assistantProfile,
} = useAssistant()

onMounted(async () => {
  await meUser()
  await getAssistantProfile()
})

const modalTitle = ref('Agregar Asistente')
const changeVisible = (value: boolean) => {
  isVisible.value = value
}

const assistantProfileParams = reactive<AssistantProfileParams>({
  assistant_name: '',
  business_name: '',
  functions: '',
  business_context: '',
})

const addAssistant = async () => {
  addAssistantProfile(assistantProfileParams)

  if (isAddAssistantProfileSuccess.value) {
    getAssistantProfile()
  }

  isVisible.value = false
}

const modalTitleUpdate = ref('Editar Asistente')
const updateAssistantProfileParams = reactive<AssistantProfileUpdateParams>({
  assistant_name: '',
  business_name: '',
  functions: '',
  business_context: '',
})

const changeUpdateVisible = (value: boolean) => {
  isVisibleUpdate.value = value
}

const updateAssistan = async () => {
  updateAssistantProfile(updateAssistantProfileParams)

  if (isUpdateAssistantProfileSuccess.value) {
    getAssistantProfile()
  }

  isVisibleUpdate.value = false
}

watch(
  isVisibleUpdate,
  () => {
    if (assistantProfile && isVisibleUpdate.value) {
      updateAssistantProfileParams.assistant_name = assistantProfile?.value?.assistant_name || ''
      updateAssistantProfileParams.business_name = assistantProfile?.value?.business_name || ''
      updateAssistantProfileParams.functions = assistantProfile?.value?.functions || ''
      updateAssistantProfileParams.business_context =
        assistantProfile?.value?.business_context || ''
    }
  },
  { immediate: true },
)

const modalTitleAddApiKey = ref('Agregar Api Key')
const changeAddApiKeyVisible = (value: boolean) => {
  isVisibleAddApiKey.value = value
}

const addApiKeyParams = reactive<ApiKeyParams>({
  description: '',
})

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

const copyApiKey = (apiKey: string) => {
  navigator.clipboard.writeText(apiKey)
}

const removeApiKeyOpenModal = (apiKeyID: string) => {
  console.log('apiKeyID', apiKeyID)
  removeApiKeyDeleteData.value = apiKeyID
  isVisibleRemoveApiKey.value = true
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

const removeApiKeyDeleteData = ref<string | null>(null)

const modalTitleRemoveApiKey = ref('Eliminar Api Key')
const changeRemoveApiKeyVisible = (value: boolean) => {
  isVisibleRemoveApiKey.value = value
}
</script>

<template>
  <div class="dashboard flex flex-column w-full" v-if="!isMeUserPending && isMeUserSuccess">
    <h1 class="text-2xl font-bold mb-2 pl-2 mt-4 text-200 text-gray-500">Perfil</h1>
    <div class="flex md:flex-row flex-column w-100">
      <div class="flex flex-column col-12 md:col-6 gap-2">
        <Panel :header="'Hola ' + user?.first_name" class="text-2xl">
          <p class="font-semibold mb-4">Agrega un asistente</p>
          <Button label="" icon="pi pi-plus" class="p-button-success" @click="isVisible = true" />
        </Panel>
        <div class="col-12 md:col-6" v-if="isAddAssistantProfileError">
          <p class="text-red-500 font-bold">
            Error al agregar el asistente: Ya existe un perfil {{ addAssistantProfileError }}
          </p>
        </div>

        <div class="col-12 md:col-6" v-if="isUpdateAssistantProfileError">
          <p class="text-red-500 font-bold">
            Error al actualizar el asistente: {{ updateAssistantProfileError }}
          </p>
        </div>
        <!-- Assistant Profile Data -->
        <div class="flex" v-if="assistantProfile || isGetAssistantProfileSuccess">
          <Card>
            <template #title>
              <div class="flex justify-content-between flex-row">
                <span class="font-bold text-2xl text-primary text-center gap-2"
                  >{{ assistantProfile?.assistant_name }}
                  <i class="pi pi-sparkles text-primary text-2xl"></i>
                </span>
                <Button
                  label=""
                  icon="pi pi-pencil"
                  class="p-button-success"
                  @click="isVisibleUpdate = true"
                />
              </div>
            </template>
            <template #content>
              <span class="text-xl font-bold text-dark-500"> Nombre de la Empresa: </span>
              <p>{{ assistantProfile?.business_name }}</p>
              <span class="text-xl font-bold text-dark-500"> Contexto de Negocio: </span>
              <p>{{ assistantProfile?.business_context }}</p>
            </template>
          </Card>
        </div>
      </div>
      <div class="flex flex-column col-12 md:col-6 gap-2">
        <!-- Api Key Generate -->
        <template v-if="assistantProfile || isGetAssistantProfileSuccess">
          <Card>
            <template #title>
              <div
                class="flex justify-content-between justify-content-center align-content-center flex-row"
              >
                <span class="font-bold text-2xl text-gray-500">Api keys</span>
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
                    <span class="text-sm font-bold text-gray-500 api-value">{{
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
        </template>
        <div class="flex flex-col gap-2">
          <div class="col-12 md:col-6" v-if="!assistantProfile && !isGetAssistantProfilePending">
            <p class="text-gray-500 font-bold">No se encontraron asistentes</p>
          </div>
          <div class="col-12 md:col-6" v-if="!assistantProfile && isGetAssistantProfilePending">
            <LoadingSpinner />
          </div>
          <div class="col-12 md:col-6" v-if="isGetAssistantProfileError">
            <p class="text-danger font-bold">Error: {{ getAssistantProfileError }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading Spinner -->
  <div class="loading-container" v-else-if="isMeUserPending">
    <LoadingSpinner />
  </div>

  <!-- Default Modal Add Assistant -->
  <DefaultModal @update:visible="changeVisible" :isVisible="isVisible" :title="modalTitle">
    <div class="flex flex-column items-center gap-2 mb-2">
      <label for="assistant_name" class="font-light w-24">Nombre del Asistente</label>
      <InputText
        id="assistant_name"
        class="flex-auto"
        autocomplete="off"
        v-model="assistantProfileParams.assistant_name"
      />
    </div>
    <div class="flex flex-column items-center gap-2 mb-2">
      <label for="business_name" class="font-light w-24">Nombre de la Empresa</label>
      <InputText
        id="business_name"
        class="flex-auto"
        autocomplete="off"
        v-model="assistantProfileParams.business_name"
      />
    </div>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="business_context" class="font-light w-24">Contexto de Negocio</label>
      <Textarea v-model="assistantProfileParams.business_context" rows="5" cols="30" />
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Cerrar" severity="secondary" @click="isVisible = false"></Button>
      <Button
        type="button"
        label="Guardar"
        v-if="!isAddAssistantProfilePending"
        @click="addAssistant"
      ></Button>
      <LoadingSpinner v-else />
    </div>
  </DefaultModal>

  <!-- Update Assistant Profile Modal -->
  <DefaultModal
    @update:visible="changeUpdateVisible"
    :isVisible="isVisibleUpdate"
    :title="modalTitleUpdate"
  >
    <div class="flex flex-column items-center gap-2 mb-2">
      <label for="assistant_name" class="font-light w-24">Nombre del Asistente</label>
      <InputText
        id="assistant_name"
        class="flex-auto"
        autocomplete="off"
        v-model="updateAssistantProfileParams.assistant_name"
      />
    </div>
    <div class="flex flex-column items-center gap-2 mb-2">
      <label for="business_name" class="font-light w-24">Nombre de la Empresa</label>
      <InputText
        id="business_name"
        class="flex-auto"
        autocomplete="off"
        v-model="updateAssistantProfileParams.business_name"
      />
    </div>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="business_context" class="font-light w-24">Contexto de Negocio</label>
      <Textarea v-model="updateAssistantProfileParams.business_context" rows="5" cols="30" />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cerrar"
        severity="secondary"
        @click="isVisibleUpdate = false"
      ></Button>
      <Button
        type="button"
        label="Guardar"
        v-if="!isUpdateAssistantProfilePending"
        @click="updateAssistan"
      ></Button>
      <LoadingSpinner v-else />
    </div>
  </DefaultModal>

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
  </DefaultModal>

  <!-- Error Message -->
  <p v-if="isMeUserError">Error: {{ meUserError?.message }}</p>

  <!-- Error Message -->
  <p v-if="isRemoveApiKeyError">Error: {{ removeApiKeyError?.message }}</p>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
  min-height: 100vh;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.col-12 {
  flex: 1 1 100%;
}

.md\:col-6 {
  flex: 1 1 48%;
}

.loading-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.api-value {
  word-break: break-all;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-width: 100%;
}
</style>

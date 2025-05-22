<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Badge from 'primevue/badge'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import DefaultModal from '@/components/core/shared/DefaultModal/DefaultModal.vue'
import ScrollPanel from 'primevue/scrollpanel'
import type { AssistantProfileParams, AssistantProfileUpdateParams } from '@/types/assistant.ts'
import { useAuth } from '@/composables/useAuth'
import { useToogle } from '@/composables/useToogle'
import { useAssistant } from '@/composables/useAssistant'
import { useConversation } from '@/composables/useConversation'

const { meUser, isMeUserPending, isMeUserSuccess, isMeUserError, meUserError } = useAuth()
const { toogleValue: isVisible } = useToogle(false)
const { toogleValue: isVisibleUpdate } = useToogle(false)

const {
  conversations,
  getUserConversation,
  isGetUserConversationError,
  isGetUserConversationSuccess,
  isGetUserConversationPending,
  getUserConversationError,
} = useConversation()
const {
  addAssistantProfile,
  getAssistantProfile,
  updateAssistantProfile,

  isAddAssistantProfilePending,
  isAddAssistantProfileSuccess,
  isAddAssistantProfileError,
  addAssistantProfileError,

  isGetAssistantProfileSuccess,
  isGetAssistantProfileError,
  getAssistantProfileError,
  isGetAssistantProfilePending,

  isUpdateAssistantProfilePending,
  isUpdateAssistantProfileSuccess,
  isUpdateAssistantProfileError,
  updateAssistantProfileError,

  assistantProfile,
} = useAssistant()

onMounted(async () => {
  await meUser()
  await getAssistantProfile()
  await getUserConversation()
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

const totalMessagesInConversation = computed(() => {
  return conversations.value?.reduce((acc, curr) => {
    return acc + (curr?.messages?.length || 0)
  }, 0)
})

const integrations = [
  {
    name: 'Web',
    description: 'Integración con sitios o aplicaciones web, mediante paquete NPM',
    icon: 'pi pi-globe',
    color: 'text-primary',
    to: 'web-integration',
    enabled: true,
  },
  {
    name: 'Storage',
    description: 'Integración con almacenamiento de archivos en la nube',
    icon: 'pi pi-file',
    color: 'text-primary',
    to: 'store-integration',
    enabled: true,
  },
  {
    name: 'Whatsapp',
    description: 'Integración Whatsapp',
    icon: 'pi pi-whatsapp',
    color: 'text-green-500',
    to: 'dashboard',
    enabled: false,
  },
  {
    name: 'Google Calendar',
    description: 'Integración Google Calendar',
    icon: 'pi pi-calendar',
    color: 'text-yellow-500',
    to: 'dashboard',
    enabled: false,
  },
]
</script>

<template>
  <div class="dashboard flex flex-column w-full" v-if="!isMeUserPending && isMeUserSuccess">
    <h1 class="text-2xl font-bold mb-2 pl-2 mt-4 text-200 text-gray-500">Mi Perfil</h1>
    <div class="dashboard-container w-full">
      <div class="flex flex-column w-full">
        <div class="flex flex-column col-12">
          <div
            class="col-12 md:col-6 flex flex-row my-2 gap-2 justify-content-center align-items-center"
          >
            <p class="text-green-500 font-bold mb-2">Comienza agregando un asistente</p>
            <Button label="" icon="pi pi-plus" class="p-button-success" @click="isVisible = true" />
          </div>
          <div class="col-12 md:col-6" v-if="isAddAssistantProfileError">
            <p class="text-red-500 font-bold">
              Error al agregar el asistente: Ya existe un perfil
              {{ addAssistantProfileError }}
            </p>
          </div>
          <div class="col-12 md:col-6" v-if="isUpdateAssistantProfileError">
            <p class="text-red-500 font-bold">
              Error al actualizar el asistente: {{ updateAssistantProfileError }}
            </p>
          </div>
        </div>
        <div class="container-profile-data">
          <!-- Assistant Profile Data -->
          <div
            class="flex flex-column col-12 md:col-6 w-full"
            v-if="assistantProfile || isGetAssistantProfileSuccess"
          >
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
                <ScrollPanel style="height: 150px">
                  <p>{{ assistantProfile?.business_context }}</p>
                </ScrollPanel>
              </template>
            </Card>
          </div>
          <!-- Assistant Conversations -->
          <div class="flex flex-column col-12 md:col-6 w-full">
            <Card v-if="isGetUserConversationSuccess">
              <template #title>
                <div class="flex justify-content-center flex-row">
                  <span class="font-bold text-2xl text-primary text-center gap-2"
                    >Conversaciones
                    <i class="pi pi-comments text-primary text-2xl"></i>
                  </span>
                </div>
              </template>
              <template #content>
                <div
                  class="flex flex-row gap-2 align-content-center align-items-center justify-content-center"
                  v-if="!isGetUserConversationPending && isGetUserConversationSuccess"
                >
                  <div class="flex flex-column gap-2">
                    <div
                      class="gap-2 mt-4 mb-1 flex flex-row justify-content-center align-items-center"
                    >
                      <span class="text-md font-bold text-center text-gray-500 text-start">
                        Cantidad:
                      </span>
                      <Badge :value="conversations?.length" severity="info"></Badge>
                    </div>
                    <div class="gap-2 mb-1 flex flex-row justify-content-center align-items-center">
                      <span class="text-md font-bold text-center text-gray-500">Mensajes </span>
                      <Badge :value="totalMessagesInConversation" severity="info"></Badge>
                    </div>
                    <div class="flex flex-row mb-4 gap-2 align-content-center align-items-center">
                      <span class="text-md font-bold text-gray-500">
                        Iteraciones restantes:
                        <Badge
                          :value="assistantProfile?.iteration_limit || 0"
                          severity="info"
                        ></Badge>
                      </span>
                    </div>
                    <RouterLink class="p-button w-full" :to="{ name: 'conversation' }">
                      Ver más
                    </RouterLink>
                  </div>
                </div>
                <div class="col-12 md:col-6" v-if="isGetUserConversationError">
                  <p class="text-danger font-bold">Error: {{ getUserConversationError }}</p>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <!-- Error Message -->
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

        <p v-if="isMeUserError">Error: {{ meUserError?.message }}</p>
      </div>
      <!-- Integrations -->
      <div class="grid integrations-container gap-4">
        <div v-for="integration in integrations" :key="integration.name">
          <Card
            class="flex flex-column gap-2"
            :style="{
              opacity: integration.enabled ? 1 : 0.5,
              pointerEvents: integration.enabled ? 'auto' : 'none',
              filter: integration.enabled ? 'none' : 'grayscale(1)',
            }"
          >
            <template #title>
              <div class="flex justify-content-center flex-row mb-1">
                <span
                  class="font-bold text-2xl text-primary text-center gap-2"
                  :class="integration.enabled ? integration.color : 'text-gray-400'"
                >
                  {{ integration.name }}
                  <i
                    :class="[
                      integration.icon,
                      integration.enabled ? integration.color : 'text-gray-400',
                    ]"
                  ></i>
                </span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-2 justify-content-center align-items-center">
                <p :class="integration.enabled ? '' : 'text-gray-400'" class="text-center my-2">
                  {{ integration.description }}
                </p>
                <RouterLink
                  class="p-button w-full"
                  :to="{
                    name: integration.to,
                  }"
                  :class="integration.enabled ? '' : 'p-disabled'"
                  :tabindex="integration.enabled ? 0 : -1"
                  >Ver más</RouterLink
                >
              </div>
            </template>
          </Card>
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
</template>

<style scoped>
.dashboard {
  margin-top: 2rem;
  max-width: 1400px;
  padding: 2rem;
  min-height: 100vh;

  .dashboard-container {
    grid-template-columns: 1fr 1fr;
    display: grid;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.container-profile-data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.integrations-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.loading-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import DefaultModal from '@/components/core/shared/DefaultModal/DefaultModal.vue'
import type { AssistantProfileParams } from '@/types/assistant/assistant'
import { useAuth } from '@/composables/useAuth'
import { useToogle } from '@/composables/useToogle'
import { useAssistant } from '@/composables/useAssistant'

const { meUser, isMeUserPending, isMeUserSuccess, isMeUserError, meUserError, user } = useAuth()
const { toogleValue: isVisible } = useToogle(false)
const {
  addAssistantProfile,
  getAssistantProfile,
  isAddAssistantProfilePending,
  /*isAddAssistantProfileSuccess,*/
  isAddAssistantProfileError,
  addAssistantProfileError,
  isGetAssistantProfilePending,
  isGetAssistantProfileSuccess,
  isGetAssistantProfileError,
  getAssistantProfileError,
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
  getAssistantProfile()
  isVisible.value = false
}
</script>

<template>
  <div class="dashboard md:col-6" v-if="!isMeUserPending && isMeUserSuccess">
    <h1 class="text-3xl font-bold mb-4 mt-4 text-200 text-primary">Perfile del Negocio</h1>
    <Panel :header="'Hola ' + user?.first_name">
      <p class="text-md font-bold mb-4">
        Aqui podras configurar tu Asistente ademas del perfil de tu negocio
      </p>

      <div class="col-12 md:col-6" v-if="isAddAssistantProfileError">
        <p class="text-danger font-bold">
          Error al agregar el asistente: Ya existe un perfil {{ addAssistantProfileError }}
        </p>
      </div>

      <Button
        label="Agregar"
        icon="pi pi-plus"
        class="p-button-success"
        @click="isVisible = true"
      />
    </Panel>
    <div class="grid mt-3 gap-2">
      <div class="col-12 md:col-6" v-if="assistantProfile || isGetAssistantProfileSuccess">
        <Card>
          <template #title>
            <div class="flex justify-content-between flex-row">
              <span class="font-bold text-2xl text-primary">{{
                assistantProfile?.assistant_name
              }}</span>
              <Button label="Editar" icon="pi pi-pencil" class="p-button-success" />
            </div>
          </template>
          <template #content>
            <span class="text-xl font-bold text-primary"> Nombre de la Empresa: </span>
            <p>{{ assistantProfile?.business_name }}</p>
            <span class="text-xl font-bold text-primary"> Contexto de Negocio: </span>
            <p>{{ assistantProfile?.business_context }}</p>
          </template>
        </Card>
      </div>
      <div class="flex flex-col gap-2">
        <div class="col-12 md:col-6" v-if="!assistantProfile && !isGetAssistantProfilePending">
          <p class="text-primary font-bold">No se encontraron asistentes</p>
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

  <!-- Error Message -->
  <p v-if="isMeUserError">Error: {{ meUserError?.message }}</p>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
  height: 100vh;
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
</style>

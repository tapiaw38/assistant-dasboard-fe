<script setup lang="ts">
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ScrollPanel from 'primevue/scrollpanel'
import { useConversation } from '@/composables/useConversation'
import { useDateFormat } from '@/composables/useDateFormat'
import { onMounted } from 'vue'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import type { AssistantConversation } from '@/types/conversation'

const {
  conversations,
  getUserConversation,
  isGetUserConversationSuccess,
  isGetUserConversationError,
  isGetUserConversationPending,
  getUserConversationError,
} = useConversation()

const { dateFormat } = useDateFormat()

onMounted(async () => {
  await getUserConversation()
})

const reloadMessages = ref<HTMLElement | null>(null)

const reloadMessagesHandler = async () => {
  reloadMessages.value?.classList.add('spinner-effect')
  try {
    await getUserConversation()
    setTimeout(() => {
      reloadMessages.value?.classList.remove('spinner-effect')
    }, 2000)
  } catch (error) {
    console.error('Error al obtener conversaciones:', error)
  }
}

const conversationSelected = ref<AssistantConversation | undefined>()

const conversationSelectedHandler = computed(() => {
  return (conversationID: string) => {
    conversationSelected.value = conversations?.value?.find(
      (conversation) => conversation.id === conversationID,
    )
  }
})
</script>

<template>
  <div class="conversation-view">
    <div class="grid conversation-container">
      <div class="flex flex-column gap-2">
        <div class="flex flex-row align-items-center">
          <div class="flex flex-row gap-2 justify-content-center align-items-baseline">
            <span class="text-2xl font-bold mb-4 text-primary">Conversaciones</span>
            <i class="pi pi-comments text-primary text-2xl"></i>
            <i
              ref="reloadMessages"
              class="pi pi-refresh text-primary text-2xl cursor-pointer"
              @click="reloadMessagesHandler"
            ></i>
          </div>
        </div>
        <DataTable
          :value="conversations"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10]"
          v-if="isGetUserConversationSuccess"
        >
          <Column field="title" header="Titulo"></Column>
          <Column field="created_at" header="Creada">
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.created_at) }}
            </template>
          </Column>
          <Column field="messages" header="Mensajes">
            <template #body="slotProps">
              {{ slotProps.data?.messages?.length || 0 }}
            </template>
          </Column>
          <Column field="extra" header="Acciones">
            <template #body="slotProps">
              <Button
                label="Ver"
                class="p-button-success"
                @click="conversationSelectedHandler(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
        <div v-else-if="isGetUserConversationPending">
          <LoadingSpinner />
        </div>
        <div v-else-if="isGetUserConversationError">
          <span class="text-red-500"
            >Error al obtener conversaciones: {{ getUserConversationError }}</span
          >
        </div>
      </div>
      <div class="flex flex-column gap-2">
        <div class="flex flex-column gap-2" v-if="!conversationSelected">
          <p class="text-gray-500 font-semibold">
            Aquí podrás ver todos los mensajes que se han enviado y recibido en las conversaciones
            con los clientes.
          </p>
        </div>
        <div class="flex flex-column justify-content-center align-items-start gap-2" v-else>
          <h2 class="text-2xl text-primary font-bold">Historial de conversaciones</h2>
          <ScrollPanel style="height: 500px">
            <div class="flex flex-row gap-2">
              <span class="text-gray-500 font-semibold">Titulo:</span>
              <p class="text-gray-500 font-semibold">{{ conversationSelected?.title }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <span class="text-gray-500 font-semibold">Creado:</span>
              <p class="text-gray-500 font-semibold">
                {{ dateFormat(conversationSelected.created_at) }}
              </p>
            </div>
            <!-- Messages -->
            <div class="flex flex-column gap-2 justify-content-center align-items-start">
              <h2 class="text-2xl font-bold text-primary">Mensajes</h2>
              <div v-for="message in conversationSelected?.messages" :key="message.created_at">
                <div class="flex flex-row gap-2">
                  <span class="text-gray-500 font-semibold">Remitente:</span>
                  <p class="text-gray-500 font-semibold">{{ message.sender }}</p>
                </div>
                <div class="flex flex-row gap-2">
                  <span class="text-gray-500 font-semibold">Creado:</span>
                  <p class="text-gray-500 font-semibold">{{ dateFormat(message.created_at) }}</p>
                </div>
                <div class="flex flex-column gap-2">
                  <span class="text-gray-500 font-semibold">Contenido:</span>
                  <ScrollPanel style="width: 100%; height: 100px">
                    <p class="text-gray-500 font-light">{{ message.content }}</p>
                  </ScrollPanel>
                </div>
              </div>
            </div>
          </ScrollPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conversation-view {
  margin-top: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;

  .conversation-container {
    grid-template-columns: 1fr 1fr;
    display: grid;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.spinner-effect {
  animation: spinner-border 2s linear forwards;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>

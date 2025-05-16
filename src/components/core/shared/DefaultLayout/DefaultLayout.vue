<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { createAssistant } from 'seely-ai-assistant'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let assistant: any = null

onMounted(() => {
  const initializeAssistant = () => {
    assistant = createAssistant({
      apiKey: import.meta.env.VITE_SEELY_API_KEY,
      apiBaseUrl: import.meta.env.VITE_SEELY_API_BASE_URL,
      title: 'Seely',
      placeholder: 'Escribe tu mensaje aquí...',
      position: 'bottom-right',
      initialMessage: 'Hola, ¿en qué puedo ayudarte?',
      buttonOptions: {
        backgroundColor: '#9333ea',
        color: '#ffffff',
        icon: '<i class="pi pi-comments"></i>',
        size: 'medium',
      },
      theme: {
        primaryColor: '#9333ea',
        textColor: '#424242',
        backgroundColor: '#ffffff',
        userMessageBgColor: '#9333ea',
        userMessageTextColor: '#ffffff',
        assistantMessageBgColor: '#f3e5f5',
        assistantMessageTextColor: '#4a148c',
        inputBorderColor: '#9333ea',
        inputBgColor: '#f5f0ff',
        inputTextColor: '#4a148c',
      },
    })
  }

  initializeAssistant()
})

onBeforeUnmount(() => {
  if (assistant) {
    assistant.unmount()
  }
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>

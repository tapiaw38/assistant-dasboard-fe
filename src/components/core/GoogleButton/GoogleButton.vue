<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'

const emit = defineEmits<{
  (e: 'code', authCode: string): void
}>()

const googleClient = ref<{
  requestCode: () => void
} | null>(null)

onMounted(() => {
  const google = window.google

  if (google?.accounts?.oauth2) {
    googleClient.value = google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      ux_mode: 'popup',
      callback: (response) => {
        emit('code', response.code)
      },
    })
  }
})

const loginWithGoogle = () => {
  googleClient.value?.requestCode()
}
</script>

<template>
  <Button
    label="Iniciar con Google"
    icon="pi pi-google"
    severity="info"
    class="w-full max-w-[17.35rem] mx-auto"
    @click="loginWithGoogle"
  />
</template>

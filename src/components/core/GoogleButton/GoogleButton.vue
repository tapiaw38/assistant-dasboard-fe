<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
//import { gsap } from 'gsap'

const emit = defineEmits<{
  (e: 'code', authCode: string): void
}>()

const googleClient = ref<{
  requestCode: () => void
} | null>(null)

const buttonRef = ref<HTMLButtonElement | null>(null)
const showText = ref(true)
const buttonText = ref('Iniciar con Google')
const displayedText = ref(buttonText.value)

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

// const handleMouseEnter = () => {
//   gsap.to(buttonRef.value, {
//     duration: 0.2,
//     width: '17.35rem',
//     padding: '0.75rem',
//     onComplete: () => {
//       showText.value = true
//       displayedText.value = ''
//       let i = 0
//       const intervalId = setInterval(() => {
//         displayedText.value += buttonText.value[i]
//         i++
//         if (i >= buttonText.value.length) {
//           clearInterval(intervalId)
//         }
//       }, 10)
//     },
//   })
// }

// const handleMouseLeave = () => {
//   gsap.to(buttonRef.value, {
//     duration: 0.2,
//     width: '3rem',
//     padding: '0.75rem',
//     onComplete: () => {
//       showText.value = false
//       displayedText.value = ''
//     },
//   })
// }
</script>

<template>
  <Button
    ref="buttonRef"
    icon="pi pi-google"
    class="w-full max-w-[17.35rem] mx-auto google-button px-2 py-2"
    @click="loginWithGoogle"
    :label="showText ? displayedText : ''"
  />
</template>

<style scoped>
.google-button {
  background-color: #9333ea;
  color: #ffffff;
  border: none;
  width: 3rem;
  overflow: hidden;
  transition: width 0.2s ease-in-out;
}

.google-button:hover {
  background-color: #7e22ce !important;
  border: none !important;
}
</style>

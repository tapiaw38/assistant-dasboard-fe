<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { LoginParams } from '@/types/auth/auth'
import { useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'

const { loginUser, loginError, isLoginError, isLoginPending } = useAuth()

const router = useRouter()

const userCredentials = ref<LoginParams>({
  email: '',
  password: '',
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  loginUser(userCredentials.value)

  router.push('/dashboard')
}
</script>

<template>
  <div class="flex flex-column align-items-start justify-content-center gap-2">
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="username">Email</label>
      <InputText id="email" type="text" v-model="userCredentials.email" />
    </div>
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="password">Password</label>
      <InputText id="password" type="password" v-model="userCredentials.password" />
    </div>
  </div>
  <div class="flex mt-4">
    <Button
      label="Iniciar Sesión"
      icon=""
      class="w-full mx-auto"
      @click="handleSubmit"
      :disabled="isLoginPending"
    />
  </div>

  <p class="text-danger" v-if="isLoginError">Error: {{ loginError?.message }}</p>
</template>

<style scoped></style>

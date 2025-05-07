<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { LoginParams } from '@/types/auth/auth'

import { useAuth } from '@/composables/useAuth'

const { loginUser, loginError, isLoginError, isLoginPending } = useAuth()

const emit = defineEmits<{
  (e: 'redirect', to: string): void
}>()

const userCredentials = ref<LoginParams>({
  email: '',
  password: '',
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  await loginUser(userCredentials.value)
  emit('redirect', 'dashboard')
}
</script>

<template>
  <form @submit="handleSubmit">
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
        type="submit"
        :disabled="isLoginPending"
      />
    </div>
  </form>

  <p class="text-danger" v-if="isLoginError">Error: {{ loginError?.message }}</p>
</template>

<style scoped></style>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { LoginParams } from '@/types/auth/auth'
import { useAuth } from '@/composables/useAuth'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const { loginUser, loginError, isLoginError, isLoginPending } = useAuth()

const emit = defineEmits<{
  (e: 'redirect', to: string): void
}>()

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
})

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  const loginParams: LoginParams = {
    email: values.email,
    password: values.password,
  }

  try {
    await loginUser(loginParams)
    emit('redirect', 'dashboard')
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-column align-items-start justify-content-center gap-2">
      <div class="flex flex-column gap-2 justify-content-center">
        <label for="username">Email</label>
        <InputText id="email" type="text" v-model="email" />
        <small class="text-red-500">{{ errors.email }}</small>
      </div>
      <div class="flex flex-column gap-2 justify-content-center">
        <label for="password">Password</label>
        <InputText id="password" type="password" v-model="password" />
        <small class="text-red-500">{{ errors.password }}</small>
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

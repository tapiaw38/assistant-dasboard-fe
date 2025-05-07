<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { RegisterParams } from '@/types/auth/auth'
import { useAuth } from '@/composables/useAuth'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.vue'

const { registerUser, registerError, isRegisterError, isRegisterPending } = useAuth()

const emit = defineEmits<{
  (e: 'redirect', to: string): void
}>()

const schema = z
  .object({
    first_name: z.string().min(1, 'Nombre requerido'),
    last_name: z.string().min(1, 'Apellido requerido'),
    email: z.string().email('Email inválido'),
    username: z.string().min(3, 'Usuario muy corto'),
    password: z.string().min(6, 'Contraseña muy corta'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  })

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: first_name } = useField<string>('first_name')
const { value: last_name } = useField<string>('last_name')
const { value: email } = useField<string>('email')
const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  const registerParams: RegisterParams = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    username: values.username,
    password: values.password,
  }

  try {
    await registerUser(registerParams)
    emit('redirect', 'auth')
  } catch (error) {
    console.error('Error en registro:', error)
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-column gap-2">
      <div class="flex flex-column gap-1">
        <label for="first_name">Nombre</label>
        <InputText id="first_name" type="text" v-model="first_name" class="w-full" />
        <small class="text-red-500">{{ errors.first_name }}</small>
      </div>

      <div class="flex flex-column gap-1">
        <label for="last_name">Apellido</label>
        <InputText id="last_name" type="text" v-model="last_name" />
        <small class="text-red-500">{{ errors.last_name }}</small>
      </div>

      <div class="flex flex-column gap-1">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="email" />
        <small class="text-red-500">{{ errors.email }}</small>
      </div>

      <div class="flex flex-column gap-1">
        <label for="username">Nombre de Usuario</label>
        <InputText id="username" type="text" v-model="username" />
        <small class="text-red-500">{{ errors.username }}</small>
      </div>

      <div class="flex flex-column gap-1">
        <label for="password">Contraseña</label>
        <InputText id="password" type="password" v-model="password" />
        <small class="text-red-500">{{ errors.password }}</small>
      </div>

      <div class="flex flex-column gap-1">
        <label for="confirmPassword">Confirmar Contraseña</label>
        <InputText id="confirmPassword" type="password" v-model="confirmPassword" />
        <small class="text-red-500">{{ errors.confirmPassword }}</small>
      </div>
    </div>

    <div class="flex mt-4">
      <Button type="submit" label="Crear Cuenta" class="w-full" />
    </div>
  </form>

  <div v-if="isRegisterPending" class="flex justify-center items-center">
    <LoadingSpinner />
  </div>

  <div v-if="isRegisterError" class="flex justify-center items-center">
    <p class="text-red-500">{{ registerError }}</p>
  </div>
</template>

<style scoped></style>

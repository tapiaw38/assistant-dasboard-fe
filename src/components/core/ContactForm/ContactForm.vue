<script setup lang="ts">
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const formRef = ref<HTMLFormElement | null>(null)
const loading = ref(false)

const form = reactive({
  user_name: '',
  user_email: '',
  message: '',
})

const sendEmail = async () => {
  if (!formRef.value) return
  loading.value = true

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.value, PUBLIC_KEY)
    alert('Mensaje enviado con éxito!')
    form.user_name = ''
    form.user_email = ''
    form.message = ''
  } catch (error) {
    console.error('EmailJS Error:', error)
    alert('Error al enviar el mensaje.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center">
    <p class="text-gray-500 mb-4">
      Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
    </p>
    <form @submit.prevent="sendEmail" ref="formRef" class="p-fluid flex flex-column w-full">
      <div class="p-field flex flex-column w-full gap-2">
        <label for="name">Nombre</label>
        <InputText
          id="name"
          v-model="form.user_name"
          name="user_name"
          required
          placeholder="Tu nombre"
        />
      </div>

      <div class="p-field flex flex-column w-full gap-2">
        <label for="email">Correo</label>
        <InputText
          id="email"
          v-model="form.user_email"
          name="user_email"
          type="email"
          required
          placeholder="Tu correo"
        />
      </div>

      <div class="p-field flex flex-column w-full gap-2">
        <label for="message">Mensaje</label>
        <Textarea
          id="message"
          v-model="form.message"
          name="message"
          rows="5"
          required
          placeholder="Tu mensaje"
        />
      </div>

      <Button type="submit" label="Enviar" icon="pi pi-send" :loading="loading" class="p-mt-2" />
    </form>
  </div>
</template>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>

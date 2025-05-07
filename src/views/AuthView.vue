<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import AuthLogin from '@/components/core/AuthLogin/AuthLogin.vue'
import AuthRegister from '@/components/core/AuthRegister/AuthRegister.vue'
import GoogleButton from '@/components/core/GoogleButton/GoogleButton.vue'
import { useAuth } from '@/composables/useAuth'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'

const { loginUser, isLoginPending, isLoginError } = useAuth()

const router = useRouter()

const isLogin = ref(true)
const isLoginMessage = ref('Iniciar Sesión')
const isRegisterMessage = ref('Crear cuenta')

const toggleView = () => {
  isLogin.value = !isLogin.value
}

const loginWithGoogle = async (code: string) => {
  await loginUser({ ssoType: 'google', ssoCode: code })
  handleRedirect('dashboard')
}

const handleRedirect = async (to: string) => {
  if (to === 'auth') {
    toggleView()
  }
  return router.push(to)
}
</script>

<template>
  <div class="auth-view flex justify-content-center align-items-center">
    <Card>
      <template #content>
        <div class="flex flex-row">
          <div class="w-full flex flex-column align-items-center justify-content-center gap-3 py-5">
            <i class="pi pi-user text-4xl font-light text-gray-500"></i>
            <template v-if="isLogin">
              <AuthLogin @redirect="handleRedirect" />
            </template>
            <template v-else>
              <AuthRegister @redirect="handleRedirect" />
            </template>
            <div class="flex flex-row mt-3 justify-content-center flex-column align-content-center">
              <GoogleButton @code="loginWithGoogle" v-if="!isLoginPending" />
              <LoadingSpinner v-else class="w-full" />
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-gray-500 cursor-pointer" @click="toggleView">
          {{ !isLogin ? isLoginMessage : isRegisterMessage }}
        </p>
      </template>
    </Card>

    <p class="font-bold" v-if="isLoginError">Error al iniciar sesión</p>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import AuthLogin from '@/components/core/AuthLogin/AuthLogin.vue'
import AuthRegister from '@/components/core/AuthRegister/AuthRegister.vue'
import { useAuth } from '@/composables/useAuth'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import GoogleButton from '@/components/core/GoogleButton/GoogleButton.vue'

const router = useRouter()

const { isLoginPending, isLoginError, loginUser, isLoginSuccess } = useAuth()

const isLogin = ref(true)
const isLoginMessage = ref('Iniciar Sesión')
const isRegisterMessage = ref('Crear cuenta')

const toggleView = () => {
  isLogin.value = !isLogin.value
}

const loginWithGoogle = async (code: string) => {
  await loginUser({ ssoType: 'google', ssoCode: code })
}

watchEffect(() => {
  if (isLoginSuccess.value) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div class="auth-view flex flex-column justify-content-center align-items-center">
    <Card>
      <template #content>
        <div class="flex flex-row">
          <div
            class="w-full flex flex-column align-items-center justify-content-center gap-3 pt-5 pb-3"
          >
            <i class="pi pi-user text-4xl font-light text-gray-500"></i>
            <template v-if="isLogin">
              <AuthLogin />
            </template>
            <template v-else>
              <AuthRegister />
            </template>
          </div>
        </div>
        <div class="flex flex-row gap-2 mb-3 justify-content-center align-items-center">
          <GoogleButton @code="loginWithGoogle" />
        </div>
        <p class="text-center text-sm text-gray-500 cursor-pointer" @click="toggleView">
          {{ !isLogin ? isLoginMessage : isRegisterMessage }}
        </p>
      </template>
    </Card>
    <div class="flex flex-row mt-3 justify-content-center flex-column align-content-center">
      <LoadingSpinner v-if="isLoginPending" class="w-full" />
    </div>
    <p class="font-bold" v-if="isLoginError">Error al iniciar sesión</p>
  </div>
</template>

<style scoped></style>

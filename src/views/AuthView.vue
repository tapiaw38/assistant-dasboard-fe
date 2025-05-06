<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import AuthLogin from '@/components/core/AuthLogin/AuthLogin.vue'
import AuthRegister from '@/components/core/AuthRegister/AuthRegister.vue'

const isLogin = ref(true)
const isLoginMessage = ref('Iniciar Sesión')
const isRegisterMessage = ref('Crear cuenta')

const toggleView = () => {
  isLogin.value = !isLogin.value
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
              <AuthLogin />
            </template>
            <template v-else>
              <AuthRegister />
            </template>
            <div class="flex mt-3">
              <Button
                label="Iniciar con Google"
                icon="pi pi-google"
                severity="info"
                class="w-full max-w-[17.35rem] mx-auto"
              ></Button>
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-gray-500" @click="toggleView">
          {{ !isLogin ? isLoginMessage : isRegisterMessage }}
        </p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.auth-view {
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
}
</style>

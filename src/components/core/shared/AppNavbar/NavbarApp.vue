<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Popover from 'primevue/popover'
import { useAuth } from '@/composables/useAuth'

const { logoutUser, user, meUser, isAuthenticated } = useAuth()

const router = useRouter()

onMounted(async () => {
  if (!isAuthenticated.value) return
  await meUser()
})

watchEffect(async () => {
  if (!isAuthenticated.value) return
  await meUser()
})

const routerLinks = [
  {
    icon: 'pi pi-home',
    label: 'Inicio',
    url: '/',
  },
  {
    icon: 'pi pi-chart-bar',
    label: 'Panel',
    url: '/dashboard',
  },
]

const op = ref()

const togglePopover = (event: Event) => {
  op.value.toggle(event)
}

const logoutUseHandler = async () => {
  await logoutUser()
  op.value.hide()
  router.push('/')
}
</script>

<template>
  <nav class="navbar">
    <!-- Menu items -->
    <div class="navbar-center">
      <template v-for="link in routerLinks" :key="link.url">
        <RouterLink :to="link.url" class="nav-item">
          <div :style="{ display: link.label === 'Panel' && !user ? 'none' : 'block' }">
            <i :class="link.icon" />
            <span class="ml-1 font-light">{{ link.label }}</span>
          </div>
        </RouterLink>
        <span class="mx-2">/</span>
      </template>
    </div>

    <!-- Right icons -->
    <div class="navbar-end" v-if="!user">
      <RouterLink to="/auth" class="nav-icon">
        <i class="pi pi-user" />
      </RouterLink>
    </div>
    <div class="navbar-end" v-else @click="togglePopover">
      <div class="flex flex-row gap-2 justify-content-center align-items-center cursor-pointer">
        <span class="text-gray-500 font-bold block">{{ user?.first_name }}</span>
        <div class="nav-icon cursor-pointer text-gray-500">
          <i class="pi pi-user" />
        </div>
      </div>
    </div>
  </nav>

  <Popover ref="op">
    <div class="flex flex-col gap-2 w-[25rem]">
      <div class="flex flex-column gap-2">
        <ul class="list-none">
          <li class="border-t border-gray-200 mt-1 mb-2 text-gray-500">
            <div class="cursor-pointer" @click="router.push('/my-account')">
              <span class="text-gray-500 font-light">Mi cuenta</span>
            </div>
          </li>
          <li class="border-t border-gray-200 my-1 text-gray-500">
            <div class="cursor-pointer" @click="logoutUseHandler">
              <span class="text-gray-500 font-light">Cerrar Sesión</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Popover>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: transparent;
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.navbar-center {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition:
    background 0.2s,
    color 0.2s;
}

.nav-item:hover {
  color: white;
  background: #645f5f;
}

.navbar-end {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-icon {
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
}

li {
  list-style: none;
}
</style>

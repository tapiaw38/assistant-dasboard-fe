<script setup lang="ts">
import { RouterLink } from 'vue-router'

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
</script>

<template>
  <nav class="navbar">
    <!-- Menu items -->
    <div class="navbar-center">
      <template v-for="link in routerLinks" :key="link.url">
        <RouterLink :to="link.url" class="nav-item">
          <i :class="link.icon" />
          <span class="ml-1 font-light">{{ link.label }}</span>
        </RouterLink>
        <span class="mx-2">/</span>
      </template>
    </div>

    <!-- Right icons -->
    <div class="navbar-end">
      <RouterLink to="/auth" class="nav-icon">
        <i class="pi pi-user" />
      </RouterLink>
    </div>
  </nav>
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
</style>

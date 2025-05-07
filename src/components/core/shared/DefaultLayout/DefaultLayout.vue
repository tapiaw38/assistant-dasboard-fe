<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>

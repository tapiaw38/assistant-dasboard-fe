<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
</script>

<template>
  <div
    class="flex flex-column align-items-start justify-content-center gap-2"
  >
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="first_name">Nombre</label>
      <InputText id="first_name" type="text" />
    </div>
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="last_name">Apellido</label>
      <InputText id="last_name" type="text" />
    </div>
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="email">Email</label>
      <InputText id="email" type="email" />
    </div>
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="username">Nombre de Usuario</label>
      <InputText id="username" type="text" />
    </div>
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="password">Password</label>
      <InputText id="password" type="password" />
    </div>
    <div class="flex flex-column gap-2 justify-content-center">
      <label for="password">Confirmar Password</label>
      <InputText id="password" type="password" />
    </div>
  </div>
  <div class="flex mt-4">
    <Button
      label="Crear Cuenta"
      icon=""
      class="w-full mx-auto"
    ></Button>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
</script>

<template>
  <div class="account-me">
    <h1 class="text-2xl font-bold mb-4 mt-4 text-200 text-gray-500">Mi Cuenta</h1>
    <div class="flex flex-row gap-2">
      <!-- my subscriptions -->
      <div class="flex flex-column md:col-6 col-12">
        <Card class="flex flex-column gap-2">
          <template #title>
            <div class="flex justify-content-center flex-row mb-2">
              <span class="font-bold text-2xl text-gray-500">Suscripciones</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-2 justify-content-center align-items-center">
              <span
                class="text-xl font-bold text-dark-500 flex flex-row gap-2 align-items-center mb-4 justify-content-center"
              >
                Plan: Free
                <i class="pi pi-check-circle text-primary text-2xl"></i>
              </span>
              <div class="flex flex-row gap-2 mb-4">
                <Button
                  label="Editar"
                  icon=""
                  class="p-button-outlined"
                  severity="success"
                  @click="console.log('Edit')"
                />
                <Button
                  label="Pausar"
                  icon=""
                  severity="danger"
                  class="p-button-outlined"
                  @click="console.log('Delete')"
                />
                <Button
                  label="Cancelar"
                  icon=""
                  class="p-button-danger"
                  @click="console.log('Delete')"
                />
              </div>
            </div>
            <div class="flex flex-column gap-2 justify-content-center align-items-center">
              <div class="flex flex-row gap-2 mb-2 align-content-center align-items-center">
                <span class="text-md font-light text-gray-500">
                  Limite de <b class="font-bold text-dark">1000</b> solicitudes por mes
                </span>
              </div>
              <div class="flex flex-row gap-2 align-content-center align-items-center">
                <span class="text-md font-light text-gray-500">
                  Solicitudes restantes: <b class="font-bold text-dark">1000</b>
                </span>
                <Button
                  label=""
                  icon="pi pi-refresh"
                  class="p-button-success"
                  @click="console.log('Refresh')"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
      <!-- plan details -->
      <div class="flex flex-column md:col-6 col-12 gap-2">
        <Card class="flex flex-column gap-2">
          <template #title>
            <div class="flex justify-content-center flex-row mb-1">
              <span class="font-bold text-2xl text-gray-500">Detalles del Plan</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-2 justify-content-center align-items-center">
              <div class="flex flex-row gap-2 mb-1">
                <span
                  class="text-xl font-bold text-gray-500 flex flex-row gap-2 align-items-center justify-content-center"
                >
                  Plan Free
                </span>
              </div>
              <div class="flex flex-column gap-2 justify-content-center align-items-center">
                <div class="flex flex-row gap-2 mb-2">
                  <span class="text-md font-light text-gray-500">
                    Limite de <b class="font-bold text-dark">1000</b> solicitudes por mes
                  </span>
                </div>
                <div class="flex flex-row gap-2 align-content-center align-items-center">
                  <span class="text-md font-light text-gray-500">
                    Costo: <b class="font-bold text-dark">$0</b>
                  </span>
                </div>
                <div class="flex flex-row gap-2 align-content-center align-items-center"></div>
              </div>
            </div>
          </template>
        </Card>
        <Card class="flex flex-column gap-2">
          <template #title>
            <div class="flex justify-content-center flex-row mb-2">
              <span class="font-bold text-2xl text-gray-500">Planes Disponibles</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-2 justify-content-center align-items-center">
              <div class="flex flex-row gap-2 mb-2">
                <Button
                  label="Conocer más"
                  icon=""
                  class="p-button-outlined w-full"
                  severity="success"
                  @click="console.log('Edit')"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-me {
  width: 100%;
  padding: 2rem;
  min-height: 100vh;
}
</style>

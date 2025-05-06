<script setup lang="ts">
import { onMounted } from 'vue'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import { useAuth } from '@/composables/useAuth'

const { meUser, isMeUserPending, isMeUserSuccess, isMeUserError, meUserError, user } = useAuth()

onMounted(async () => {
  await meUser()
})
</script>

<template>
  <div class="dashboard w-full" v-if="!isMeUserPending && isMeUserSuccess">
    <h1 class="text-3xl font-bold mb-4 mt-4 text-200 text-primary">Perfile del Negocio</h1>
    <Panel header="Peril">
      <p>{{ user?.first_name }} aqui podras configurar tu Asistente</p>
    </Panel>
    <div class="grid mt-3 gap-2">
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Simple Card</template>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur
              error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
              nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Simple Card</template>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur
              error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
              nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div class="loading-container" v-else-if="isMeUserPending">
    <LoadingSpinner />
  </div>
  <p v-if="isMeUserError">Error: {{ meUserError?.message }}</p>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
  height: 100vh;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.col-12 {
  flex: 1 1 100%;
}

.md\:col-6 {
  flex: 1 1 48%;
}

.loading-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup lang="ts">
import Card from 'primevue/card'
import FileUpload from '@/components/core/FileUpload/FileUpload.vue'
import LoadingSpinner from '@/components/core/LoadingSpinner/LoadingSpinner.vue'
import { useAssistant } from '@/composables/useAssistant'
import { onMounted } from 'vue'

const {
  assistantProfile,
  getAssistantProfile,
  removeFileById,

  isGetAssistantProfileSuccess,
  isGetAssistantProfilePending,
  isGetAssistantProfileError,
  getAssistantProfileError,

  isRemoveFileByIdPending,
  isRemoveFileByIdSuccess,
  isRemoveFileByIdError,
  removeFileByIdError,
} = useAssistant()

onMounted(() => {
  getAssistantProfile()
})

const removeFile = (fileId: string) => {
  try {
    removeFileById(fileId)
    if (isRemoveFileByIdSuccess.value) {
      getAssistantProfile()
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error)
  }
}
</script>

<template>
  <div class="container-store flex flex-column">
    <div class="flex flex-column gap-2">
      <span class="text-2xl text-gray-500 font-bold">Integración Almacenamiento</span>
      <Card class="mt-4 p-3 flex justify-content-center align-items-center">
        <template #header>
          <span class="text-lg font-bold">Integración de almacenamiento de archivos</span>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <p class="text-gray-500">
              Guarda tus archivos en un almacenamiento accesible para que el asistente pueda acceder
              a ellos.
            </p>
          </div>
        </template>
      </Card>

      <div class="container-upload-store">
        <!-- Upload Files -->
        <div class="flex flex-column col-12 md:col-6 w-full">
          <Card>
            <template #title>
              <div class="flex justify-content-center flex-row">
                <span class="font-bold text-2xl text-primary text-center gap-2"
                  >Sube tus archivos
                  <i class="pi pi-cloud text-primary text-2xl"></i>
                </span>
              </div>
            </template>
            <template #content>
              <FileUpload />
            </template>
          </Card>
        </div>
        <!-- File List -->
        <div class="flex flex-column col-12 md:col-6 w-full">
          <Card>
            <template #title>
              <div class="flex justify-content-center flex-row">
                <span class="font-bold text-2xl text-primary text-center gap-2"
                  >Lista de archivos <i class="pi pi-file text-primary text-2xl"></i
                ></span>
              </div>
            </template>
            <template #content>
              <div class="flex flex-column gap-4" v-if="isGetAssistantProfileSuccess">
                <div class="flex flex-column gap-2">
                  <ul class="list-none">
                    <li v-for="(file, index) in assistantProfile?.files" :key="index">
                      <div class="flex justify-content-between align-items-center">
                        <a
                          class="text-blue-500 hover:text-blue-700"
                          :href="file.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          >{{ file.name }}</a
                        >
                        <button
                          class="p-button p-component p-button-danger"
                          @click="removeFile(file.id)"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>

                <div v-if="isRemoveFileByIdPending" class="flex flex-column col-12 md:col-6 w-full">
                  <LoadingSpinner />
                </div>

                <div v-if="isRemoveFileByIdError" class="flex flex-column col-12 md:col-6 w-full">
                  <span class="text-red-500 font-bold">
                    Error al eliminar el archivo: {{ removeFileByIdError }}
                  </span>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div v-if="isGetAssistantProfilePending" class="flex flex-column col-12 md:col-6 w-full">
          <LoadingSpinner />
        </div>
        <div v-if="isGetAssistantProfileError" class="flex flex-column col-12 md:col-6 w-full">
          <span class="text-red-500 font-bold">
            Error al cargar los archivos: {{ getAssistantProfileError }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-store {
  margin: 1rem auto;
  max-width: 1400px;
  padding: 1rem;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding-top: 2.5rem;
  }
}

.container-upload-store {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
    gap: 1rem;
  }
}

:deep(.p-card) {
  width: 100%;
  overflow: hidden;
}

:deep(.p-card-content) {
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
}

ul {
  padding: 0;
  margin: 0;
  width: 100%;
}

li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

@media (max-width: 768px) {
  .flex.justify-content-between {
    flex-direction: column;
    gap: 0.5rem;
  }

  a {
    word-break: break-all;
  }

  button {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { usePrimeVue } from 'primevue/config'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'
import Badge from 'primevue/badge'
import type { UploadFile } from './types'
import { useAssistant } from '../../../composables/useAssistant'

const { addFiles, addFilesError } = useAssistant()

const $primevue = usePrimeVue()

const totalSize = ref(0)
const totalSizePercent = ref(0)
const selectedFiles = ref<File[]>([])

const allowedTypes = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const onRemoveTemplatingFile = (
  file: UploadFile,
  removeFileCallback: (index: number) => void,
  index: number,
) => {
  if (file.objectURL) {
    URL.revokeObjectURL(file.objectURL)
  }
  removeFileCallback(index)
  totalSize.value -= file.size
  totalSizePercent.value = totalSize.value
}

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  totalSize.value = 0
  const filtered = event.files.filter((file: UploadFile) => allowedTypes.includes(file.type))

  if (filtered.length !== event.files.length) {
    alert('Solo se permiten archivos PDF y Excel (.xls, .xlsx).')
  }

  // Verificar tamaño individual de archivos
  const maxFileSize = 262144000 // 250 MiB (250 * 1024 * 1024)
  const oversizedFiles = filtered.filter((file: UploadFile) => file.size > maxFileSize)

  if (oversizedFiles.length > 0) {
    alert(
      `Los siguientes archivos superan el límite de 250 MiB: ${oversizedFiles
        .map((f: UploadFile) => f.name)
        .join(', ')}`,
    )
    return
  }

  filtered.forEach((file: UploadFile) => {
    file.objectURL = URL.createObjectURL(file)
    totalSize.value += file.size
  })

  totalSizePercent.value = totalSize.value
  selectedFiles.value = filtered
}

const uploadEvent = async (uploadCallback: () => void, clearCallback: () => void) => {
  if (selectedFiles.value.length > 0) {
    try {
      await addFiles(selectedFiles.value)

      clearCallback()
    } catch (error) {
      console.error('Error uploading files:', error + ' - ', addFilesError.value)
    }
  }

  uploadCallback()
}

const onTemplatedUpload = () => {}

const formatSize = (bytes: number) => {
  const k = 1024
  const dm = 2
  const sizes = $primevue.config?.locale?.fileSizeTypes || ['B', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) {
    return `0 ${sizes[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes[i]}`
}
</script>

<template>
  <div class="card">
    <FileUpload
      name="demo[]"
      @upload="onTemplatedUpload"
      :multiple="true"
      accept=".pdf,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :maxFileSize="262144000"
      @select="onSelectedFiles"
    >
      <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-file"
              rounded
              outlined
              severity="secondary"
            />
            <Button
              @click="uploadEvent(uploadCallback, clearCallback)"
              icon="pi pi-cloud-upload"
              rounded
              outlined
              severity="success"
              :disabled="!files || files.length === 0"
            />
            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            />
          </div>
          <ProgressBar
            :value="totalSizePercent"
            :showValue="false"
            class="md:w-20rem h-1 w-full md:ml-auto"
          >
            <span class="whitespace-nowrap">{{ formatSize(totalSize) }}</span>
          </ProgressBar>
        </div>
      </template>

      <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
        <div class="flex flex-col gap-8 pt-4">
          <div v-if="files.length > 0">
            <h5>Pending</h5>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="(file, index) of files"
                :key="file.name + file.type + file.size"
                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
              >
                <div>
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="(file as any).objectURL"
                    width="100"
                    height="50"
                  />
                </div>
                <span
                  class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                  >{{ file.name }}</span
                >
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Pending" severity="warn" />
                <Button
                  icon="pi pi-times"
                  @click="onRemoveTemplatingFile(file as any, removeFileCallback, index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>

          <div v-if="uploadedFiles.length > 0">
            <h5>Completed</h5>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="(file, index) of uploadedFiles"
                :key="file.name + file.type + file.size"
                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
              >
                <div>
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="(file as any).objectURL"
                    width="100"
                    height="50"
                  />
                </div>
                <span
                  class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                  >{{ file.name }}</span
                >
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Completed" class="mt-4" severity="success" />
                <Button
                  icon="pi pi-times"
                  @click="removeUploadedFileCallback(index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <i
            class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
          ></i>
          <p class="mt-2 mb-0">
            Arrastra y suelta archivos PDF o Excel aquí para subirlos (máximo 250 MiB por archivo).
          </p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>

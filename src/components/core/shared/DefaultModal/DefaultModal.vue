<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'

export interface DefaultModalProps {
  isVisible: boolean
  title: string
  width?: string | undefined
}

const props = defineProps<DefaultModalProps>()
const emit = defineEmits(['update:visible'])

const localVisible = ref(props.isVisible)

watch(
  () => props.isVisible,
  (newVal) => {
    localVisible.value = newVal
  },
)

watch(localVisible, (newVal) => {
  emit('update:visible', newVal)
})
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="localVisible"
      modal
      :header="props.title"
      :style="{ width: props.width ?? '25rem' }"
    >
      <slot />
    </Dialog>
  </div>
</template>

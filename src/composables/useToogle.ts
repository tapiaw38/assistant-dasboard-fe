import { ref } from 'vue'

export const useToogle = (initialValue: boolean) => {
  const toogleValue = ref(initialValue)
  const toggle = () => {
    toogleValue.value = !toogleValue.value
  }
  return {
    toogleValue,
    toggle,
  }
}

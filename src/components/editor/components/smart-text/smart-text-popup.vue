<script setup lang="ts">
import { Dialog, Input } from 'tdesign-vue-next'
import { ref } from 'vue'
const props = defineProps<{
  destroyDialog: () => void
  handleVisibleChange?: (inputValue: string) => void
}>()
const visibleChange = (vis: boolean, inputValue: string) => {
  inputValue && props.handleVisibleChange?.(inputValue)
  if (!vis) props.destroyDialog()
}
const visible = ref(true)
const inputValue = ref('')
</script>
<template>
  <Dialog
    :visible="visible"
    @update:visible="visibleChange"
    @confirm="visibleChange(false, inputValue)"
  >
    <div class="flex flex-col gap-2">
      <h2>changeText</h2>
      <Input v-model="inputValue" />
    </div>
  </Dialog>
</template>
<style lang="scss" scoped></style>

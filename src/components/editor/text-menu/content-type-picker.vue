<script setup lang="ts">
import {
  Dropdown,
  Tooltip,
  Button,
  DropdownMenu,
  DropdownItem,
  type TdPopupProps,
} from 'tdesign-vue-next'
import { computed } from 'vue'
import type { ContentTypePickerOption } from './hooks/use-content-type'

const props = defineProps<{
  options: ContentTypePickerOption[]
  menuPopupProps: TdPopupProps
}>()
const activeLabel = computed(() => {
  return props.options.find((op) => op.type === 'option' && op.isActive())?.label
})
</script>
<template>
  <Tooltip content="格式">
    <Dropdown :popupProps="menuPopupProps" trigger="click">
      <Button variant="text" class="w-[50px]">{{ activeLabel || '--' }} </Button>
      <DropdownMenu>
        <DropdownItem v-for="item in options" @click="item.onClick">{{ item.label }} </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Tooltip>
</template>
<style lang="scss" scoped></style>

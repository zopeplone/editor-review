<script setup lang="ts">
import { useDialog } from '@/hooks/useDialog'
import { TextSelection } from '@tiptap/pm/state'
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import SmartTextPopup from './smart-text-popup.vue'
import { computed, onMounted, ref } from 'vue'
const props = defineProps(nodeViewProps)
const handleClick = () => {}

const showText = computed({
  get: () => {
    return props.node.attrs.showText as string
  },
  set: (val: string) => {
    props.updateAttributes({ showText: val })
  },
})
const handlePopupVisibleChange = (inputValue: string) => {
  showText.value = inputValue
}
const { destroyDialog, renderDialog } = useDialog(SmartTextPopup, {}, handlePopupVisibleChange)
const handleDbClick = () => {
  renderDialog()
}
</script>
<template>
  <NodeViewWrapper class="inline-block">
    <span
      contenteditable="false"
      class="smart-text bg-transparent cursor-pointer select-text rounded-sm transition hover:bg-slate-300 px-1"
      data-drag-handle
      draggable="true"
      @click="handleClick"
      @dblclick="handleDbClick"
    >
      {{ showText }}
    </span>
  </NodeViewWrapper>
</template>
<style lang="scss" scoped>
.ProseMirror-selectednode .smart-text {
  background-color: antiquewhite;
}
.smart-text {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: #000;
}
</style>

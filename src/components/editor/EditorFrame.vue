<script setup lang="ts">
import { computed, ref } from 'vue'
import TextMenu from './text-menu/text-menu.vue'
import TiptapEditor from './TiptapEditor.vue'
import { useEditorFrame } from './hooks/use-editor-frame'
import { type Content } from '@tiptap/vue-3'

const {
  isMaskShow,
  isMaskFocus,
  wrapper,
  textMenu,
  tiptapEditorRef,
  editorInstance,
  handleDbClickMask,
} = useEditorFrame()

const props = defineProps<{
  initialValue: Content
}>()
const getContent = () => {
  return editorInstance.value?.getJSON()
}
defineExpose({ getContent })
</script>
<template>
  <div
    :class="[
      'w-[300px] h-[300px] mt-[20px] relative border-black border',
      isMaskFocus && 'shadow-md border-[2px]',
    ]"
    ref="wrapper"
  >
    <div
      :class="['w-full h-full absolute z-10 cursor-grab']"
      v-if="isMaskShow"
      tabindex="-1"
      @dblclick="handleDbClickMask"
      @focus="isMaskFocus = true"
      @blur="isMaskFocus = false"
    ></div>
    <TextMenu
      v-if="!isMaskShow"
      :editor="editorInstance"
      :reference="tiptapEditorRef?.$el"
      ref="textMenu"
    >
    </TextMenu>
    <TiptapEditor ref="tiptapEditorRef" :initialValue="initialValue"></TiptapEditor>
  </div>
</template>
<style lang="scss" scoped></style>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { flip, offset, shift, useFloating, autoUpdate } from '@floating-ui/vue'
import {
  Tooltip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Divider,
  Button,
  ColorPickerPanel,
  ColorPicker,
  type TdPopupProps,
} from 'tdesign-vue-next'

import type { Editor } from '@tiptap/vue-3'
import ContentTypePicker from './content-type-picker.vue'
import { useContentType } from './hooks/use-content-type'
const floating = ref<HTMLDivElement>()
const props = defineProps<{
  reference: Element | undefined
  editor: Editor | undefined
}>()
const { floatingStyles } = useFloating(toRef(props.reference), floating, {
  placement: 'top',
  middleware: [offset(10), flip(), shift()],
  whileElementsMounted: autoUpdate,
})
const menuPopupProps: TdPopupProps = {}
defineExpose({
  floating,
})
const { contentTypePickerOptions } = useContentType(props.editor)
const editorState = computed(() => {
  return {
    isBold: !!props.editor?.isActive('bold'),
    // isItalic: !!props.editor?.isActive('italic'),
    // isStrike: !!props.editor?.isActive('strike'),
    // isUnderline: !!props.editor?.isActive('underline'),
    // isCode: !!props.editor?.isActive('code'),
    // isSubscript: !!props.editor?.isActive('subscript'),
    // isSuperscript: !!props.editor?.isActive('superscript'),
    // isAlignLeft: !!props.editor?.isActive({ textAlign: 'left' }),
    // isAlignCenter: !!props.editor?.isActive({ textAlign: 'center' }),
    // isAlignRight: !!props.editor?.isActive({ textAlign: 'right' }),
    // isAlignJustify:!! props.editor?.isActive({ textAlign: 'justify' }),
    currentColor: props.editor?.getAttributes('textStyle')?.color || 'rgb(0, 0, 0)',
    // currentHighlight: props.editor?.getAttributes('highlight')?.color || undefined,
    // currentFont: props.editor?.getAttributes('textStyle')?.fontFamily || undefined,
    // currentSize: props.editor?.getAttributes('textStyle')?.fontSize || undefined,
  }
})
const editorCommands = computed(() => {
  return {
    onChangeColor: (color: string) => props.editor?.chain().focus().setColor(color).run(),
  }
})
</script>
<template>
  <teleport to="body">
    <div
      :class="[
        'bg-white shadow-sm border-gray-50 border h-10 w-30 flex gap-1 items-center rounded p-1',
      ]"
      ref="floating"
      :style="floatingStyles"
    >
      <ContentTypePicker
        :options="contentTypePickerOptions"
        :menuPopupProps="menuPopupProps"
      ></ContentTypePicker>
      <Divider layout="vertical"></Divider>
      <Tooltip content="加粗">
        <Button
          theme="default"
          :variant="editor?.isActive('bold') ? 'base' : 'text'"
          class="w-9"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          B
        </Button>
      </Tooltip>
      <Tooltip content="选择颜色">
        <ColorPicker
          class="w-[170px] flex justify-center"
          :popupProps="menuPopupProps"
          borderless
          :color-modes="['monochrome']"
          :show-primary-color-preview="false"
          :value="editorState.currentColor"
          @change="(color) => editorCommands.onChangeColor(color)"
        >
        </ColorPicker>
      </Tooltip>
    </div>
  </teleport>
</template>
<style lang="scss" scoped></style>

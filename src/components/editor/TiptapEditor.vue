<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onMounted, ref } from 'vue'
import { editorConfig } from './editor-config'
const editor = ref<Editor>()
const editorRef = ref<InstanceType<typeof EditorContent>>()
const emit = defineEmits(['blur'])
onMounted(() => {
  editor.value = new Editor({
    ...editorConfig,
    element: editorRef.value?.rootEl,
  })
  editor.value.on('blur', (event) => emit('blur', event))
})
defineExpose({ editor })
</script>
<template>
  <EditorContent class="w-full h-full flex" :editor="editor" ref="editorRef"></EditorContent>
</template>
<style lang="scss" scoped></style>

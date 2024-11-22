import type { Editor } from '@tiptap/vue-3'
import { computed, onMounted, ref } from 'vue'
import type TiptapEditor from '../TiptapEditor.vue'
import type TextMenu from '../text-menu/text-menu.vue'

export const useEditorFrame = () => {
  // 遮罩是否应该显示
  const isMaskShow = ref(true)
  // 遮罩是否被聚焦
  const isMaskFocus = ref(false)

  const wrapper = ref<HTMLDivElement>()
  // 菜单栏
  const textMenu = ref<InstanceType<typeof TextMenu>>()
  const tiptapEditorRef = ref<InstanceType<typeof TiptapEditor>>()
  // editor实例
  const editorInstance = computed(() => {
    return tiptapEditorRef.value?.editor
  })

  const handleDbClickMask = () => {
    isMaskShow.value = false
    editorInstance.value?.setEditable(true)
    editorInstance.value?.chain().focus().run()
    listenClickOutside()
  }

  const listenClickOutside = () => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      const vueApp = document.querySelector('#app')
      // 如果目标在菜单或者editor中就return，或者在弹窗上也return
      if (
        textMenu.value?.$el.contains(target) ||
        textMenu.value?.$el === target ||
        tiptapEditorRef.value?.$el.contains(target) ||
        tiptapEditorRef.value?.$el === target ||
        // 只有弹窗不在#app里
        !vueApp?.contains(target)
      ) {
        return
      }
      isMaskShow.value = true
      editorInstance.value?.setEditable(false)
      document.removeEventListener('click', handleClickOutside)
    }
    document.addEventListener('click', handleClickOutside)
  }

  return {
    isMaskShow,
    isMaskFocus,
    wrapper,
    textMenu,
    tiptapEditorRef,
    editorInstance,
    handleDbClickMask,
  }
}

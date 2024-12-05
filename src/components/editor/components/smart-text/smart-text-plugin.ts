import { getMarkRange, mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { Plugin, TextSelection, type PluginView } from '@tiptap/pm/state'
import SmartText from './smart-text.vue'
import { ref } from 'vue'
import { flip } from '@floating-ui/vue'
import { useDebounceFn } from '@vueuse/core'

export interface SmartTextOption {}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    smartText: {
      addSmartText: (option: SmartTextOption) => ReturnType
    }
  }
}

const SmartTextPlugin = Node.create({
  // configuration …
  name: 'smartText',
  priority: 101,
  addAttributes() {
    return {
      showText: { default: 'SmartText' },
    }
  },
  group: 'inline',
  inline: true,
  atom: true,
  draggable: true,
  selectable: true,
  addKeyboardShortcuts() {
    return {}
  },
  addCommands() {
    return {
      addSmartText:
        (option) =>
        ({ chain }) => {
          return chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: option,
              text: 'smartText',
            })
            .insertContent({
              type: 'text',
              text: ' ',
            })
            .run()
        },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(SmartText)
  },
  parseHTML() {
    return [
      {
        tag: 'smart-text',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['smart-text', mergeAttributes(HTMLAttributes)]
  },
  addProseMirrorPlugins() {
    return []
  },
})
export default SmartTextPlugin

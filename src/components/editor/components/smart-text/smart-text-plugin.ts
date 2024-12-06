import { getMarkRange, mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { NodeSelection, Plugin, TextSelection, type PluginView } from '@tiptap/pm/state'
import SmartText from './smart-text.vue'
import { nextTick, ref } from 'vue'
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
    return {
      // 进行退格时，需要先选中smartText，然后如果再摁退格时再删除
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          const { selection } = state
          const { empty, anchor } = selection

          if (!empty) {
            return false
          }
          let isSmartText = false
          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              const dom = this.editor.view.domAtPos(pos).node as HTMLElement
              if (!dom.classList.contains('Prosemirror-selectednode')) {
                isSmartText = true
                tr.setSelection(NodeSelection.create(state.doc, pos))
              }
            }
          })
          return isSmartText
        }),
    }
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
    return [
      /**
       * 在选择到自定义NodeView的最后一个节点时，由于后面没有文档
       * 所以在用鼠标选择selection的时候，无法选中任何东西，
       * 文档光标会随着鼠标移动
       */
      new Plugin({
        props: {
          handleDOMEvents: {
            mousedown: (view) => {
              // setTimeout 是为了等待mousedown之后更新transaction和文档光标
              setTimeout(() => {
                const { $anchor } = view.state.selection
                const currentNode = $anchor.nodeBefore
                const currentPos = $anchor.pos
                const parent = $anchor.parent
                // 自定义插入逻辑
                if (currentNode?.type.name === 'smartText' && currentNode === parent.lastChild) {
                  const tr = view.state.tr
                  console.log('insert space')
                  tr.insertText(' ', currentPos)
                  view.dispatch(tr)
                }
              }, 50)
            },
          },
        },
      }),
    ]
  },
})
export default SmartTextPlugin

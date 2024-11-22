import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlockComponent from './code-block.vue'

const lowlight = createLowlight(all)

const CodeBlockPlugin = CodeBlockLowlight.extend({
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockComponent)
  },
}).configure({ lowlight })
export default CodeBlockPlugin

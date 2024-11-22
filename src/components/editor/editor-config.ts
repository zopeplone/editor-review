import { type EditorOptions } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Color } from '@tiptap/extension-color'
import CodeBlockPlugin from './components/code-block/code-block'

export const editorConfig: Partial<EditorOptions> = {
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    Document,
    Paragraph,
    Text,
    Bold,
    Heading,
    ListItem,
    TextStyle,
    BulletList,
    OrderedList,
    TaskList,
    TaskItem,
    Color,
    CodeBlockPlugin,
  ],
}

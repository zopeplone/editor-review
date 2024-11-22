import { isActive, type Editor } from '@tiptap/vue-3'

export type ContentTypePickerOption = {
  label: string
  id: string
  type: string
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
}
export const useContentType = (editor: Editor | undefined) => {
  const contentTypePickerOptions = [
    {
      label: '正文',
      id: '正文',
      type: 'option',
      disabled: () => !editor?.can().setParagraph(),
      isActive: () =>
        !!(
          editor?.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList')
        ),
      onClick: () => {
        editor?.chain().focus().lift('taskItem').liftListItem('listItem').setParagraph().run()
      },
    },
    {
      label: 'H1',
      id: 'H1',
      type: 'option',
      disabled: () => !editor?.can().setHeading({ level: 1 }),
      isActive: () => !!editor?.isActive('heading', { level: 1 }),
      onClick: () => {
        editor
          ?.chain()
          .focus()
          .lift('taskItem')
          .liftListItem('listItem')
          .setHeading({ level: 1 })
          .run()
      },
    },
    {
      label: 'H2',
      id: 'H2',
      type: 'option',
      disabled: () => !editor?.can().setHeading({ level: 2 }),
      isActive: () => !!editor?.isActive('heading', { level: 2 }),
      onClick: () => {
        editor
          ?.chain()
          .focus()
          .lift('taskItem')
          .liftListItem('listItem')
          .setHeading({ level: 2 })
          .run()
      },
    },
  ]
  return {
    contentTypePickerOptions,
  }
}

import { h, ref, render, type Component } from 'vue'

export const useDialog = <T extends Component>(
  component: T,
  props?: any,
  handleVisibleChange?: (...args: any[]) => void,
) => {
  const div = document.createElement('div')

  const destroyDialog = () => {
    render(null, div)
    div.remove()
  }
  const renderDialog = () => {
    const vNode = h(component, { ...props, destroyDialog, handleVisibleChange })
    render(vNode, div)
    document.body.appendChild(div)
  }
  return {
    destroyDialog,
    renderDialog,
  }
}

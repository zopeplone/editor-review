<script setup lang="ts">
import EditorFrame from '@/components/editor/EditorFrame.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import { Button, ColorPicker } from 'tdesign-vue-next'
import { onMounted, ref } from 'vue'
import { type Content } from '@tiptap/vue-3'
const sideData = ref<SideItem[]>([])
const listData = ref<Content[]>([])

const getSidebar = async () => {
  let res = await JSON.parse(localStorage.getItem('side-data')!)
  sideData.value = res || []
}
const nowId = ref(0)
const getListData = async () => {
  let res = await JSON.parse(localStorage.getItem(`data-${nowId.value}`)!)
  listData.value = res || []
}
onMounted(async () => {
  await getSidebar()
  nowId.value = sideData.value?.[0]?.id || 0
  await getListData()
})
const editorListRef = ref<InstanceType<typeof EditorFrame>[]>()
const saveData = async () => {
  const data = JSON.stringify(editorListRef.value?.map((item) => item.getContent()))
  console.log(data)
  await localStorage.setItem(`data-${nowId.value}`, data)
}
const changePage = async (id: number) => {
  nowId.value = id
  await getListData()
}
const addEditor = () => {
  listData.value.push('')
}
</script>

<template>
  <main class="flex gap-2 bg-slate-50">
    <SideBar :data="sideData" @change="changePage"></SideBar>
    <div class="flex-grow flex gap-2 flex-wrap overflow-y-scroll h-dvh">
      <template v-for="item in listData" :key="item">
        <EditorFrame :initial-value="item" ref="editorListRef"></EditorFrame>
      </template>
    </div>
    <div class="basis-[120px] shrink-0 flex flex-col gap-2">
      <Button @click="saveData">保存</Button>
      <Button @click="addEditor">新增</Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import SideBarItem from './SideBarItem.vue'
const props = defineProps<{
  data: SideItem[]
}>()
const addPage = () => {
  const id = props.data.length
  props.data.push({
    id,
    name: String(id),
  })
  localStorage.setItem('side-data', JSON.stringify(props.data))
}
const emit = defineEmits(['change'])
</script>
<template>
  <div class="flex flex-col flex-shrink-0 basis-[200px] h-dvh border border-r-black">
    <div class="flex flex-col gap-2 grow">
      <template v-for="item in data" :key="item">
        <SideBarItem
          @click="emit('change', item.id)"
          :item="item"
          class="w-full flex justify-center items-center bg-slate-50 rounded-md hover:bg-slate-100"
        ></SideBarItem>
      </template>
    </div>
    <div
      class="h-6 w-full border-t border-black hover:bg-gray-300 cursor-pointer flex justify-center items-center"
      @click="addPage"
    >
      新建
    </div>
  </div>
</template>
<style lang="scss" scoped></style>

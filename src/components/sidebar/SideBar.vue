<script setup lang="ts">
import SideBarItem from './SideBarItem.vue'
const list = [{ name: 'abc' }, { name: 'ccd' }]
</script>
<template>
  <div class="flex flex-col flex-shrink-0 basis-[200px] h-dvh border border-r-black">
    <template v-for="item in list" :key="item">
      <SideBarItem :item="item"></SideBarItem>
    </template>
  </div>
</template>
<style lang="scss" scoped></style>

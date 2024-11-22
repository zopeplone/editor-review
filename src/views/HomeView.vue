<script setup lang="ts">
import EditorFrame from '@/components/editor/EditorFrame.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import { ColorPicker } from 'tdesign-vue-next'
</script>

<template>
  <main class="flex gap-2 bg-slate-50">
    <SideBar></SideBar>
    <div class="flex-grow flex gap-2">
      <EditorFrame></EditorFrame>
      <EditorFrame></EditorFrame>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: { name: string }
}>()
</script>
<template>
  <div class="text-base">{{ item.name }}</div>
</template>
<style lang="scss" scoped></style>

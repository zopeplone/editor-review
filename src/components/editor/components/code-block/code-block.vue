<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'
import { computed, ref } from 'vue'

const props = defineProps(nodeViewProps)
const languages = props.extension.options.lowlight.listLanguages()
const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language) {
    props.updateAttributes({ language })
  },
})
</script>
<template>
  <node-view-wrapper class="code-block">
    <select contenteditable="false" v-model="selectedLanguage">
      <option :value="null">auto</option>
      <option disabled>—</option>
      <option v-for="(language, index) in languages" :value="language" :key="index">
        {{ language }}
      </option>
    </select>
    <pre><code><node-view-content /></code></pre>
  </node-view-wrapper>
</template>
<style lang="scss" scoped>
.code-block {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: 10px;
  margin: 3px 0;
  select {
    width: auto;
    font-size: 12px;
    background-color: transparent;
    outline: none;
    border-radius: 6px;
    margin-left: auto;
  }
}
</style>

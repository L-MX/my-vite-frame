<template>
  <div class="node-config">
    <Component
      :is="type_map[nodeType]"
      :info="info"
      class="node-config-core"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import businessDialog from './business/index.vue'
defineProps({
  nodeType: {require: true},
  info: { type: Object, required: true}
})
const type_map = ref({
  business: businessDialog
})
</script>

<style lang="scss" scoped>
.node-config, .node-config-core {
  height: 100%;
}
</style>
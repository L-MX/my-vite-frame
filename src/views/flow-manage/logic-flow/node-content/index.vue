<template>
  <div class="node-config">
    <TsyComponent ref="childRef" :info="info" v-if="nodeType === 'tsy'"/>
    <xtpdComponent ref="childRef" :info="info" v-else-if="nodeType === 'xtpd'"/>
    <htclComponent ref="childRef" :info="info" v-else-if="nodeType === 'htcl'"/>
    <mxclComponent ref="childRef" :info="info" v-else-if="nodeType === 'mxcl'"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TsyComponent from "./tsy/index.vue";
import xtpdComponent from "./xtpd/index.vue";
import htclComponent from "./htcl/index.vue";
import mxclComponent from "./mxcl/index.vue";
import useCtx from "@/hooks/useCtx";
const { proxy } = useCtx();
const props = defineProps({
  info: { type: Object as any, required: true },
});
const nodeType = computed (() => {
  return props.info.type
})
const confirm = () => {
  proxy.$refs.childRef.confirm()
}
defineExpose({confirm})
</script>

<style lnag="scss" scoped>
.node-config {
  height: 100%;
}
</style>

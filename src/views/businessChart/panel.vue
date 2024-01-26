<template>
  <div class="node-panel">
    <div
      class="node-item"
      v-for="item of panlNodes"
      :key="item.type"
      @mousedown="dragNode(item)"
    >
      <div class="node_icon" :class="item.class"></div>
      <span>{{ item.text }}</span>
    </div>  
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCertainNodeInfo } from './node-info'
const props = defineProps({
    LF: {type: Object as any}
});

let createdCount = 0
const panlNodes = ref<any>([{
  text: "业务节点",
  type: "business",
  class: "node-business",
}])
const dragNode = (item: any) => {
    props.LF.dnd.startDrag({
      type: item.type,
      properties: {
        isFold: false,
        nodeName: '业务节点' + `${++createdCount}`,
        nodeInfo: getCertainNodeInfo(item.type)
      }
    });
};
</script>

<style lang="scss" scoped>
.node-panel {
  position: absolute;
  z-index: 101;
  width: 120px;
  height: 100%;
  padding: 20px 10px;
  background-color: #fff;
  .node-item {
    margin-bottom: 20px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    .node_icon {
      width: 30px;
      height: 30px;
      background-size: cover !important;
      margin: auto;
      margin-bottom: 6px;
      &.node-business {
        background: url("/images/logo_xtpd.png") no-repeat;
      }
    }
  }
}
</style>
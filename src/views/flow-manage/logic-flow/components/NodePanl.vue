<template>
  <div class="node-panl">
    <div
      class="node-item"
      v-for="item of panlNodes"
      :key="item.type"
      @mousedown="dragNode(item)"
    >
      <div class="node_icon" :class="item.type"></div>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCertainNodeInfo } from '@/views/flow-manage/logic-flow/node-info'
import { panlNodes } from "../data-conifg";
const props = defineProps({
    LF: {type: Object as any}
});
const dragNode = (item: any) => {
    props.LF.dnd.startDrag({
      type: item.type,
      properties: getCertainNodeInfo(item.type)
    });
};
</script>

<style lang="scss" scoped>
.node-panl {
  position: absolute;
  z-index: 101;
  @include model(120px, 100%);
  @include border-right();
  @include white-bg();
  padding: 20px 10px;
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
      &.tsy {
        background: url("@assets/logo_tsy.png") no-repeat;
      }
      &.xtpd {
        background: url("/images/logo_xtpd.png") no-repeat;
      }
      &.htcl {
        background: url("/images/logo_htcl.png") no-repeat;
      }
      &.mxcl {
        background: url("/images/logo_mxcl.png") no-repeat;
      }
    }
  }
}
</style>

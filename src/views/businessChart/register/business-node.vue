<template>
  <div class="business-node" ref="connect">  
    <div class="top flexBox">
      <span>{{nodeName}}</span>
      <el-icon class="fold-btn" :class="{isFold: isFold}" @click.stop="toFold()"><ArrowDown /></el-icon>
    </div>
    <div class="content" v-if="!isFold">
      <!-- 节点分支 -->
      <div class="content-item">
        <h4 class="title">节点分支</h4>
        <div class="item over-hide" v-for="(item, index) of groups" :key="index">
          <status-tag 
            :statusName="`分支${index + 1}`"
            type="primary"
            style="margin-right: 5px;"/>
          {{ item.name }}
        </div>
      </div>
      <!-- 异常分支 -->
      <div class="content-item" v-show="errors.length > 0">
        <h4 class="title">异常情况</h4>
        <div class="item over-hide" v-for="(item, index) of errors" :key="index">
          <status-tag 
            :statusName="`分支${index + 1}`"
            type="danger"/>
            {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick} from "vue";
import useCtx from "@/hooks/useCtx"
const { proxy } = useCtx();

const props = defineProps({
  properties: {type: Object as any}
});
const emit = defineEmits(['updateHeight', 'updateLinks'])
const isFold = ref<boolean>(props.properties.isFold)
const nodeName = ref<string>(props.properties.nodeName)
const nodeInfo = props.properties.nodeInfo
const groups = ref<Array<any>>(nodeInfo.groups)
const errors = ref<Array<any>>(nodeInfo.errors)


const updateHeight = () => {
    const El = proxy.$refs.connect
    const height = El.offsetHeight
    emit('updateHeight', height)
}
// 折叠
const toFold = () => {
    isFold.value = !isFold.value
    nextTick(() => {
      updateHeight()
      emit('updateLinks')
    })
}

onMounted(() => {
  updateHeight()
})

</script>

<style lang="scss" scoped>
.business-node {
  width: 100%;
  background: #FFF;
  border: 1px solid $border-color;
  box-shadow: $box-shadow-base;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  font-size: 14px;
  .error {
    font-size: 16px;
    color: $error-color;
    margin-left: 5px;
  }
  .top {
    height: 40px;
    line-height: 40px;
    background: rgba(213, 142, 77, 0.06);
    border-top: 3px solid #fa830c;
    padding-left: 16px;
    padding-right: 9px;
    .fold-btn {
      cursor: pointer;
      transition: 0.2s;
      padding: 5px 10px;
      &.isFold {
        transform: rotate(-180deg);
      }
    }
  }
  .content {
    padding: 10px 16px;
    .content-item {
      margin-bottom: 10px;
      .title {
        height: 32px;
        line-height: 32px;
        color: $title-color;
      }
      .item {
        height: 34px;
        line-height: 34px;
        border: 1px solid #e2e7ee;
        border-radius: $border-radius-base;
        margin-bottom: 4px;
        padding: 0 5px;
      }
    }
  }
}
</style>

<template>
  <div class="buiness-chart-detail">
    <div class="flow-header flexBox">
      <h4>业务流程画布</h4>
      <div class="inline-btns flex">
        <!-- <el-button @click="autoFold()">{{showFold ? '一键收起' : '一键展开'}}</el-button> -->
        <el-button @click="autoALigin()">一键对齐</el-button>
        <el-button @click="initData()">重置</el-button>
        <el-button type="primary" @click="toSave()">保存</el-button>
      </div>
    </div>
    <div class="flow-container">
      <my-chart ref="myChart"></my-chart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import myChart from "./chart.vue";
import jsonData from './data/data.json'
// import { transformChartData } from './utils'
import useCtx from '@/hooks/useCtx';
const { proxy } = useCtx();

// 获取画布数据
const $render = (chartData: any) => {
  proxy.$refs.myChart.$render(chartData)
}
const initData = () => {
  // 实际开发中是从后端接口获取json数据，进行一系列转换，然后再渲染数据
  $render(jsonData)
}

const showFold: boolean = false
const autoFold = () => {
}
const autoALigin = () => {
  proxy.$refs.myChart.toDagre()
  const graphData = proxy.$refs.myChart.getData()
  $render(graphData)
}
const toSave = () => {
  const modelData = proxy.$refs.myChart.getData()
  // const {nodes, edges} = transformChartData(modelData)
  console.log('modelData', modelData)
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.buiness-chart-detail {
  height: 100%;
}
.flow-header {
  height: 60px;
  line-height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid $border-color-split;
}
.flow-container {
  height: calc(100% - 60px);
}
</style>
<template>
  <div class="buiness-chart">
    <!-- 界面面板 -->
    <!-- <div class="logic-panel"></div> -->
    <NodePanel :LF="LF"></NodePanel>
    <!-- 画布 -->
    <div id="logic-flow" ref="container"></div>
    <!-- 节点属性面板 -->
    <my-drawer
      v-model="dialogVisible"
      @close="dialogVisible = false"
      @confirm="confirmNodeOperation"
      title="设置业务节点属性"
      v-if="dialogVisible"
    >
      <template #body>
        <NodeConfig 
          :node-type="nodeType"
          :info="currentNodeData" 
          ref="nodeConfig">
        </NodeConfig>
      </template>
    </my-drawer>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import { ref, onMounted, nextTick } from "vue";
import LogicFlow from "@logicflow/core";
import { MiniMap, Menu } from "@logicflow/extension";
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import baseConifg from "./data/base-conifg";
import theme from "./data/theme";
import { registerStart, registerBusiness, registerPolyline } from "./register";
import NodePanel from "./panel.vue";
import NodeConfig from "./node-content/node-config.vue";
import Dagre from './dagre'
import useCtx from '@/hooks/useCtx';
const { proxy } = useCtx();

const LF = ref<any>(null)

// 初始化
const initChart = () => {
  const lf = new LogicFlow({
    ...baseConifg,
    container: proxy.$refs.container,
    plugins: [MiniMap, Menu, Dagre]
  })
  LF.value = lf;
  // 设置主题
  lf.setTheme(theme);
  // 注册
  $register();
}

// 渲染
const $render = (chartData: any) => {
  initChart()
  LF.value.render(chartData); // 渲染节点
  $LfEvent(); // 添加事件
};

// 画布事件
const $LfEvent = () => {
  LF.value.on('node:click', (result: any) => {
    const data = result.data
    console.log('当前节点信息', data)
    if (data.type === 'start') return false
    dialogVisible.value = true
    // 将最外层的id, type, x, y值塞到properties中，方便逻辑中使用
    data.properties.nodeId = data.id
    data.properties.nodeType = data.type
    data.properties.x = data.x
    data.properties.y = data.y
    currentNodeData.value = cloneDeep(data.properties)
    nodeType.value = data.type
  })
}

// 注册节点与边
const $register = () => {
  registerStart(LF.value)
  registerBusiness(LF.value)
  registerPolyline(LF.value)
}

// 抽屉
const dialogVisible = ref<boolean>(false);
const currentNodeData = ref(null);
const nodeType = ref<string>('')
const confirmNodeOperation = () => {
  console.log('当前信息', currentNodeData.value)
  if (!currentNodeData.value) return
  const { nodeId } = currentNodeData.value
  const properties = cloneDeep(currentNodeData.value)
  // 将页面交互的数据 更新到 节点属性中-更新prop
  LF.value.setProperties(nodeId, properties)
  dialogVisible.value = false
  // 更新当前节点对应的分支连线
  nextTick(() => {
    LF.value.getNodeModelById(nodeId).updateBranchLinks()
  })
}

onMounted(() => {
  initChart();
});

// 获取画布数据
const getData = () => {
  const {edges, nodes} = LF.value.getGraphRawData()
  return {
    edges,
    nodes
  }
}
// 画布一建美化
const toDagre = () =>{
  LF.value.extension.dagre && LF.value.extension.dagre.layout({
    nodesep: 10,
    ranksep: 30
  })
}

defineExpose({ getData, toDagre, $render });

</script>

<style lang="scss" scoped>
.buiness-chart {
  height: 100%;
  position: relative;
  .logic-panel {
    width: 120px;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    border-right: 1px solid $border-color-split;
  }
  #logic-flow {
    width: 100%;
    height: 100%;
  }
}
</style>
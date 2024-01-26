<template>
  <div class="chart-wrapper">
    <!-- 节点面板 -->
    <NodePanel v-if="LF" :LF="LF"></NodePanel>
    <!-- 画布 -->
    <div id="logic-flow" ref="container">画布</div>
    <!-- 节点属性面板 -->
    <my-drawer
      v-model="dialogVisible"
      @close="dialogVisible = false"
      @confirm="confirmNodeOperation"
    >
      <template #body v-if="dialogVisible">
        <NodeConfig :info="currentNodeData" ref="nodeConfig"></NodeConfig>
      </template>
    </my-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import cloneDeep from "lodash/cloneDeep";
import LogicFlow from "@logicflow/core";
import { MiniMap, Menu } from "@logicflow/extension";
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import useCtx from "@/hooks/useCtx";
import baseConifg from "./base-conifg";
import theme from "./theme";
import jsonData from "./data.json";
import { registerStart, registerHtml } from "./registerNode";
import NodePanel from "./components/NodePanl.vue";
import NodeConfig from "@/views/flow-manage/logic-flow/node-content/index.vue";
const { proxy } = useCtx();

// 定义全局画布对象
const LF = ref<any>(null);

// 画布事件
const $LfEvent = function () {
  // 单击节点事件
  LF.value.on("node:click", ({ data }) => {
    console.log("node:click", data);
    dialogVisible.value = true;
    currentNodeData.value = cloneDeep(data);
  });
  // // 单击事件
  // LF.value.on("edge:click", ({ data }) => {
  //   console.log("edge:click", data);
  // });
  // // 单击事件
  // LF.value.on("element:click", ({ data }) => {
  //   console.log("element:click", data);
  // });
  // // 单击事件
  // LF.value.on("blank:click", ({ data }) => {
  //   console.log("blank:click", data);
  // });
  // // 单击事件
  // LF.value.on("blank:click", ({ data }) => {
  //   console.log("blank:click", data);
  // });
};
const $render = () => {
  LF.value.render(jsonData); // 渲染节点
  $LfEvent(); // 添加事件
};

// 自定义
const registerNode = () => {
  // 注册各个节点
  registerStart(LF.value);
  registerHtml(LF.value, "tsy");
  registerHtml(LF.value, "xtpd");
  registerHtml(LF.value, "htcl");
  registerHtml(LF.value, "mxcl");
  // 渲染画布
  $render();
};
const initChart = () => {
  const lf = new LogicFlow({
    ...baseConifg,
    container: proxy.$refs.container,
    plugins: [MiniMap, Menu],
  });
  LF.value = lf;
  // 设置主题
  lf.setTheme(theme);
  // 自定义
  registerNode();
  // 初始化缩略图
  nextTick(() => {
    // lf.extension.miniMap.show(lf.graphModel.width - 150, 40);
    // lf.extension.menu.addMenuConfig({
    //   nodeMenu: [
    //     {
    //       text: "分享",
    //       callback() {
    //         alert("分享胜利！");
    //       },
    //     },
    //   ],
    // });
  });
};

// 抽屉
const dialogVisible = ref<boolean>(false);
const currentNodeData = ref(null);
const confirmNodeOperation = () => {
  if (!currentNodeData.value) return;
  const { id, properties } = currentNodeData.value;
  // 将页面的数据更新到节点属性中
  LF.value.setProperties(id, {
    ...(properties as any),
  });
  dialogVisible.value = false;
};
onMounted(() => {
  initChart();
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  height: 100%;
  position: relative;
  #logic-flow {
    height: 100%;
  }
}
</style>

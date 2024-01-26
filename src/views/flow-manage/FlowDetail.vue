<template>
  <div class="flow-detail">
    <div class="flow-detail-header">
      <h3>流程111</h3>
      <div class="inline-btns">
        <el-button>{{ $t("btn.reset") }}</el-button>
        <el-button type="primary">{{ $t("btn.save") }}</el-button>
      </div>
    </div>
    <div class="flow-chart-container">
      <Chart></Chart>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from "./logic-flow/Chart.vue";
</script>

<style lang="scss" scoped>
.flow-detail-header {
  @include flexBox();
  padding: 10px 24px;
  border-bottom: 1px solid $border-color-split;
}
.flow-chart-container {
  @include calc-height(55px);
}
</style>

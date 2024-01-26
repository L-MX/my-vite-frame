<template>
  <el-form
    :model="info.properties"
    ref="form"
    :rules="rules"
    label-width="80px"
    :inline="false"
    size="normal"
  >
    <el-form-item label="接口分类">
      <el-select
        v-model="info.properties.interfaceCategory"
        clearable
        filterable
      >
        <el-option label="接口分类1" :value="1"> </el-option>
        <el-option label="接口分类2" :value="2"> </el-option>
        <el-option label="接口分类3" :value="3"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="接口名称">
      <el-select v-model="info.properties.interfaceId" clearable filterable>
        <el-option label="接口1" :value="1"> </el-option>
        <el-option label="接口2" :value="2"> </el-option>
        <el-option label="接口3" :value="3"> </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
// 表单
const rules = reactive({});
const confirm = () => {
  console.log(99999, props.info);
};
defineExpose({ confirm });
</script>

<style lang="scss" scoped></style>

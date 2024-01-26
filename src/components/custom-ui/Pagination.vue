<!-- 全局分页组件 -->
<template>
  <el-pagination
    class="page-box"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
defineProps({
  pageNum: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40],
  },
  total: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["size_change", "current-change"]);

const handleSizeChange = function (val: any) {
  emit("size_change", val);
};
const handleCurrentChange = function (val: any) {
  emit("current-change", val);
};
</script>

<style lang="scss" scoped>
</style>

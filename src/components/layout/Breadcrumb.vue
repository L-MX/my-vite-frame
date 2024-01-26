<template>
  <div class="layout-tab" v-if="!isQiankun">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) of breadcrumbList"
        :key="index"
        :to="item.path"
        replace
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { isQiankun } from "@/utils/constants";
import { setActions } from "@/utils/actions";
import useCtx from "@/hooks/useCtx";
const { _this } = useCtx();
const breadcrumbList = ref<Array<any>>([]);
const getBreadcrumbList = () => {
  const matched = _this.$route.matched;
  breadcrumbList.value = matched
    .filter((v: any) => v.name)  // 过滤掉不能跳转即name为空的路由
    .map((x: any) => {
      return {
        title: x.meta?.label,
        path: x.path,
      };
    });
  if (isQiankun) {
    setActions({breadcrumbList: breadcrumbList.value})
  }
};
watch(
  () => _this.$route,
  () => {
    getBreadcrumbList()
  }
);
onMounted(() => {
  getBreadcrumbList()
})
</script>

<style lang="scss" scoped>
.layout-tab {
  padding: 10px 16px;
  .link {
    font-weight: 600;
    cursor: pointer;
  }
}
</style>

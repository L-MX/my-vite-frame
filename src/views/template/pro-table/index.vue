<!-- 为了通过matched获取面包屑轨迹，因此详情页面需要嵌在列表页的子路由中。这样方便追加面包屑 -->
<template>
    <!-- 列表页 -->
    <List v-if="!hidePage"></List>
    <!-- 嵌在列表页中的详情等页面 -->
    <router-view></router-view>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  import List from "./list.vue";
  import useCtx from "@/hooks/useCtx";

  const { _this } = useCtx();
  
  // 当进入详情页后隐藏列表页
  const hidePage = computed(() => {
    return _this.$route.path.includes('/detail')
  })
  </script>
  
  <style lang="scss" scoped></style>
  
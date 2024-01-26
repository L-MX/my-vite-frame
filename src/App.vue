<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zhCn from '@/utils/zh-cn'
// import zhCn from "element-plus/lib/locale/lang/zh-cn";
// import En from "element-plus/lib/locale/lang/en";
// import Ko from "element-plus/lib/locale/lang/ko";
const locale = ref(zhCn)
</script>

<style scoped lang="scss">
.div {
  @include model(200px, 200px, 50px, 10px);
  background-color: $primary-color;
}
</style>

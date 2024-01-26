<template>
  <el-empty
    :image="imgSrc"
    :image-size="size"
    :description="text || '暂无数据'"
  ></el-empty>
</template>

<script setup lang="ts">
import { require } from "@/utils/helpers";
const props = defineProps({
  size: { type: Number, default: 200 },
  src: { type: Object, default: null },
  text: { type: String, default: "暂无数据" }
})

const imgSrc = props.src || require('/images/noData.png');
</script>

<style></style>

<template>
  <el-button
    ref="buttonRef"
    :type="styleType"
    :plain="plain"
    :size="size"
    :icon="styleIcon"
    :disabled="disabled"
    :loading="loading"
    :link="link"
    @click="handleClick"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  value: { type: String },
  type: { type: String, default: "default" }, // 按钮类型
  plain: { type: Boolean, default: false }, // 是否为朴素按钮
  link: { type: Boolean, default: false },  // 是否为文字按钮
  size: { type: String, default: "default" }, // 按钮大小
  icon: { type: String },
  disabled: { type: Boolean, default: false }, // 是否禁用, 不可以点击
  loading: { type: Boolean, default: false }, // 按钮正在加载中
});
const emit = defineEmits(["click"]);
// 像新增、导入、导出、删除等按钮样式固定直接传以下自定义类型即可，也可以直接传按钮type
const styleType = computed(() => {
  const type: string = props.type;
  if (type === "add") {
    return "primary";
  } else if (type === "import") {
    return "default";
  } else if (type === "export") {
    return "default";
  } else if (type === "delete") {
    return "danger";
  } else {
    return type;
  }
});
const styleIcon = computed(() => {
  const type: string = props.type;
  if (type === "add") {
    return "CirclePlus";
  } else if (type === "import") {
    return "Upload";
  } else if (type === "export") {
    return "Download";
  } else if (type === "delete") {
    return "Delete";
  } else {
    return props.icon;
  }
});
const buttonRef = ref<any>(null);
const handleClick = () => {
  // 点击完成后让按钮失去焦点，否则按钮背景颜色不能恢复
  const target: any = buttonRef.value.ref;
  target.blur();
  emit("click");
};
</script>

<style lang="scss" scoped></style>

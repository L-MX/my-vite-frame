<template>
  <el-tooltip  placement="top" effect="dark">
    <template #content>
      {{ tips }}
    </template>
    <el-button 
      ref="buttonRef"
      :type="styleType"
      :plain="plain"
      :size="size"
      :icon="styleIcon"
      :disabled="disabled"
      :loading="loading"
      @click="handleClick">
      <slot></slot>
    </el-button>
    
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import i18n from "@/utils/i18n";
import useCtx from "@/hooks/useCtx";
const { _this } = useCtx();
const props = defineProps({
  tips: { type: String, default: i18n.global.t("placeholder.pleaseChooseData") }, // 提示
  handle: { type: String },     // 操作名称
  type: { type: String, default: 'default' },  // 按钮类型
  plain: { type: Boolean, default: false },    // 是否为朴素按钮
  size: { type: String, default: 'default' },  // 按钮大小
  icon: { type: String },
  clickable: { type: Boolean, default: true }, // 是否可点击，可以点击，但是不执行操作
  disabled: { type: Boolean, default: false }, // 是否禁用, 不可以点击
  loading: { type: Boolean, default: false }   // 按钮正在加载中
})
const emit = defineEmits(['click'])
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
  if (props.clickable) {
    emit('click')
  } else {
    const tips = props.handle ? i18n.global.t('placeholder.pleaseChooseDataTip', {handle: props.handle}) : props.tips
    _this.$message.warning(tips + '！')
  }
}
</script>

<style lang="scss" scoped>

</style>
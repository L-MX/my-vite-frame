<!-- 公共的弹窗 -->
<template>
  <div class="custom-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :width="width"
      :custom-class="customClass"
      :before-close="handleClose"
    >
      <div class="body">
        <slot name="body"></slot>
      </div>
      <template #footer v-if="widthFooter">
        <span class="dialog-footer">
          <el-button @click="handleClose" v-if="showClose">{{
            closeText
          }}</el-button>
          <el-button type="primary" @click="confirm" v-if="showConfirm">
            {{ confirmText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
// setup中使用i18n方法1：不能再defineProps中使用；
// import {useI18n} from "vue-i18n"
// const { t } = useI18n()
// setup中使用i18n方法2：标红提示（后期解决下） 全局使用的方式暂时还没找到，后续有时间再看

import i18n from "@/utils/i18n";
const props = defineProps({
  value: { type: Boolean, default: false },
  title: { type: String, default: i18n.global.t("msg.title") },
  width: { type: String, default: 520 },
  customClass: { type: String },
  showClose: { type: Boolean, default: true },
  showConfirm: { type: Boolean, default: true },
  confirmText: { type: String, default: i18n.global.t("btn.confirm") },
  closeText: { type: String, default: i18n.global.t("btn.cancel") },
});
const emit = defineEmits(["confirm", "close"]);
const dialogVisible = ref<boolean>(false);
const confirm = () => {
  emit("confirm");
};
const handleClose = () => {
  emit("close");
};
// watch监听
watch(
  () => props.value,
  (nu) => {
    dialogVisible.value = nu;
  },
  { deep: true, immediate: true }
);
// 是否显示footer 取消和确认按钮都没有则不显示
const widthFooter = computed(() => {
  return props.showClose || props.showConfirm
})
</script>

<style lang="scss">
.custom-dialog {
  .el-dialog__header {
    border-bottom: 1px solid $border-color-split;
    margin-right: 0;
  }
  .el-dialog__footer {
    border-top: 1px solid $border-color-split;
  }
}
</style>

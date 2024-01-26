<template>
  <el-drawer
    v-model="dialogVisible"
    :direction="direction"
    :size="width"
    :custom-class="customClass"
    :show-close="showClose"
  >
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <div class="drawer-body">
        <slot name="body"></slot>
      </div>
    </template>
    <template #footer v-if="widthFooter">
      <div style="flex: auto">
        <el-button @click="handleClose" v-if="showClose">{{ closeText }}</el-button>
        <el-button type="primary" @click="confirm" v-if="showConfirm">{{ confirmText }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import i18n from "@/utils/i18n";
const props = defineProps({
  value: { type: Boolean, default: false },
  title: { type: String, default: i18n.global.t("msg.title") },
  width: { type: String, default: "520px" },
  customClass: { type: String },
  widthFooter: {type: Boolean, default: true},
  showClose: { type: Boolean, default: true },
  showConfirm: { type: Boolean, default: true },
  confirmText: { type: String, default: i18n.global.t("btn.confirm") },
  closeText: { type: String, default: i18n.global.t("btn.cancel") },
  direction: { type: String, default: "rtl" },
  destroyOnClose: { type: Boolean, default: false }
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
</script>

<style lang="scss" scoped>
.drawer-body {
  height: 100%;
  overflow-y: auto;
}
</style>

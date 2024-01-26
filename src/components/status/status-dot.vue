<template>
  <div class="status" v-if="statusName">
    <span 
      class="status-dot"
      :class="type">
      {{statusName}}
      <el-tooltip :content="reason" v-if="reason">
        <el-icon class="icon-info"><Warning /></el-icon>
      </el-tooltip>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    defalut: 'primary'
  },
  statusName: {
    type: String,
    default: ''
  },
  reason: {
    type: String,
    defalut: ''
  }
})
</script>

<style lang="scss" scoped>
.status {
  display: inline-block;
  .status-dot {
    color: $text-color;
  }
}
.icon-info {
  margin-left: 5px;
  color: $text-color-secondary;
  cursor: pointer;
}
</style>
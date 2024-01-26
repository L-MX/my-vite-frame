<template>
    <div class="status" :class="{'show-cursor': showCursor}" @click="handleClick" v-if="statusName">
      <span 
        class="status-tag"
        :class="type">
        {{statusName}}
      </span>
      <el-tooltip :content="reason" v-if="reason">
        <el-icon class="icon-info"><Warning /></el-icon>
      </el-tooltip>
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
    },
    showCursor: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['click'])
  const handleClick = () => {
    emit('click')
  }
  </script>
  
  <style lang="scss" scoped>
  .status {
    display: inline-block;
    .status-dot {
      color: $text-color;
    }
  }
  .icon-info {
    margin-left: 2px;
    color: $text-color-secondary;
    position: relative;
    top: 2px;
    cursor: pointer;
  }
  </style>
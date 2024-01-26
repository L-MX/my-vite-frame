<template>
  <div class="tag-input" :class="{disabled}">
    <el-icon
      class="icon-clear"
      v-show="clearable && !disabled && (tags.length || keywords)"
      @click="clearAll()"
    >
      <CircleClose />
    </el-icon>
    <template v-if="tags.length > 0">
      <el-tag
        v-for="(tag, index) of tags"
        :type="tagType"
        :closable="!disabled"
        @close="(e: any) => delTag(e, index)"
      >
        {{ tag }}
      </el-tag>
    </template>
    <el-input
      v-model="keywords"
      v-bind="$attrs"
      :disabled="disabled"
      @keyup.enter="enterToTag()"
      @blur="enterToTag()"
    />
  </div>
</template>

<script setup lang="ts" name="TTagInput">
import { ref, watch, onMounted, useAttrs } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: { type: String, default: '' },   // 父组件v-model绑定的值
  splitSymbol: { type: String, default: ',' }, // 分隔的符号
  tagType: { type: String, default: '' },      // tag的类型 info、success、warning、danger
  clearable: { type: Boolean, default: false },// 是否支持一键清空
  disabled: { type: Boolean, default: false }  // 禁用
})
const emits = defineEmits(['update:modelValue'])
const $attrs: any = useAttrs()

let keywords = ref<string>('') // 文本框的值
let tags = ref<any>([])        // tags值

// 生成tag
const enterToTag = () => {
  const arrValue = getTags(keywords.value)
  // 字长校验
  if (arrValue.some((val) => val.length > $attrs.maxlength)) {
    ElMessage.error('单个字长不能超过', $attrs.maxlength)
    return false
  }
  // 去重
  const all = [...tags.value, ...arrValue]
  const setArr = Array.from(new Set(all)) // 去重后的数组
  if (setArr.length < all.length) {
    ElMessage.error('内容不能重复')
    return false
  }
  tags.value = [...setArr]
  keywords.value = ''
}

// 删除tag
const delTag = (e: any, index: number) => {
  e.preventDefault()
  tags.value.splice(index, 1)
}

// 一键清空
const clearAll = () => {
  tags.value = []
  keywords.value = ''
}
// 将文本转换成tags格式
const getTags = (nu) => {
  let reg = new RegExp(`/${props.splitSymbol}/gi`)
  switch (props.splitSymbol) {
    case ',':
      reg = /，/gi
      break // 中文逗号转换成英文逗号
  }
  const _keywords = nu && nu.replace(reg, props.splitSymbol)
  return _keywords.split(props.splitSymbol).filter((item) => item) || []
}

onMounted (() => {
  tags.value =  getTags(props.modelValue)
})
// tags与modelValue之间的转换
watch(
  () => props.modelValue,
  (nu) => {
    tags.value =  getTags(nu)
  },
  { deep: true }
)
watch(
  () => tags.value,
  (nu) => {
    const value = nu && nu.join(props.splitSymbol)
    emits('update:modelValue', value)
  },
  { deep: true }
)
</script>

<style lang="scss">
.tag-input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  position: relative;
  &.disabled {
    background-color: #f5f7fa;
    cursor:not-allowed;
  }
  &:hover {
    .icon-clear {
      display: inline-block;
    }
  }
  .icon-clear {
    position: absolute;
    top: 2px;
    right: 2px;
    color: #a8a8a8;
    z-index: 9;
    display: none;
    cursor: pointer;
  }
  &:focus-within {
    box-shadow: 0 0 0 2px rgb(56 96 244 / 20%);
  }
  .el-tag {
    margin: 5px 4px;
  }
  .el-input {
    padding-left: 10px;
    border: none;
    .el-input__wrapper {
      box-shadow: none;
    }
    &:focus {
      box-shadow: none;
    }
  }
}
</style>

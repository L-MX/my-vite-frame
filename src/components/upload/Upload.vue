<template>
  <el-upload
    ref="uploadRef"
    class="upload"
    :drag="drag"
    :accept="accept"
    :multiple="multiple"
    :http-request="httpRequest"
    :on-remove="onRemove"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖拽文件到这 或者 <em>点击上传</em></div>
    <template #tip>
      <div class="flexBox">
        <div class="el-upload__tip">
          {{ uploadTip || `仅支持上传 ${accept} 文件，且不超过${maxSize}` }}
        </div>
        <el-button type="text" @click="downloadTemplate" v-if="downloadTemplate" style="margin-top: 10px;">
            下载模板
        </el-button>
        </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue' 
import { getFileSuffix } from "@/utils/file";
import useCtx from "@/hooks/useCtx";
const { _this } = useCtx();
const emit = defineEmits(['change'])
const props = defineProps({
  drag: { type: Boolean, default: true },
  multiple: { type: Boolean, default: false },
  accept: { type: String },
  maxSize: { type: String },
  uploadTip: { type: String },
  downloadTemplate: { type: Function },
})
const getLimitSize = () => {
  const maxSize: any = props.maxSize;
  const unit = maxSize.substr(maxSize.length - 1, 1);
  const max = Number(maxSize.substr(0, maxSize.length - 1));
  //将单位转换为bit
  let limitSize = 0;
  if (["G", "g"].indexOf(unit) > -1) {
    limitSize = max * 1024 * 1024 * 1024;
  } else if (["M", "m"].indexOf(unit) > -1) {
    limitSize = max * 1024 * 1024;
  } else if (["K", "k"].indexOf(unit) > -1) {
    limitSize = max * 1024;
  }
  return limitSize;
};
// 自定义实现文件上传
const fileList = ref<any>([])
const uploadRef = ref<any>(null)
const httpRequest = (option: any) => {
  const file: any = option.file;
  // 文件类型限制
  if (props.accept) {
    const acceptArr = props.accept.split(","); //支持的文件类型
    const fileSuffix = getFileSuffix(file.name); //当前文件后缀
    if (acceptArr.indexOf(`.${fileSuffix}`) === -1) {
      clearFiles();
      return _this.$message.error("文件类型仅支持" + props.accept);
    }
  }
  // 文件大小限制
  if (file.size > getLimitSize()) {
    clearFiles();
    return _this.$message.error("文件最大支持" + props.maxSize);
  }
  nextTick(() => {
    //不支持多选，只取最后一次添加的文件
    if (!props.multiple) {
      const last =
        document.querySelectorAll(".el-upload-list__item").length - 1;
      const items = document.querySelectorAll(".el-upload-list__item");
      items.forEach((item, index) => {
        index !== last && item.remove();
      });
      emit("change", file);
    } else {
      fileList.value.push(file);
      emit("change", fileList.value);
    }
  });
};
// 文件删除
const onRemove = (file: any, fileList: Array<any>) => {
  console.log(file)
  if (!props.multiple) {
    emit("change", null);
  } else {
    emit("change", fileList);
  }
};

const clearFiles = () => {
  uploadRef.value && uploadRef.value.clearFiles();
};
</script>

<style lang="scss" scoped></style>

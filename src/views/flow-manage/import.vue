<template>
  <my-dialog
    custom-class="templete-import"
    :value="dialogVisible"
    title="导入模板"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <template #body>
      <Upload 
        maxSize="500M" 
        accept=".doc，.docx，.xls，.xlsx"
        :downloadTemplate="downloadTemplate"
        @change="getFile"/>
    </template>
  </my-dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { downloadFun } from "@/utils/file";
import useCtx from "@/hooks/useCtx";
const { _this } = useCtx();
const dialogVisible = ref<boolean>(false)
const openDialog = () => {
  dialogVisible.value = true
}
const curFile= ref<any>(null)
const getFile = (file: any) => {
  curFile.value = file
}
const handleConfirm = () => {
  if (!curFile.value) {
    return _this.$message.error('请选择文件！')
  }
}
const handleClose= () => {
  dialogVisible.value = false
}

// 下载csv模板
const downloadTemplate = () => {
  axios.get('/template.xlsx', { responseType: 'blob' }).then(res => {
    const url = window.URL.createObjectURL(res.data)
    downloadFun(url, 'template.xlsx')
  })
}
defineExpose({openDialog})
</script>

<style lang="scss" scoped>
</style>
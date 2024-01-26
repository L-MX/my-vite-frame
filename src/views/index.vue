<template>
   <div class="admin-index">
      <t-tag-input
        v-model="keywords"
        clearable
        :maxlength="20"
      />
      <t-button 
         type="primary" 
         size="default" 
         @click="() => {console.log('keywords', keywords)}"
         style="margin-top: 10px">
         提交
      </t-button>
      <!-- <tag-input 
        v-model="keywords"
        :maxlength="20"
        :clearable="true"
        style="width: 500px">
      </tag-input>
      <el-button 
         type="primary" 
         size="default" 
         @click="() => {console.log('keywords', keywords)}"
         style="margin-top: 10px">
         提交
      </el-button>
      <el-button 
         type="primary" 
         size="default" 
         @click="() => keywords = '哈哈哈,嘿嘿嘿,呵呵呵'"
         style="margin-top: 10px">
         替换
      </el-button> -->
   </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const keywords = ref<string>('2')
</script>

<style lang="scss" scoped>
.admin-index {
  padding: 16px 24px;
}
</style>
<template>
  <div class="business-node-config">  
    <el-form label-width="100px" :inline="false">
      <h3>分支</h3>
      <el-form-item :label="`分支${index + 1}`" v-for="(group, index) of info.nodeInfo.groups" :key="index">
        <div class="branch-item">
          <el-input 
            v-model="group.name" 
            placeholder="请输入分支名称" 
            size="normal" 
            clearable/>
            <el-icon class="delete" @click="deleteGroup(index)"><Delete /></el-icon>
        </div>
      </el-form-item>
      <el-form-item style="width: 100%">
        <div class="add-btn" @click="addGroup()">
          <el-icon><Plus /></el-icon>
          添加分支
        </div>
      </el-form-item>
      
      <!-- 异常分支 -->
      <h3>异常分支</h3>
      <el-form-item :label="`分支${index + 1}`" v-for="(group, index) of info.nodeInfo.errors" :key="index">
        <div class="branch-item">
          <el-input 
            v-model="group.name" 
            placeholder="请输入分支名称" 
            size="normal" 
            clearable/>
            <el-icon class="delete" @click="deleteError(index)"><Delete /></el-icon>
        </div>
      </el-form-item>
      <el-form-item style="width: 100%">
        <div class="add-btn" @click="addError()">
          <el-icon><Plus /></el-icon>
          添加异常分支
        </div>
      </el-form-item>
    </el-form>
    
    
    
  </div>
</template>

<script setup>
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import { generateUID } from '@/utils/helpers'
const props = defineProps({
  info: { type: Object, required: true}
})
const defaultGroup = {
  name: '' // 分支名称
}
const defaultError = {
  name: '' // 分支名称
}
const addGroup = () => {
  const newGroup = assign({
    sourceId: props.info.nodeId,  // 当前节点id
    uid: generateUID()            // 当前分支id
  }, cloneDeep(defaultGroup))
  props.info.nodeInfo.groups.push(newGroup)
}
const deleteGroup = (index) => {
  props.info.nodeInfo.groups.splice(index, 1)
}
const addError = () => {
  const newError = assign({
    sourceId: props.info.nodeId, 
    uid: generateUID()
  }, cloneDeep(defaultError))
  props.info.nodeInfo.errors.push(newError)
}
const deleteError = (index) => {
  props.info.nodeInfo.errors.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.add-btn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 20x 10px;
  border: 1px dashed $primary-color;
  border-radius: 4px;
  text-align: center;
  color: $primary-color;
  cursor: pointer;
  .el-icon {
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
}
.branch-item {
  width: 100%;
  .el-input {
    width: calc(100% - 30px);
  }
  .delete {
    width: 30px;
    color: $error-color;
    cursor: pointer;
  }
}
</style>
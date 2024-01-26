<template>
  <div class="layout-header">
    <div class="tool-bar-left">
      <img class="logo" :src="require('/images/logo.svg')"/>
      <h2 class="logo-text">admin管理端通用框架</h2>
    </div>
    <div class="tool-bar-right">
      <el-dropdown @command="changeTheme">
        <span class="iconfont icon-pifu"></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="(item, index) of themes" 
              :key="index"
              :command="item.type">
             {{ item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <img class="img-head" :src="require('/images/icons/icon-user.png')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { require } from "@/utils/helpers"
const themes = [
  { title: "默认主题", type: "primary" },
  { title: "松石绿主题", type: "green" },
  { title: "暗夜紫主题", type: "purple" }
];
const changeTheme = (theme: string) => {
  document.body.className = theme;
  // 存入缓存
  localStorage.setItem("theme", theme);
};
</script>

<style lang="scss" scoped>
.layout-header {
  height: 60px;
  line-height: 60px;
  padding: 0 1rem;
  @include flexBox();
  border: 1px solid $border-color;
  >div {
    @include flex();
  }
  .tool-bar-left {

    .logo {
        @include model(28px, 28px);
        margin-right: 8px;
    }
  }
  .tool-bar-right {
    .icon-pifu {
      font-size: 1.5rem;
      cursor: pointer;
    }
    .img-head {
      @include model(40px, 40px, 24px);
      @include rounded-corners(50%);
    }
  }
}
</style>

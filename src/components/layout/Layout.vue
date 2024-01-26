<template>
  <el-container class="layout" :class="{onlyView: isQiankun}">
    <el-header v-if="!isQiankun">
      <Header></Header>
    </el-header>
    <el-container class="layout-section">
      <Sidebar v-if="!isQiankun"></Sidebar>
      <el-main class="layout-main">
        <Breadcrumb></Breadcrumb>
        <div class="layout-view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Breadcrumb from "@/components/layout/Breadcrumb.vue";
import { isQiankun } from "@/utils/constants";
</script>

<style lang="scss">
.layout.onlyView {
  .layout-section {
    height: 100%;
  }
  .layout-main {
    padding: 0;
    .layout-view {
      height: 100%;
    }
  }
}
.layout {
  width: 100%;
  height: 100%;
  .layout-section {
    @include calc-height(60px);
  }
  .layout-main {
    @include calc-width(200px);
    height: 100%;
    background: $body-bg;
    padding: 0 16px;

    .layout-view {
      @include calc-height(35px);
      @include white-bg();
      @include rounded-corners(6px);
      border: 1px solid $border-color-split;
      overflow-y: auto;
      >div {
        height: 100%;
      }
    }
  }
}
</style>

<template>
  <div class="layout-sidebar">
    <el-menu
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      :collapse="isCollapse"
      class="layout-menu"
    >
      <tempalte v-for="(item, index) of menuList" :key="index">
        <el-sub-menu
          :index="item.name"
          v-if="item.children && item.children.length > 0"
        >
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            :index="sub.name"
            v-for="(sub, i) of item.children"
            :key="i"
            @click="toPage(sub)"
          >
            {{ sub.title }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="item.name" v-else @click="toPage(item)">
          <el-icon><HomeFilled /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </tempalte>
    </el-menu>
    <el-icon
      class="flod-btn"
      :class="{ expand: isCollapse }"
      @click="changeCollapse"
      ><Fold
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useCtx from "@/hooks/useCtx";
import router from "@/router";
import useStore from "@/store";

// 全局变量
const { _this } = useCtx();
const { menu } = useStore();

// 菜单折叠
const { isCollapse } = storeToRefs(menu);
const changeCollapse = () => {
  menu.collapseChange(!isCollapse.value);
};

// 路由菜单
const routes = router.options.routes;
const layoutRoutes = routes.find((v) => v.path === "/layout")?.children || [];
const recursionFun = (arr: Array<any>) => {
  let _arr: any = [];
  arr.forEach((x: any) => {
    if (x.meta && !x.meta.hideMenu) {
      const Item: any = {
        title: x.meta.label,
        name: x.name,
        path: x.path,
        children: [],
      };
      if (x.children && x.children.length > 0) {
        Item.children = recursionFun(x.children);
      }
      _arr.push(Item);
    }
  });
  return _arr;
};
const menuList = ref(recursionFun(layoutRoutes));
console.log(77777, menuList.value)

// 跳转
const toPage = (item: any) => {
  sessionStorage.setItem('activeMenuName',item.name)
  // 当前展开的菜单
  _this.$router.push({
    name: item.name,
  });
};

// 获取当前选中的菜单项
const defaultActive = ref<string>(_this.$route.name);
const getDefaultActive = () => {
  defaultActive.value =  sessionStorage.getItem('activeMenuName') || _this.$route.name
}

// 获取默认展开的菜单
const defaultOpeneds = ref<Array<string>>([""]);
const getDefaultOpends = () => {
  defaultOpeneds.value = [defaultActive.value]; 
}
watch(
  () => _this.$route,
  () => {
    getDefaultActive()
    getDefaultOpends()
  }
);
onMounted(() => {
  getDefaultActive()
  getDefaultOpends()
})
</script>

<style lang="scss" scoped>
.layout-sidebar {
  @include model(none, 100%);
  border-right: 1px solid $border-color;
  position: relative;
  .flod-btn {
    position: absolute;
    right: 16px;
    bottom: 24px;
    font-size: 24px;
    cursor: pointer;
    &.expand {
      transform: rotate(180deg);
    }
  }
}
</style>
<style lang="scss">
.layout-sidebar {
  .layout-menu {
    @include model(200px, 100%);
    border-right: 0;
    overflow-y: auto;
    &.el-menu--collapse {
      width: 64px;
      .el-menu-item,
      .el-sub-menu__title {
        > span {
          display: none;
        }
      }
    }
    .el-menu-item {
      position: active;
      &:hover {
        background-color: transparent;
        color: $primary-color;
      }
      &.is-active {
        &:before {
          content: '';
          width: 4px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          background-color: $primary-color;
        }
        background-color: $active-bg;
      }
    }
  }
}
</style>

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const Wrapper = () => import('@/views/Wrapper.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/layout/template'
  },
  /* 
    路由配置规则说明：
    1. 不能进行跳转的页面name设为空，方便面包屑跟踪过滤掉
    2. 菜单名称在meta中配置label值，hideMenu为true的路由不展示菜单
    3. 面包屑是通过$route.matched来匹配的，因此详情页路由需要配在上一个页面的子路由中
  */
  {
    path: '/layout',
    name: '',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: 'index',
        name: 'layoutIndex',
        meta: {label: '首页'},
        component: () => import('@/views/index.vue')
      },
      {
        path: 'flow-manage',
        name: '',
        meta: {label: '流程画布'},
        component: Wrapper,
        children: [
          {
            path: '',
            name: 'Flow',
            meta: {label: '对话流程'},
            component: () => import('@/views/flow-manage/Flow.vue'),
            children: [
              {
                path: 'detail',
                name: 'FlowDetail',
                meta: {label: '流程详情', hideMenu: true},
                component: () => import('@/views/flow-manage/FlowDetail.vue')
              },
            ]
          },
          {
            path: 'business-chart',
            name: 'businessChart',
            meta: {label: '业务画布'},
            component: () => import('@/views/businessChart/index.vue')
          }
        ]
      },
      {
        path: 'template',
        name: '',
        meta: {label: '模板管理'},
        component: Wrapper,
        children: [
          {
            path: '',
            name: 'proTable',
            meta: {label: 'proTable模板'},
            component: () => import('@/views/template/pro-table/index.vue'),
            children: [
              {
                path: 'detail',
                name: 'proTableDetail',
                meta: {label: 'protable详情', hideMenu: true},
                component: () => import('@/views/template/pro-table/detail.vue')
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
]

const router = createRouter({
  // history: createWebHashHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vite' : '/' ),
  history: createWebHashHistory(),
  routes
})

export default router
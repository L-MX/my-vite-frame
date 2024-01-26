# Vite + Vue 3 + TypeScript + Element-plus
Vite https://v3.vitejs.dev/
Vue3中文网 https://cn.vuejs.org/guide/introduction.html
Element-plus https://element-plus.org/zh-CN/#/zh-CN

# dependencies 与 devDependencies区别
1. dependencies项目依赖，在页面运行时需要的依赖，如vue、element-plus、axios、vue-router等
   安装命令：
   npm install 依赖名 --save
2. devDependencies 开发依赖，如vite、sass、babel、eslint等
   安装命令：
   npm install 依赖名 --save-d
   简写： 
   npm install 依赖名 -D

# 搭建步骤
1. 安装element-plus  
  命令：npm i element-plus --save

2. 安装自动导入插件，按需引入element-plus
  命令：npm i unplugin-auto-import unplugin-vue-components -D
  在vite.config.ts添加相应的配置


3. 安装scss并且配置scss预处理器能够全局引入【后面实现主题切换】
  vite有内置的sass配置信息，无需安装其他如sass-loader、node-sass等，直接安装sass即可
  命令：npm i sass -D
  在vite.config.ts添加相应的配置: 添加scss预处理，引入vars.scss、mixin.scss、theme.scss文件
  
4. 安装router并配置router.js
5. 安装axios并且配置
6. store [pinia]
7. hooks

8. 添加layout
9. 国际化



# 命令
前端代码启动命令：vite [直接在vscode启动]
mock接口启动命令：npm run mock [可另外开一个终端启动] 【如果启动失败，则将node版本改成v14的】


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('viteApp', { // 对应主应用中注册的name
      useDevMode: true
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    // importStyle: "sass"不添加、element-plus自定义主题修改不生效
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })]
    })
  ],
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    host: 'localhost',
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  },
  resolve: {
    // 配置别名
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') }
    ]
  },
  css: {
    // 添加css预处理器配置
    preprocessorOptions: {
      scss: {
        // additionalData的内容会在每个scss文件的开头自动注入，这样就可以全局使用scss了
        additionalData: '@use "@/styles/vars.scss" as *; @use "@/styles/mixin.scss" as *; @use "@/styles/theme.scss" as *;'
        // additionalData: '@import "@/styles/vars.scss"; @import "@/styles/mixin.scss";'
      }
    }
  }
})

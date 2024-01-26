import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'

const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification]
export function initElement(app: ReturnType<typeof createApp>) {
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}


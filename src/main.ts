import { createApp } from 'vue'
import { initElement } from './element'
import { initComponent } from '@/components/custom-ui'
import router from '@/router'
import i18n from '@/utils/i18n'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.scss'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
// import SkynetPandoraUI from 'skynet-pandora-ui'
// import 'skynet-pandora-ui/lib/style.css'


/* 配置qiankun */
let app: any = null
const pinia = createPinia()
function render(props: any = {}) {
  const { container } = props
  app = createApp(App)
  // 全局注册props
  app.config.globalProperties.$microProps = props

  initElement(app)   // 注册element
  initComponent(app) // 注册自定义组件
  // app.use(SkynetPandoraUI)
  app.use(router)
  app.use(pinia)
  app.use(i18n)
  // 注册所有elemement-icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app?.mount(container ? container.querySelector('#app') : '#app')
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行。。。');
  }
}
renderWithQiankun({
  mount(props: any) {
    render(props)
  },
  bootstrap() {},
  update() {},
  unmount(props: any) {
    console.log('unmount', props)
    app.unmount()
    app._container.innerHTML = ''
    app = null
  }
})
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}



// const app: ReturnType<typeof createApp> = createApp(App)
// initElement(app)
// initComponent(app)
// app
// .use(router)
// .use(pinia)
// .use(i18n)
// .mount('#app')

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

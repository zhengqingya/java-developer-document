import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
// store
import store from './stores'
app.config.globalProperties.$store = store

app.mount('#app')

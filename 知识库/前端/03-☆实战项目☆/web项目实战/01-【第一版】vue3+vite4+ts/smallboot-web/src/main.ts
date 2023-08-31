import { createApp, Directive } from 'vue'
import App from './App.vue'

const app = createApp(App)

// ****** ↓↓↓ 路由 ↓↓↓ ******
import router from '@/router'
app.use(router)

// ****** ↓↓↓ element-plus ↓↓↓ ******
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })

// 自定义样式
import '@/styles/index.scss'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

// store
import useStore from '@/store'
app.config.globalProperties.$store = useStore()

// 配置全局api
import api from '@/api'
app.config.globalProperties.$api = api

// 全局组件注册
import myComponent from '@/components/index'
Object.keys(myComponent).forEach((key) => {
  app.component(key, myComponent[key])
})

// 抽取公用的实例 - 操作成功与失败消息提醒内容等
import mixin from '@/utils/mixin'
app.mixin(mixin)

// 路由权限
import '@/permission'

// 自定义指令(按钮权限)
import * as directive from '@/directive'
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key])
})


app.mount('#app')

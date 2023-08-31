import App from './App'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import api from '@/api/index.js'
import store from '@/store'


// 全局组件引入，会导致微信小程序样式不生效... 
// import globalComponent from '@/components/index.js'


import mixin from '@/utils/mixin'

// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';


export function createApp() {
	const app = createSSRApp(App)

	// 配置全局api
	app.config.globalProperties.$api = api
	// store
	app.use(store)

	// 全局组件注册
	// Object.keys(globalComponent).forEach((key) => {
	// 	app.component(key, globalComponent[key])
	// })

	// 抽取公用的实例 - 操作成功与失败消息提醒内容等
	app.mixin(mixin)

	// 使用 uView UI
	app.use(uView)


	return {
		app
	}
}
// #endif
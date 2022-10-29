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

export function createApp() {
	const app = createSSRApp(App)
	
	// 配置全局api
	app.config.globalProperties.$api = api
	
	return {
		app
	}
}
// #endif

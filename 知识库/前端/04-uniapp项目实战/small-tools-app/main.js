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
import uviewPlus from '@/uni_modules/uview-plus'
import store from '@/store'

export function createApp() {
	const app = createSSRApp(App)

	// 配置全局api
	app.config.globalProperties.$api = api
	// uviewPlus
	app.use(uviewPlus)
	// store
	app.use(store)

	return {
		app
	}
}
// #endif

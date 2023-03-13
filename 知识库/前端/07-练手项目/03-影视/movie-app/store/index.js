import {
	createStore
} from 'vuex'
import getters from './getters'

// 拿到modules下的所有文件
const modulesFiles =
	import.meta.globEager('./modules/*.*')
const modules = {}
for (const key in modulesFiles) {
	const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
	const value = modulesFiles[key]
	if (value.default) {
		// 兼容js
		modules[moduleName] = value.default
	} else {
		// 兼容ts
		modules[moduleName] = value
	}
}

const store = createStore({
	modules,
	getters
})

export default store

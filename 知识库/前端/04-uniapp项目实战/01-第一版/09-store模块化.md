# store

### store模块化

#### 1、main.js

```
import {
	createSSRApp
} from 'vue'
import store from '@/store'

export function createApp() {
	const app = createSSRApp(App)
	// store
	app.use(store)
	return {
		app
	}
}
```

#### 2、store/index.js

```
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
```

#### 3、store/modules/test.js

```
const store = {
	namespaced: true,
	// 存放数据
	state: {
		username: 'zhengqingya',
		age: 18
	},
	getters: {
		getUsername(state) {
			return state.username
		}
	},
	// 同步变更数据
	mutations: {
		setUsername(state, username) {
			state.username = username
		}
	},
	// 和后台交互获取数据
	actions: {}
}
export default store
```

#### 4、store/getters.js

```
const getters = {
	username: state => state.test.username,
	age: state => state.test.age
}
export default getters
```

#### 5、页面使用

```
console.log(this.$store.getters.username)
console.log(this.$store.state.test.username)

// 修改数据...
this.$store.commit('test/setUsername', 'zhengqingya...')

console.log(this.$store.getters['test/getUsername'])
```
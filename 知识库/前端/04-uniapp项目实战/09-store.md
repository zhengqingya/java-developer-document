# store

### 简单体验

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

const store = createStore({
	state: {
		"username": "zhengqingya",
		"age": 18
	}
})

export default store
```

#### 3、页面使用

```
console.log(this.$store.state.username)
console.log(this.$store.state.age)
```
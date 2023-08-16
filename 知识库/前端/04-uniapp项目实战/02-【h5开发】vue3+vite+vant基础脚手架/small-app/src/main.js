import {
	createApp
} from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// 1. 引入你需要的组件
import {
	Button
} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
// 3. 注册你需要的组件
app.use(Button);


app.mount('#app')
# element-plus

- https://element-plus.org/zh-CN/guide/installation.html
- https://element-plus.org/zh-CN/guide/quickstart.html

### 1、安装依赖

```shell
npm install element-plus --save
npm install sass --save-dev
```

### 2、引入

main.js

```
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
```

### 3、简单使用

```
<el-button type="primary">Primary</el-button>
<el-button type="success">Success</el-button>
<el-button type="info">Info</el-button>
```


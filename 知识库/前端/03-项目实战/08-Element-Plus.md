> https://element-plus.gitee.io/zh-CN

### 安装

```shell
cnpm install element-plus --save
cnpm install @element-plus/icons-vue
```

### 配置

`main.ts`

```ts
// ****** ↓↓↓ element-plus ↓↓↓ ******
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

### Volar 支持

`tsconfig.json`中通过`compilerOptions.types`指定全局组件类型

```json
{
  "compilerOptions": {
    "types": [
      "element-plus/global"
    ]
  }
}
```

### demo

```
<template>
    <el-button link>按钮</el-button>
    <el-icon class="is-loading">
        <Loading />
    </el-icon>
    <div>
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="success" :icon="Check" circle />
        <el-button type="info" :icon="Message" circle />
        <el-button type="warning" :icon="Star" circle />
        <el-button type="danger" :icon="Delete" circle />
    </div>
</template>
 
<script lang="ts" setup>
import { Check, Delete, Edit, Message, Search, Star, } from '@element-plus/icons-vue'
</script>
```
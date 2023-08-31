# Element Plus

> https://element-plus.org/zh-CN/

### 一、安装

```shell
cnpm install element-plus --save
cnpm install @element-plus/icons-vue
```

### 二、配置

[src/main.js](../src/main.js)

```
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
```

### 三、测试

```
<template>
  <h1>hello</h1>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <el-icon :size="100" color="red">
    <Edit />
  </el-icon>
</template>
```
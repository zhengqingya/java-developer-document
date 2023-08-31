# Vue Router

> https://router.vuejs.org/zh

### 一、安装

```shell
cnpm install vue-router@4
```

### 二、入门配置

[src/router/index.js](../src/router/index.js)

```
import {createRouter, createWebHashHistory} from 'vue-router';

// 本地静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      isParentView: true,
    },
  },
  {
    path: '/test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    // path: '/404',
    path: '/:pathMatch(.*)*', // 防止浏览器刷新时路由未找到警告提示: vue-router.mjs:35 [Vue Router warn]: No match found for location with path "/xxx"
    component: () => import('@/views/error-page/404.vue'),
  },
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
```

[src/main.js](../src/main.js)

```
// 路由
import router from '@/router';
app.use(router);
```

[src/views/error-page/404.vue](../src/views/error-page/404.vue)

```
<template>
  <h1>404</h1>
</template>
```

[src/views/test/index.vue](../src/views/test/index.vue)

```
<template>
  <h1>hello</h1>
</template>
```

[src/App.vue](../src/App.vue)

```
<template>
  <h1>当前路由信息：{{ $route }}</h1>
  
  <!--使用 router-link 组件进行导航 -->
  <!--通过传递 `to` 来指定链接 -->
  <ol>
    <li><router-link to="/">Go to Home</router-link></li>
    <li><router-link to="/test">Go to Test</router-link></li>
  </ol>
  
  <hr />
  
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view/>
</template>
```

- js获取当前路由信息 `proxy.$route`
- js跳转 `proxy.$router.push({ path: '/' });`

访问 http://localhost:5173/#/test

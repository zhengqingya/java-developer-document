> https://router.vuejs.org/zh

### 安装

```shell
cnpm install vue-router@4
```

### 入门配置

`src/router/index.ts`

```ts
import {createRouter, createWebHashHistory} from 'vue-router';

// 静态路由
export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue')
    },
];

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
```

`src/main.ts`

```ts
// ****** ↓↓↓ 路由 ↓↓↓ ******
import router from '@/router';

const app = createApp(App);
app.use(router);
app.mount('#app')
```

`src/views/error-page/404.vue`

```vue

<template>
  <h1>404</h1>
</template>
```

`src/App.vue`

```vue

<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view/>
</template>
```

访问`http://ip:端口/#/404`
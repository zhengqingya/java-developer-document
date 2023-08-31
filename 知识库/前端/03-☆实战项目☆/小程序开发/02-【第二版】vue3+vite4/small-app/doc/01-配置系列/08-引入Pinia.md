# pinia持久化和模块化

- [Pinia](https://pinia.vuejs.org/zh/)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)

### 一、Pinia

状态管理库

#### 安装

> https://uniapp.dcloud.net.cn/tutorial/vue3-pinia.html

```shell
# 这里不要使用最新版，uniapp可能还不兼容还是怎么的，用低版本的
# cnpm i pinia
cnpm i pinia@2.0.36
```

### 二、pinia-plugin-persistedstate

适用于 Pinia 的持久化存储插件

```shell
cnpm i pinia-plugin-persistedstate
```

### 三、配置

- [main.js](../../src/main.js)
- [store](../../src/store/index.js)

#### `main.js`

```
import { createSSRApp } from 'vue';
import App from './App.vue';

import store from '@/store';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export function createApp() {
    const app = createSSRApp(App);

    const pinia = createPinia();
    pinia.use(
        createPersistedState({
            storage: localStorage,
            auto: true, // 启用所有Store默认持久化
        })
    );
    app.use(pinia);
    app.config.globalProperties.$store = store;

    return {
        app,
    };
}
```

#### `store/index.js`

store模块化

```
// 拿到modules下的所有文件
const modulesFiles = import.meta.globEager('./modules/*.*');
const modules = {};
for (const key in modulesFiles) {
    const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
    const value = modulesFiles[key];
    modules[moduleName] = value;
    // console.log(modules);
}

export default modules;
```

#### `store/modules/test.js`

```
import { defineStore } from 'pinia';

export const useTestStore = defineStore('test', () => {
    const count = ref(0);
    function increment() {
        count.value++;
    }
    return { count, increment };
});
```

#### 调用测试

```
<template>
    <text>{{ count }}</text>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const title = ref('hello');

proxy.$store.test.useCounterStore().increment();
const count = proxy.$store.test.useCounterStore().count;
</script>

<style lang="scss" scoped></style>
```

响应式可使用`toRefs` 或 `storeToRefs`

> 见 https://pinia.vuejs.org/zh/core-concepts/

```
let { isLogin, userObj } = toRefs(proxy.$store.user.useUserStore());
```

### 四、问题

#### 1、reactive

```
let userObj = reactive({});
```

`reactive` 无法修改 `localStorage` 中存储的值，使用`ref`才可以...

问题原因：vue3中reactive定义的引用类型直接赋值导致数据失去响应式（因为响应式的是它的属性，而不是它自身），我们可以通过修改对象的属性的形式，实现修改数据

eg:

```
let userObj = reactive({id:1});
userObj.id = 2
```

#### 2、$reset()

文档中提及到的重置store也无法使用 https://pinia.vuejs.org/zh/core-concepts/state.html#resetting-the-state

```
proxy.$store.user.useUserStore().$reset();
```

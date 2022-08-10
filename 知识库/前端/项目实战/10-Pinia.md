> https://pinia.vuejs.org

### 安装

```shell
cnpm install pinia --save
```

### 配置

`main.ts`

```ts
const app = createApp(App)

// pinia
import { createPinia } from 'pinia';
const pinia = createPinia()
app.use(pinia)

// store
import useStore from "@/store";
app.config.globalProperties.$store = useStore();

app.mount('#app')
```

### 使用

`src/store/index.ts`

```ts
import useAppStore from './modules/app';

const useStore = () => ({
    app: useAppStore()
});

export default useStore;
```

`src/store/modules/app.ts`

```ts
import { AppState } from '@/types/store/app';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        name: localStorage.get('name') || 'Small Tools',
    }),
    actions: {
        setName(name: string) {
            this.name = name;
            localStorage.set('name', name);
        }
    }
});

export default useAppStore;
```

`src/utils/storage.ts`

```ts
/**
 * window.localStorage => 浏览器永久存储，用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
 */
export const localStorage = {
    set(key: string, val: any) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    get(key: string) {
        const json: any = window.localStorage.getItem(key);
        return JSON.parse(json);
    },
    remove(key: string) {
        window.localStorage.removeItem(key);
    },
    clear() {
        window.localStorage.clear();
    },
};

/**
 * window.sessionStorage => 浏览器本地存储，数据保存在当前会话中，在关闭窗口或标签页之后将会删除这些数据。
 */
export const sessionStorage = {
    set(key: string, val: any) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    },
    get(key: string) {
        const json: any = window.sessionStorage.getItem(key);
        return JSON.parse(json);
    },
    remove(key: string) {
        window.sessionStorage.removeItem(key);
    },
    clear() {
        window.sessionStorage.clear();
    },
};
```

页面引用

```
<template>
    <p>store: {{ name }}</p>
    <p>store: {{ app.name }}</p>
    <p>store: {{ $store.app.name }}</p>
    <el-button @click="changeStore('666')">change store</el-button>
</template>
 
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useStore from "@/store";

const { app } = useStore()
// const name = ref(app.name)
// 响应式
const { name: name } = storeToRefs(app)

function changeStore(value: string) {
    app.setName(value)
}
</script>
```
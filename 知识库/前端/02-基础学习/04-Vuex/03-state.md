state -> 存放数据

`my-vuex/src/store/index.js`

```js
import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
});

export default store;
```

`my-vuex/src/main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 将 store 实例作为插件安装
app.use(store);

app.mount("#app");
```

`my-vuex/src/views/components/HelloWorld.vue`

```vue
<template>
  <h1>{{ $store.state.count }}</h1>
  <!-- 不建议这样操作数据 -->
  <!-- <button @click="$store.state.count++">click</button> -->
</template>
```
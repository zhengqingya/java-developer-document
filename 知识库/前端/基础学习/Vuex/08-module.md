将 store 分割成模块（module）。
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

`my-vuex/src/store/user/index.js`

```js
const user = {
    state: () => ({
        name: "小郑",
    }),
    getters: {
        // rootState: 根节点状态
        getName(state, getters, rootState) {
            console.log(getters);
            console.log(rootState);
            return state.name + "666";
        },
    },
};

export default user;
```

`my-vuex/src/store/index.js`

```js
import { createStore } from "vuex";
import user from "./user";

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    a: user,
  },
  // 存放数据
  state() {
    return {
      count: 0,
      msg: "hello",
    };
  },
  // 可以认为是 store 的计算属性
  getters: {
    reverMsg(state) {
      return state.msg.split("").reverse().join("");
    },
    // 第二个参数可以拿到getters中的函数
    reverMsgLength(state, getters) {
      return getters.reverMsg.length;
    },
  },
  // 同步变更数据
  mutations: {
    increment(state, value) {
      if (value) {
        console.log(value);
        state.count += value;
      } else {
        state.count++;
      }
    },
    updateMsg(state, value) {
      state.msg = value;
    },
  },
  // 和后台交互获取数据
  actions: {
    // context: 一个与store实例具有相同方法和属性的对象
    getData(context, params) {
      console.log(context);
      console.log(params);
      fetch("http://localhost/web/api/demo/test/time")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          context.commit("updateMsg", res.data);
        });
    },
  },
});

export default store;
```

`my-vuex/src/views/components/HelloWorld.vue`

```vue
<template>
  <h1>{{ $store.state.count }}</h1>
  <button @click="increment">click</button>
  <button @click="increment2(5)">add 5</button>

  <h1>{{ $store.getters.reverMsg }}</h1>
  <h1>{{ $store.getters.reverMsgLength }}</h1>

  <button @click="getData">getData</button>

  <hr />

  <h1>{{ $store.getters.getName }}</h1>
  <h1>{{ $store.state.a.name }}</h1>
</template>
<script>
export default {
  methods: {
    increment() {
      // 提交一个变更
      this.$store.commit("increment");
    },
    increment2(num) {
      // 传值
      this.$store.commit("increment", num);
    },
    getData() {
      this.$store.dispatch("getData", "666");
    },
  },
};
</script>
```

### 命名空间 `namespaced: true`

`my-vuex/src/store/user/index.js`

```js
const user = {
  namespaced: true,
  state: () => ({
    name: "小郑",
  }),
  getters: {
    // rootState: 根节点状态
    getName(state, getters, rootState) {
      console.log(rootState);
      console.log(getters);
      return state.name + "666";
    },
  },
};

export default user;
```

`my-vuex/src/views/components/HelloWorld.vue`

```vue
<!-- <h1>{{ $store.getters.getName }}</h1> -->
<h1>{{ $store.getters["a/getName"] }}</h1>
```
`my-vuex/src/store/index.js`

```js
import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
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
    mutations: {
        increment(state, value) {
            if (value) {
                console.log(value);
                state.count += value;
            } else {
                state.count++;
            }
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
  },
};
</script>
```
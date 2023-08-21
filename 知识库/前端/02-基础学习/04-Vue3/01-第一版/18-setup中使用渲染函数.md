```vue
<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  components: { HelloWorld },
  methods: {
    handleMyEvent(e) {
      console.log(e);
    },
  },
  mounted() {
    console.log(this.$refs.hello);
    // 父组件中调用子组件方法
    this.$refs.hello.sendParent();
  },
};
</script>
<template>
  <HelloWorld ref="hello" @myEvent="handleMyEvent" />
</template>
```

```vue
<script>
import { ref, h } from "vue";
export default {
  props: {
    msg: {
      type: String,
      default: "你好",
    },
  },
  setup(props, context) {
    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);
    const num = ref(100);
    function sendParent() {
      context.emit("myEvent", num.value);
    }

    // 暴露公共 property (函数)
    console.log(context.expose);
    context.expose({ sendParent, num });
    // 返回一个渲染函数，会替代组件内容
    return () => h("div", num.value);
  },
};
</script>
<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="sendParent">sendParent</button>
  </div>
</template>
```
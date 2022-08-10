```vue
<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  components: { HelloWorld },
  data() {
    return {
      msg: "hello",
    };
  },
  methods: {
    handleMyEvent(e) {
      console.log(e);
    },
  },
};
</script>
<template>
  <HelloWorld id="hello" class="hi" :msg="msg" @myEvent="handleMyEvent" />
</template>
```

```vue
<script>
import { ref, toRefs, onUpdated } from "vue";
export default {
  props: {
    msg: {
      type: String,
      default: "你好",
    },
  },
  setup(props, context) {
    console.log(context);
    // Attribute (非响应式对象，等同于 $attrs) -- 即拿到父组件中的属性
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    // console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);
    const num = ref(1);
    function sendParent() {
      context.emit("myEvent", num.value);
    }

    // 暴露公共 property (函数)
    // console.log(context.expose);
    return { sendParent };
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


App.vue

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
};
</script>
<template>
  <HelloWorld :msg="msg" />
</template>
```

HelloWorld.vue

```vue
<script>
export default {
  props: {
    msg: {
      type: String,
      default: "你好",
    },
  },
  setup(props) {
    console.log(props.msg);
  },
};
</script>
<template>
  <p>{{ msg }}</p>
</template>
```

### 响应式

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
};
</script>
<template>
  <HelloWorld :msg="msg" />
  <button @click="msg = '666'">change</button>
</template>
```

```vue
<script>
import { toRefs, onUpdated } from "vue";
export default {
  props: {
    msg: {
      type: String,
      default: "你好",
    },
  },
  setup(props) {
    console.log(props.msg);
    const { msg } = toRefs(props);
    console.log(msg.value);
    onUpdated(() => {
      console.log(msg.value);
    });
  },
};
</script>
<template>
  <p>{{ msg }}</p>
</template>
```
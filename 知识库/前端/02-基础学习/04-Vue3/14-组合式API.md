### setup

```vue
<script>
import { ref, reactive, toRefs } from "vue";
export default {
  setup() {
    // ref: 定义响应式变量
    const counter = ref(0);
    function changeCounter() {
      counter.value++;
    }

    // reactive: 定义响应式引用类型的数据
    const userObj = reactive({
      name: "小郑",
      age: 18,
    });
    function changeUser() {
      userObj.name = "大郑";
      userObj.age = 19;
    }

    // toRefs: 使解构后的数据重新获取响应式
    let { age } = toRefs(userObj);
    return {
      counter,
      changeCounter,
      userObj,
      changeUser,
      ...userObj, // tips: 通过ES6扩展运算符进行解构使得对象中的属性不是响应式的
      age,
      // ...toRefs(userObj),
    };
  },
};
</script>
<template>
  <button @click="changeCounter">change {{ counter }}</button>
  <hr />
  <button @click="changeUser">change {{ userObj }}</button>
  <p>{{ userObj.name }}</p>
  <p>...userObj解构 -- {{ name }}</p>
  <hr />

  <p>...userObj解构 -- {{ age }}</p>
</template>
```

### watch

```vue
<script>
import { ref, reactive, toRefs, watch, watchEffect } from "vue";
export default {
  setup() {
    // ref: 定义响应式变量
    const counter = ref(0);
    function changeCounter() {
      counter.value++;
    }
    // watch(侦听的响应式引用,回调函数)
    watch(counter, (newValue, oldValue) => {
      console.log("newValue: ", newValue);
      console.log("oldValue: ", oldValue);
    });

    // reactive: 定义响应式引用类型的数据
    const userObj = reactive({
      name: "小郑",
      age: 18,
    });
    function changeUser() {
      userObj.name = "大郑";
      userObj.age = 19;
    }
    // watch(侦听的响应式引用,回调函数) -- tips:侦听对象时，侦听不到里面属性的变化
    watch(userObj, (newValue, oldValue) => {
      console.log("newValue: ", newValue);
      console.log("oldValue: ", oldValue);
    });
    watch([counter, userObj], (newValue, oldValue) => {
      console.log("--- newValue: ", newValue);
      console.log("--- oldValue: ", oldValue);
    });
    // watchEffect(回调函数)    tips: 组件初始化时会执行一次，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
    watchEffect(() => {
      console.log(userObj.name);
      // console.log(counter.value);
    });

    return {
      counter,
      changeCounter,
      userObj,
      changeUser,
    };
  },
};
</script>
<template>
  <button @click="changeCounter">change {{ counter }}</button>
  <hr />
  <button @click="changeUser">change {{ userObj }}</button>
</template>
```

### computed

```vue
<script>
import { ref, reactive, computed } from "vue";
export default {
  setup() {
    const msg = ref("hello");
    const reverseMsg = computed(() => {
      return msg.value.split("").reverse().join("");
    });
    console.log("reverseMsg: ", reverseMsg.value);

    const userObj = reactive({
      name: "小郑",
      age: 18,
      msg: computed(() => {
        return msg.value.split("").reverse().join("");
      }),
    });
    console.log("userObj: ", userObj.msg);
    return {
      msg,
    };
  },
};
</script>
<template>
  <p>{{ msg }}</p>
</template>
```
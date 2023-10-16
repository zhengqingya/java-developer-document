# 响应式API

> https://cn.vuejs.org/api/reactivity-core.html

```
<template>
  <h3>{{ count }}</h3>
  <h3>{{ data }}</h3>
  <hr />
  <h3>{{ getStr }}</h3>
  <h3>{{ getStr2 }}</h3>
  <input type="text" v-model="getStr2" />
  <hr />
  <h3>{{ name }}</h3>
  <button @click="changeData">修改</button>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect, toRefs } from "vue";

// ref：定义基本数据类型的响应式数据
const count = ref(0);

// reactive：定义“数组/对象/map”复杂数据类型的深层响应式数据，shallowReactive：浅层响应式（只保留对这个对象顶层次访问的响应性）
const data = reactive({
  name: "小王",
  age: 18,
  girlfriends: [{ name: "小张" }],
});

// toRefs：解构响应式，没有的话，无法修改name值，修改的时候使用 name.value 修改
const { name } = toRefs(
  reactive({
    name: "小郑",
  })
);

// computed：计算属性
const str = ref("hello");
const getStr = computed(() => {
  console.log("计算属性执行了...");
  return str.value;
});
// 如果要修改计算属性值，上面的方式会报错 Write operation failed: computed value is readonly
// 使用下面的方式
const getStr2 = computed({
  get() {
    console.log("计算属性执行了...");
    return str.value;
  },
  set(val) {
    str.value = val;
  },
});

// watch：监听器
watch(
  count, // ref
  // () => geoObj.value.lng, // ref 对象中的某一个属性值
  // data, // reactive
  // () => data.age, // reactive 对象中的某一个属性值
  // [count, data], // 监听多个数据
  // () => props.list, // 监听defineProps中的数据
  // () => proxy.$router.currentRoute.value, // 监听路由变化
  (newValue, oldValue) => {
    console.log("监听器执行了... ", newValue, oldValue);
  },
  {
    immediate: true, // 初始化执行一次
    // deep: true, // 深度监听 -- eg: 监听数组里面的数据变更
  }
);

// watchEffect：副作用函数，里面涉及到的属性有变更就会被触发执行
watchEffect(() => {
  console.log("watchEffect执行了... ", data.age);
});

function changeData() {
  count.value++;

  data.age++;
  data.girlfriends = [{ name: "小甜" }, { name: "小李" }];
  data.girlfriends.push({ name: "哈基米" });

  name.value = "小郑变了";

  str.value += "1";
}
</script>

<style scoped></style>
```

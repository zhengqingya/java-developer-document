<template>
  <h3>{{ count }}</h3>
  <h3>{{ data }}</h3>
  <hr />
  <h3>{{ getStr }}</h3>
  <h3>{{ getStr }}</h3>
  <button @click="changeData">修改</button>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from "vue";

// ref：定义基本数据类型的响应式数据
const count = ref(0);

// reactive：定义“数组/对象/map”复杂数据类型的深层响应式数据，shallowReactive：浅层响应式（只保留对这个对象顶层次访问的响应性）
const data = reactive({
  name: "小王",
  age: 18,
  girlfriends: [{ name: "小张" }],
});

// computed：计算属性
const str = ref("hello");
const getStr = computed(() => {
  console.log("计算属性执行了...");
  return str.value;
});

// watch：监听器
watch(
  count, // ref
  // data, // reactive
  // () => data.age, // reactive 对象中的某一个属性值
  (newValue, oldValue) => {
    console.log("监听器执行了... ", newValue, oldValue);
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

  str.value += "1";
}
</script>

<style scoped></style>

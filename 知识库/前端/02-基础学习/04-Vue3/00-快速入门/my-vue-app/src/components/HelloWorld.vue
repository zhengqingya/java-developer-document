<template>
  <h3>count:{{ count }}</h3>
  <h3>{{ data }}</h3>
  <button @click="changeData">修改</button>
</template>

<script setup>
// import { ref, reactive } from "vue";

// ref：定义基本数据类型的响应式数据
const count = ref(0);

// reactive：定义“数组/对象/map”复杂数据类型的深层响应式数据，shallowReactive：浅层响应式（只保留对这个对象顶层次访问的响应性）
const data = reactive({
  name: "小王",
  age: 18,
  dogs: [{ name: "旺财" }],
});

function changeData() {
  count.value++;

  data.age++;
  data.dogs.push({ name: "哈基米" });
}
</script>

<style scoped></style>

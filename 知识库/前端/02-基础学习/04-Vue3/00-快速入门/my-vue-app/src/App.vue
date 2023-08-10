<template>
  <HelloWorld ref="helloRef" />
  <button @click="handleClick">click</button>
  <br />
  <button @click="$refs.helloRef.changeData()">调用子组件方法</button>
</template>

<script setup>
const { proxy } = getCurrentInstance();
import HelloWorld from "./components/HelloWorld.vue";

function handleClick() {
  proxy.$refs.helloRef.changeData();
}
</script>

<style scoped></style>

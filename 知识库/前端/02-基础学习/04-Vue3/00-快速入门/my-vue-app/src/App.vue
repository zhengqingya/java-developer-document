<template>
  <h3>父组件:{{ data }}</h3>
  <HelloWorld ref="helloRef" v-model="data" />
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
const data = ref(0);
</script>

<style scoped></style>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/Home.vue";
import store from "./store";
import { provide, ref } from "vue";

const name = "hi";

const num = ref(0);
function changeNum() {
  num.value++;
}

provide("store", store);
</script>
<template>
  <p>{{ name }}</p>
  <p>{{ num }}</p>
  <button @click="changeNum">change</button>
  <HelloWorld />
  <Home />
</template>

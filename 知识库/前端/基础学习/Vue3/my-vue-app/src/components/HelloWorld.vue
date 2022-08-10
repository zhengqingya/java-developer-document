<template>
  <p>{{ store.state.msg }}</p>
  <button @click="changeMsg">change</button>
</template>
<script setup>
import { inject } from "vue";
const store = inject("store");
function changeMsg() {
  store.updateMsg();
}
</script>

<template>
  <div>user {{ $route.params.name }}</div>
  <button @click="$router.go(-1)">back</button>
  <button @click="$router.back()">后退一步</button>
</template>
<!-- 组合式API -->
<script setup>
import { useRoute } from "vue-router";
// console.log(useRoute().params.id);
// console.log(useRoute().params.name);
// console.log(useRoute().query.name);

const props = defineProps({
  id: String,
});
console.log(props);
console.log(props.id);
</script>

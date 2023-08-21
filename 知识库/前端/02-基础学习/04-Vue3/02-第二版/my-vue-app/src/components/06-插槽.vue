<template>
  <h3>hello</h3>
  <slot name="left"></slot>
  <br />
  <slot name="right"></slot>
  <div v-for="item in list" :key="item.id">
    <slot :data="item"></slot>
  </div>
  <slot name="dynamic"></slot>
</template>
<script setup>
let list = ref([
  { id: 1, name: "小张" },
  { id: 2, name: "小李" },
]);
</script>
<style scoped></style>

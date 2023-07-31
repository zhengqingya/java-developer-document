<template>
  <HelloWorld>
    <template v-slot:left>具名插槽-left</template>
    <template #right>具名插槽-right</template>
  </HelloWorld>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<style scoped></style>

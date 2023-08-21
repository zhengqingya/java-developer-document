# Teleport

> https://cn.vuejs.org/guide/built-ins/teleport.html

可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

```
<template>
  <div class="body"></div>

  <button @click="open = true">Open Modal</button>

  <Teleport to=".body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
<script setup>
let open = ref(false);
</script>
<style scoped>
.body {
  width: 200px;
  height: 200px;
  background-color: #0ee757;
}

.modal {
  background-color: #1789ca;
}
</style>
```
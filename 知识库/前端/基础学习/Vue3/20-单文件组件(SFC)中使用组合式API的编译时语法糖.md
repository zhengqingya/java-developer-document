Vue 单文件组件（又名 *.vue 文件，缩写为 SFC）是一种特殊的文件格式，它允许将 Vue 组件的模板、逻辑 与 样式封装在单个文件中

```vue
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";

const name = "hi";

const num = ref(0);
function changeNum() {
  num.value++;
}
</script>
<template>
  <p>{{ name }}</p>
  <p>{{ num }}</p>
  <button @click="changeNum">change</button>
  <HelloWorld />
</template>
```

```vue
<template>
  <p>hello</p>
</template>
```
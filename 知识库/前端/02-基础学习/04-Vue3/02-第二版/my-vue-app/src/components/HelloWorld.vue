<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in tabList" :key="index" @click="change(index)">
        {{ item.name }}
      </li>
    </ul>
    <component :is="currentComponent.com"></component>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import A from "./A.vue";
import B from "./B.vue";
let tabList = reactive([
  { name: "显示组件A", com: markRaw(A) },
  { name: "显示组件B", com: markRaw(B) },
]);

let currentComponent = reactive({
  com: A,
});

const change = (index) => {
  currentComponent.com = tabList[index].com;
};
</script>

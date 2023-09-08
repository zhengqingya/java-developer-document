<template>
  <div
    class="text-center m-a w-200 h-200 text-100px lh-200px color-red"
    bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    text="lg white"
    font="mono light"
    p="y-2 x-4"
    border="2 rounded blue-200">
    hello world
  </div>
</template>

<script setup>
import { getCurrentInstance, toRefs } from 'vue';
const { proxy } = getCurrentInstance();
let useUserStore = proxy.$store.user.useUserStore();
let { login } = useUserStore;
let { userObj } = toRefs(useUserStore);
</script>
<style lang="scss" scoped>
.app {
}
</style>

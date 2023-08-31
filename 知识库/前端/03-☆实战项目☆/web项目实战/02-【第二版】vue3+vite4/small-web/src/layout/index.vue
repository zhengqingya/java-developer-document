<template>
  <!-- <h1>{{ route.meta }}</h1> -->
  <div v-if="!$route.meta.isParentView" class="flex h100">
    <!-- 侧边栏菜单 -->
    <sidebar class="w-200" />
    <div class="flex-1 h100">
      <!-- 顶部导航栏 -->
      <navbar class="h-50" />
      <!-- 主页面 -->
      <app-main class="app-main m-t-5" />
    </div>
  </div>
  <div v-if="!isLogin || (isLogin && $route.meta.isParentView)" class="h100">
    <router-view />
  </div>
</template>

<script setup>
import sidebar from './components/sidebar.vue';
import navbar from './components/navbar.vue';
import appMain from './components/app-main.vue';
const { proxy } = getCurrentInstance();
let { isLogin } = toRefs(proxy.$store.user.useUserStore());
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 50px); // 满屏 - navbar
}
</style>

<template>
  <!-- <h1>{{ route.meta }}</h1> -->
  <div v-show="isLogin && !$route.meta.isParentView" class="flex h-full w-full">
    <!-- 侧边栏菜单 -->
    <sidebar v-if="isShowMenu" id="sidebar" class="w-200" />
    <div class="flex-1">
      <div id="top">
        <!-- 顶部导航栏 -->
        <navbar style="height: 50px" />
        <!-- Tabs标签页 -->
        <div :style="{ width: appMainWidth + 'px' }">
          <tabs-view />
        </div>
      </div>
      <!-- 主页面 -->
      <div :style="{ height: appMainHeight + 'px', width: appMainWidth + 'px' }">
        <app-main class="app-main" />
      </div>
    </div>
  </div>
  <div v-if="!isLogin || (isLogin && $route.meta.isParentView)" class="h-full">
    <router-view />
  </div>
</template>

<script setup>
import sidebar from './components/sidebar.vue';
import navbar from './components/navbar.vue';
import appMain from './components/app-main.vue';
import tabsView from './components/tabs-view.vue';
const { proxy } = getCurrentInstance();
let { isLogin } = toRefs(proxy.$store.user.useUserStore());
let { isShowMenu } = toRefs(proxy.$store.settings.useSettingsStore());
let appMainWidth = ref(0);
let appMainHeight = ref(0);

onMounted(() => {
  // 窗口宽高变化时触发 -- tips：window.onresize只能在项目内触发1次
  window.onresize = function windowResize() {
    calWidthAndHeight();
  };
});

// 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。
onUpdated(() => {
  calWidthAndHeight();
});

watch(
  [isLogin, isShowMenu],
  (newValue) => {
    calWidthAndHeight();
  },
  { immediate: false, deep: true },
);

function calWidthAndHeight() {
  let sidebar = document.getElementById('sidebar');
  let sidebarW = sidebar ? sidebar.offsetWidth : 0;
  appMainWidth.value = window.innerWidth - sidebarW;

  let top = document.getElementById('top');
  let topH = top ? top.offsetHeight : 0;
  appMainHeight.value = window.innerHeight - topH;
}
</script>
<style lang="scss" scoped>
.app-main {
  // height: calc(100vh - 50px); // 满屏 - navbar
}
</style>

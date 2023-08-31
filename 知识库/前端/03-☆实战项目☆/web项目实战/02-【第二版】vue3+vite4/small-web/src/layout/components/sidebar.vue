<template>
  <el-menu v-if="proxy.$store.settings.useSettingsStore().isShowMenu" router :default-active="$route.meta.fullPath" :collapse="false" :unique-opened="false">
    <el-scrollbar>
      <sidebarItem :router-list="routerList" />
    </el-scrollbar>
  </el-menu>
</template>

<script setup>
import sidebarItem from './sidebarItem.vue';
import { getCurrentInstance, toRefs } from 'vue';
const { proxy } = getCurrentInstance();
let { routerList } = toRefs(proxy.$store.user.useUserStore());

/**
 * 选中时触发  @select="handleSelect" => router 以 index 作为 path 进行路由跳转
 * @param index 选中菜单项的 index  eg: /system/role
 * @param indexPath 选中菜单项的 index path eg: ['/system', '/system/role']
 * @param item 选中菜单项
 * @param routeResult vue-router 的返回值（如果 router 为 true）
 */
// function handleSelect(index, indexPath, item, routeResult) {
// console.log(index, indexPath, item, routeResult);
// proxy.$router.push(index);
// }
</script>

<style lang="scss" scoped>
.el-menu {
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.2);
}
</style>

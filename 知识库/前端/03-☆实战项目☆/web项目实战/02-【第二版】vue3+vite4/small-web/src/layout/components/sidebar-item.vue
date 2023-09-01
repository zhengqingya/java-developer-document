<template>
  <div v-for="item in routerList" :key="item.path">
    <!-- 一级菜单 -->
    <el-menu-item v-if="(item.meta.isShow && item.children.length === 0) || (item.children && item.children.length === 1 && !item.children[0].meta.isShow)" :index="item.meta.fullPath">
      <el-icon v-if="item.meta && item.meta.icon"><component :is="item.meta.icon" /></el-icon>
      <div v-else class="w-30"></div>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
    <!-- 二级菜单 -->
    <div v-else>
      <el-sub-menu v-if="item.meta.isShow" :index="item.meta.fullPath">
        <template #title>
          <el-icon v-if="item.meta && item.meta.icon"><component :is="item.meta.icon" /></el-icon>
          <div v-else class="w-30"></div>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <sidebarItem :router-list="item.children" />
      </el-sub-menu>
    </div>
  </div>
</template>
<script setup>
defineProps({
  routerList: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped></style>

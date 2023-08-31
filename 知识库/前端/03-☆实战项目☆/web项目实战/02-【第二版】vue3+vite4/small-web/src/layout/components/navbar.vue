<template>
  <!-- {{ route.meta }} -->
  <div class="app flex-between-center p-x-10">
    <div class="flex-center-center">
      <div class="m-r-10" style="cursor: pointer" @click="proxy.$store.settings.useSettingsStore().update">
        <el-icon :size="22">
          <component :is="proxy.$store.settings.useSettingsStore().isShowMenu ? 'Fold' : 'Expand'" />
        </el-icon>
      </div>

      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in route.meta.breadcrumbItemList" :key="item">
          <span class="text-color-grey">{{ item }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <wx-mp-account />

    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <div class="flex-center-center">
        <el-avatar class="" :size="32" :src="userObj.avatarUrl" />
        <div class="flex-center-center">
          <span class="m-l-5"> {{ userObj.nickname }} </span>
          <el-icon :size="20" class="w-20">
            <ArrowDown />
          </el-icon>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link to="/system/personal-center">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/zhengqingya">
            <el-dropdown-item>Gitee</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import { ArrowRight } from '@element-plus/icons-vue';
import { getCurrentInstance, toRefs } from 'vue';
const { proxy } = getCurrentInstance();

let useUserStore = proxy.$store.user.useUserStore();
let { logout } = useUserStore;
let { userObj } = toRefs(useUserStore);
</script>
<style lang="scss" scoped>
.app {
  // -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>

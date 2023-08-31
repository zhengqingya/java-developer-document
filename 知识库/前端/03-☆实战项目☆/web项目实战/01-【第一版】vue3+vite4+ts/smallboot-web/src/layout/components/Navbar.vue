<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <wx-mp-account />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div>
          <el-avatar :src="avatarUrl" />
          <div class="user-info">
            <span>{{ nickname }}</span>
            <CaretBottom style="width: 0.6em; height: 0.6em; margin-left: 5px" />
          </div>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <!-- <router-link to="/system/personal-center">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link> -->
            <a target="_blank" href="https://gitee.com/zhengqingya">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"> 退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

import useStore from '@/store'

// 组件依赖
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import WxMpAccount from '@/components/WxMpAccount/index.vue'

const { app, user, tagsView } = useStore()

const route = useRoute()
const router = useRouter()

const sidebar = computed(() => app.sidebar)
const avatarUrl = computed(() => user.avatarUrl)
const nickname = computed(() => user.nickname)

function toggleSideBar() {
  app.toggleSidebar()
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    user
      .logout()
      .then(() => {
        tagsView.delAllViews()
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`)
      })
  })
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: $dark_main_color;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 60px;

      .user-info {
        cursor: pointer;
        position: absolute;
        right: -50px;
        top: 15px;
        font-size: 18px;
      }
    }
  }
}
</style>

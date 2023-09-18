<template>
  <base-wrapper class="bg-color-primary flex-center-center">
    <div class="flex-c-center-center bg-color-white b-rd-10" style="height: 400px; width: 500px">
      <h1 class="font-size-lg">SmallBoot</h1>
      <div class="m-t-20">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="User" placeholder="请输入账号" maxlength="30" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="Lock" placeholder="请输入密码" show-password maxlength="30" />
          </el-form-item>
        </el-form>
        <div class="tips">
          <span>用户名: admin</span>
          <span class="m-l-20"> 密码: 123456</span>
        </div>
        <el-button type="primary" class="m-t-10 w-full" @click="handleLogin">登 录</el-button>
      </div>
    </div>
    <div class="copyright">
      <p>IF I WERE YOU</p>
    </div>
  </base-wrapper>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
// 组件实例
const { proxy } = getCurrentInstance();
const { login } = proxy.$store.user.useUserStore();
const loginForm = $ref({});

const loginRules = {
  username: [{ required: true, trigger: 'change', message: '请输入账号' }],
  password: [{ required: true, trigger: 'change', validator: validatePassword }],
};

function validatePassword(rule, value, callback) {
  if (!value || value.length < 6) {
    callback(new Error('密码最少6位'));
  } else {
    callback();
  }
}

function handleLogin() {
  proxy.$refs.loginFormRef.validate((valid) => {
    if (valid) {
      login(loginForm).then(() => {
        let fullPath = proxy.$route.fullPath;
        if (fullPath.startsWith('/login?redirect=')) {
          let lastPath = fullPath.replace('/login?redirect=', '');
          // 跳转到上次退出的页面
          proxy.$router.push({ path: lastPath });
        } else {
          // 跳转到首页
          proxy.$router.push({ path: '/' });
        }
      });
    }
  });
}
</script>

<style lang="scss" scoped>
.copyright {
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 12px;
  text-align: center;
  color: #ccc;
}
</style>

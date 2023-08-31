# axios和api封装

> axios中文文档 http://www.axios-js.com/zh-cn/docs

### 一、安装

```shell
cnpm install axios
```

### 二、axios工具封装

[src/utils/request.js](../src/utils/request.js)

```
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import store from '@/store';
import { localStorage } from '@/utils/storage';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000, // 请求超时时间：50s
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }

    const { isLogin, tokenObj } = toRefs(store.user.useUserStore());

    if (isLogin.value) {
      // 授权认证
      config.headers[tokenObj.value.tokenName] = tokenObj.value.tokenValue;
      // 租户ID
      config.headers['TENANT_ID'] = '1';
      // 微信公众号appId
      config.headers['appId'] = localStorage.get('appId');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { code, msg } = res;
    if (code === 200) {
      return res;
    } else {
      // token过期
      if (code === -1) {
        handleError();
      } else {
        ElMessage({
          message: msg || '系统出错',
          type: 'error',
          duration: 5 * 1000,
        });
      }
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  (error) => {
    console.log('请求异常：', error);
    const { msg } = error.response.data;
    // 未认证
    if (error.response.status === 401) {
      handleError();
    } else {
      ElMessage({
        message: '网络异常，请稍后再试!',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
);

// 统一处理请求响应异常
function handleError() {
  const { isLogin, logout } = store.user.useUserStore();
  if (isLogin) {
    ElMessageBox.confirm('您的登录账号已失效，请重新登录', {
      confirmButtonText: '再次登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      logout();
    });
  }
}

// 导出实例
export default service;
```

### 三、api封装

[src/api/index.js](../src/api/index.js)

```
// 拿到所有api
const modulesFiles = import.meta.globEager('./*/*.*');
const modules = {};
for (const key in modulesFiles) {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const value = modulesFiles[key];
  if (value.default) {
    // 兼容js
    modules[moduleName] = value.default;
  } else {
    // 兼容ts
    modules[moduleName] = value;
  }
}
// console.log(666, modules);
export default modules;
```

[src/main.js](../src/main.js)

```
// 配置全局api
import api from '@/api'
app.config.globalProperties.$api = api
```

### 四、测试

[src/api/test/demo.js](../src/api/test/demo.js)

```
import request from '@/utils/request';

export default {
  time() {
    return request({
      url: '/api/test/time',
      method: 'get',
    });
  },
};
```

页面

```
<template>
  <button @click="handleClick">click</button>
  <h1>{{ res }}</h1>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
let res = $ref(null);

async function handleClick() {
  res = await proxy.$api.demo.time();
}
</script>
```
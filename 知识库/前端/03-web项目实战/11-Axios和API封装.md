> http://www.axios-js.com/zh-cn/docs

### 安装

```shell
cnpm install axios --save
```

### axios工具封装

`src/utils/request.ts`

```ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';


// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 请求超时时间：50s
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});


// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const { user } = useStore();
    if (user.token) {
      // 授权认证
      config.headers.Authorization = user.token;
    }
    // 租户ID
    config.headers['TENANT_ID'] = '1'
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    const { code, msg } = res;
    if (code === 200) {
      return res;
    } else {
      // token过期
      if (code === -1) {
        ElMessageBox.confirm("您的登录账号已失效，请重新登录", {
          confirmButtonText: "再次登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          // 清除浏览器全部缓存
          localStorage.clear();
          // 跳转登录页
          window.location.href = '/';
          location.reload();
        });
      } else {
        ElMessage({
          message: msg || '系统出错',
          type: 'error',
          duration: 5 * 1000
        });
      }
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  (error) => {
    const { msg } = error.response.data;
    // 未认证
    if (error.response.status === 401) {
      ElMessageBox.confirm("您的登录账号已失效，请重新登录", {
        confirmButtonText: "再次登录",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 清除浏览器全部缓存
        localStorage.clear();
        // 跳转登录页
        window.location.href = '/';
        location.reload();
      });
    } else {
      ElMessage({
        message: "网络异常，请稍后再试!",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(msg || 'Error'));
    }
  }
);

// 导出实例
export default service;
```

### api封装

`src/api/index.ts`

```ts
// 拿到所有api
const modulesFiles = import.meta.globEager('./*/*.*');
const modules: any = {};
for (const key in modulesFiles) {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const value: any = modulesFiles[key];
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

`main.ts`

```ts
const app = createApp(App);

// 配置全局api
import api from '@/api'
app.config.globalProperties.$api = api;

app.mount('#app')
```

### api调用demo

`src/api/system/sys_login.ts`

```ts
import { Captcha } from '@/types/api/system/login';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

// 获取验证码
export function getCaptcha(): AxiosPromise<Captcha> {
    return request({
        url: '/captcha?t=' + new Date().getTime().toString(),
        method: 'get',
    });
}
```

`src/types/api/system/login.d.ts`

```ts
// 验证码类型声明
export interface Captcha {
    img: string;
    uuid: string;
}
```

`src/views/login/index.vue`

```ts
<template>
    <p>Hello...</p>
</template>
 
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
// 组件实例
const { proxy }: any = getCurrentInstance();
// 获取验证码
async function handleCaptcha() {
    const res = await proxy.$api.sys_login.getCaptcha()
    console.log('res:', res);
}
handleCaptcha()
</script>
```
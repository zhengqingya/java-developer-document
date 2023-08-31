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

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { localStorage } from '@/utils/storage'
import useStore from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 请求超时时间：50s
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`)
    }
    const { user } = useStore()
    if (user.tokenValue) {
      // 授权认证
      config.headers[user.tokenName] = user.tokenValue
    }
    // 租户ID
    config.headers['TENANT_ID'] = '1'
    // 微信公众号appId
    config.headers['appId'] = localStorage.get('appId')
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    const { code, msg } = res
    if (code === 200) {
      return res
    } else {
      // token过期
      if (code === -1) {
        ElMessageBox.confirm('您的登录账号已失效，请重新登录', {
          confirmButtonText: '再次登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 清除浏览器全部缓存
          localStorage.clear()
          // 跳转登录页
          window.location.href = '/'
          location.reload()
        })
      } else {
        ElMessage({
          message: msg || '系统出错',
          type: 'error',
          duration: 5 * 1000,
        })
      }
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  (error) => {
    const { msg } = error.response.data
    // 未认证
    if (error.response.status === 401) {
      ElMessageBox.confirm('您的登录账号已失效，请重新登录', {
        confirmButtonText: '再次登录',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 清除浏览器全部缓存
        localStorage.clear()
        // 跳转登录页
        window.location.href = '/'
        location.reload()
      })
    } else {
      ElMessage({
        message: '网络异常，请稍后再试!',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
)

// 导出实例
export default service

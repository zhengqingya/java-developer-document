import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { Captcha, LoginFormData, LoginResponseData } from '@/types/api/system/login'

// 获取验证码
export function getCaptcha(): AxiosPromise<Captcha> {
  return request({
    url: '/captcha?t=' + new Date().getTime().toString(),
    method: 'get',
  })
}

// 登录
export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
    // headers: {
    //   // 客户端信息Base64明文：web:123456
    //   Authorization: 'Basic d2ViOjEyMzQ1Ng==',
    // },
  })
}

// 注销
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete',
  })
}

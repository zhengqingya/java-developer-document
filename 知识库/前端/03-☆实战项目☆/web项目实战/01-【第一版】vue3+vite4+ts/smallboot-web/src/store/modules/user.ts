import { defineStore } from 'pinia'
import { LoginFormData } from '@/types/api/system/login'
import { UserState } from '@/types/store/user'

import { localStorage } from '@/utils/storage'
import { login, logout } from '@/api/system/sys_login'
import { getUserPerm } from '@/api/system/sys_user_perm'
import { resetRouter } from '@/router'



const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userId: 0,
    openId: '',
    tokenName: localStorage.get('tokenName') || 'Authorization-smallboot',
    tokenValue: localStorage.get('tokenValue') || '',
    nickname: '',
    avatarUrl: '',
    roleCodeList: [],
    permissionTreeList: [],
  }),
  actions: {
    async RESET_STATE() {
      this.$reset()
    },
    /**
     * 登录
     */
    login(loginData: LoginFormData) {
      const { username, password, code, uuid } = loginData
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password: password.trim(),
          grant_type: 'captcha',
          code: code,
          uuid: uuid,
        })
          .then((response) => {
            const { tokenName, tokenValue } = response.data
            localStorage.set('tokenName', tokenName)
            localStorage.set('tokenValue', tokenValue)
            this.tokenName = tokenName
            this.tokenValue = tokenValue
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserPerm()
          .then(({ data }: any) => {
            if (!data) {
              return reject('Verification failed, please Login again.')
            }
            const { userId, openId, nickname, avatarUrl, roleCodeList, permissionTreeList } = data
            this.userId = userId
            this.openId = openId
            this.nickname = nickname
            this.avatarUrl = avatarUrl
            this.roleCodeList = roleCodeList
            this.permissionTreeList = permissionTreeList
            resolve(data)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            localStorage.remove('tokenName')
            localStorage.remove('tokenValue')
            this.RESET_STATE()
            resetRouter()
            resolve(null)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        localStorage.remove('tokenName')
        localStorage.remove('tokenValue')
        this.RESET_STATE()
        resolve(null)
      })
    },
  },
})

export default useUserStore

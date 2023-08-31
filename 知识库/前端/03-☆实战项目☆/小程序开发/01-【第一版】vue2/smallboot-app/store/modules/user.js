import api from '@/api'

const store = {
	namespaced: true,
	// 存放数据
	state: {
		isLogin: false,
		id: null,
		openid: null,
		nickname: 'zhengqingya',
		avatarUrl: ''
	},
	getters: {
		getUserInfo(state) {
			return state
		}
	},
	// 同步变更数据
	mutations: {
		setUserInfo(state, userInfo) {
			if (!userInfo) {
				state.isLogin = false
				state.id = null
				state.openid = null
				state.nickname = null
				state.avatarUrl = null
				return
			}
			// 只能一个一个设置值...
			state.isLogin = true
			state.id = userInfo.id
			state.openid = userInfo.openid
			state.nickname = userInfo.nickname
			state.avatarUrl = userInfo.avatarUrl

			uni.setStorageSync('userInfo', userInfo)
		}
	},
	// 和后台交互获取数据
	actions: {
		async init({
			commit,
			state
		}) {
			let userInfo = uni.getStorageSync('userInfo')
			// console.log(11222, userInfo)
			commit('setUserInfo', userInfo)
		},
		// 登录
		async login({
			commit,
			state
		}, params) {
			uni.getUserProfile({
				desc: '登录',
				success: async (data) => {
					// 拿到的微信用户信息
					// console.log(data)
					uni.login({
						provider: 'weixin',
						success: async (res) => {
							// console.log(res)
							// 请求后台获取openid注册登录成功后返回基本用户信息
							let result = await api.user.login({
								code: res.code,
								iv: data.iv,
								encryptedData: data.encryptedData,
								userInfo: {
									nickName: data.userInfo.nickName,
									avatarUrl: data.userInfo.avatarUrl
								}
							})
							const {
								tokenName,
								tokenValue
							} = result
							uni.setStorageSync('tokenName', tokenName)
							uni.setStorageSync(tokenName, tokenValue)

							// console.log(1, result)
							commit('setUserInfo', result)
						}
					})
				},
				fail: (err) => {
					console.log(err);
				}
			})
		},
		// 获取用户信息
		// async getUserInfo({
		// 	commit,
		// 	state
		// }, userId) {
		// 	let userInfo = await api.user.getUserInfo({
		// 		userId: userId
		// 	})
		// 	commit('setUserInfo', userInfo)
		// },
		// 退出登录
		logout({
			commit,
			state
		}) {
			api.user.logout()
		},
		// 重置本地数据
		reset({
			commit,
			state
		}) {
			uni.clearStorage();
			commit('setUserInfo', null)
		},
		// 仅测试使用
		async localLogin({
			commit,
			state
		}, params) {
			let result = await api.user.login({
				code: '1',
				iv: '1',
				encryptedData: '1',
				isLocalLogin: true
			})
			const {
				tokenName,
				tokenValue
			} = result
			uni.setStorageSync('tokenName', tokenName)
			uni.setStorageSync(tokenName, tokenValue)

			// console.log(1, result)
			commit('setUserInfo', result)
		}
	}
}

export default store
import api from '@/api'

const store = {
	namespaced: true,
	// 存放数据
	state: {
		// username: 'zhengqingya',
		id: null,
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
		SET_USER_INFO: (state, userInfo) => {
			state = JSON.parse(JSON.stringify(userInfo))
			// alert(state.nickname)
		},
	},
	// 和后台交互获取数据
	actions: {
		// 登录
		async login({
			commit,
			state
		}, params) {
			let data = await api.user.login(params)
			const {
				access_token,
				token_type
			} = data
			const token = token_type + ":" + access_token
			uni.setStorageSync('token', token)
		},
		// 获取用户信息
		async getUserInfo({
			commit,
			state
		}, userId) {
			let userInfo = await api.user.getUserInfo({
				userId: userId
			})
			commit('SET_USER_INFO', userInfo)
			// console.log(getUserInfo())
		},
		// 退出登录
		logout({
			commit,
			state
		}) {
			api.user.logout({
				userId: state.userId
			})
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'token'
			})
			commit('SET_USER_INFO', {})
		}
	}
}

export default store

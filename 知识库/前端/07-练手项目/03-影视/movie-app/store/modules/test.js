const store = {
	namespaced: true,
	// 存放数据
	state: {
		username: 'zhengqingya',
		age: 18
	},
	getters: {
		getUsername(state) {
			return state.username
		}
	},
	// 同步变更数据
	mutations: {
		setUsername(state, username) {
			state.username = username
		}
	},
	// 和后台交互获取数据
	actions: {}
}
export default store

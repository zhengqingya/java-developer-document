const store = {
	namespaced: true,
	// 存放数据
	state: {
		spu: {
			"spuId": "1534420706752856064",
			"skuId": "1643869680483565568",
			"name": "hello",
			"specName": "X,蓝色",
			"price": 150,
			"num": 1,
			"coverImg": "http://172.16.16.244:9001/test/2023-04-04/7e3d02fd-eee2-44a5-a374-22b998564412%40%40%E7%BE%8E%E5%9B%BE13.png",
			"freight": 0

		}
	},
	getters: {
		getData(state) {
			return state
		}
	},
	// 同步变更数据
	mutations: {
		setData(state, data) {
			state.spu = data
		}
	},
	// 和后台交互获取数据
	actions: {}
}
export default store
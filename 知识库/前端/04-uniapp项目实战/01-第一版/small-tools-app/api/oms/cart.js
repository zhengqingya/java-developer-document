import request from '@/utils/request'

const BASE_API = '/mini/api/mall/cart'

export default {
	list() {
		return request({
			url: BASE_API + '/list',
			method: 'get'
		})
	},
	add(data) {
		return request({
			url: BASE_API,
			method: 'post',
			data,
		})
	},
	updateNum(data) {
		return request({
			url: BASE_API + "/updateNum",
			method: 'put',
			data,
		})
	},
	delete(data) {
		return request({
			url: BASE_API,
			method: 'delete',
			data,
		})
	},
}

import request from '@/utils/request'

const BASE_API = '/mini/api/mall/order'

export default {
	tab(params) {
		return request({
			url: BASE_API + '/getTabCondition',
			method: 'get',
			params: params,
		})
	},
	page(params) {
		return request({
			url: BASE_API + '/page',
			method: 'get',
			params: params,
		})
	},
	detail(orderNo) {
		return request({
			url: BASE_API + '/' + orderNo,
			method: 'get'
		})
	},
	create(data) {
		return request({
			url: BASE_API + "/create",
			method: 'post',
			data,
		})
	},
	cancel(data) {
		return request({
			url: BASE_API + "/cancel",
			method: 'put',
			data,
		})
	},
	pay(data) {
		return request({
			url: BASE_API + "/pay",
			method: 'put',
			data,
		})
	},
}

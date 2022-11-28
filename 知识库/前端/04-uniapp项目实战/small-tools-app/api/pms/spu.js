import request from '@/utils/request'

const BASE_API = '/mini/api/mall/spu'

export default {
	page(params) {
		return request({
			url: BASE_API + '/page',
			method: 'get',
			params: params,
		})
	},
	detail(id) {
		return request({
			url: BASE_API + '/' + id,
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
	update(data) {
		return request({
			url: BASE_API,
			method: 'put',
			data,
		})
	},
	delete(id) {
		return request({
			url: BASE_API,
			method: 'delete',
			params: {
				id: id,
			},
		})
	},
}

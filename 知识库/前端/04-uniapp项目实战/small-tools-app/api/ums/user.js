import request from '@/utils/request'

const BASE_API = '/mini/api/ums/user'

export default {
	login(params) {
		return request({
			url: BASE_API + '/login',
			method: 'get',
			params: params
		})
	},
	getUserInfo(params) {
		return request({
			url: BASE_API + '/getUserInfo',
			method: 'get',
			params: params
		})
	},
	logout(params) {
		return request({
			url: BASE_API + '/logout',
			method: 'get',
			params: params
		})
	},
}

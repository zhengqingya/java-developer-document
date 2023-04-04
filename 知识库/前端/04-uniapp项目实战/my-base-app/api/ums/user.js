import request from '@/utils/request'

const BASE_API = '/mini/api/ums/user'

export default {
	login(data) {
		return request({
			url: BASE_API + '/wxLogin',
			method: 'post',
			data
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

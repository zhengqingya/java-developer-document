import request from '@/utils/request'

const BASE_API = '/mini/api/mall/category'

export default {
	reSpuList(params) {
		return request({
			url: BASE_API + '/reSpuList',
			method: 'get',
			params: params,
		})
	}
}

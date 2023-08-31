import request from '@/utils/request'

const BASE_API = '/web/api/mall/category/spu/relation'

export default {
  page(query, headers) {
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
      headers,
    })
  },
  add(data) {
    return request({
      url: BASE_API,
      method: 'post',
      data: data,
    })
  },
  update(data) {
    return request({
      url: BASE_API,
      method: 'put',
      data: data,
    })
  },
  deleteBatch(params) {
    return request({
      url: BASE_API + '/deleteBatch',
      method: 'delete',
      params: params,
    })
  },
}

import request from '@/utils/request'

const KEY_BASE_API = '/web/api/mall/attr/key'
const VALUE_BASE_API = '/web/api/mall/attr/value'

export default {
  listKey(query, headers) {
    return request({
      url: KEY_BASE_API + '/list',
      method: 'get',
      params: query,
      headers,
    })
  },
  listByKeyIdList(query) {
    return request({
      url: KEY_BASE_API + '/listByIdList',
      method: 'get',
      params: query,
    })
  },
  addKey(data) {
    return request({
      url: KEY_BASE_API,
      method: 'post',
      data: data,
    })
  },
  updateKey(data) {
    return request({
      url: KEY_BASE_API,
      method: 'put',
      data: data,
    })
  },
  deleteKey(params) {
    return request({
      url: KEY_BASE_API,
      method: 'delete',
      params: params,
    })
  },
  // ==========================================  上： 属性key  下：属性value
  listValue(query, headers) {
    return request({
      url: VALUE_BASE_API + '/list',
      method: 'get',
      params: query,
      headers,
    })
  },
  addValue(data) {
    return request({
      url: VALUE_BASE_API,
      method: 'post',
      data: data,
    })
  },
  updateValue(data) {
    return request({
      url: VALUE_BASE_API,
      method: 'put',
      data: data,
    })
  },
  deleteValue(params) {
    return request({
      url: VALUE_BASE_API,
      method: 'delete',
      params: params,
    })
  },
}

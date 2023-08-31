import request from '@/utils/request'

const BASE_API = '/web/api/system/dict'

export default {
  listFromCacheByCode(code) {
    return request({
      url: BASE_API + '/listFromCacheByCode',
      method: 'get',
      params: { code: code },
    })
  },
  listByCode(code) {
    return request({
      url: BASE_API + '/listByCode',
      method: 'get',
      params: { code: code },
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

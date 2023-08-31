import request from '@/utils/request'

const BASE_API = '/web/api/system/dict/type'

export default {
  list() {
    return request({
      url: BASE_API + '/list',
      method: 'get',
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

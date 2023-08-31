import request from '@/utils/request'

const BASE_API = '/web/api/system/property'

export default {
  listPage(query) {
    return request({
      url: BASE_API + '/listPage',
      method: 'get',
      params: query,
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

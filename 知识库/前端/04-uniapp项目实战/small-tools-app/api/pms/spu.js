import request from '@/utils/request'

const BASE_API = '/web/api/demo/test/time'

export default {
  test(code) {
    return request({
      url: BASE_API + '',
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

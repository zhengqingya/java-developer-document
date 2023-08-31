import request from '@/utils/request'

const BASE_API = '/web/api/wx/mp/account'

export default {
  page(query, headers) {
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
      headers,
    })
  },
  list(query, headers) {
    return request({
      url: BASE_API + '/list',
      method: 'get',
      params: query,
      headers,
    })
  },
  add(form) {
    return request({
      url: BASE_API + '/add',
      method: 'post',
      data: form,
    })
  },
  update(form) {
    return request({
      url: BASE_API + '/update',
      method: 'put',
      data: form,
    })
  },
  delete(id) {
    return request({
      url: BASE_API + '/delete',
      method: 'delete',
      params: { id: id },
    })
  },
}

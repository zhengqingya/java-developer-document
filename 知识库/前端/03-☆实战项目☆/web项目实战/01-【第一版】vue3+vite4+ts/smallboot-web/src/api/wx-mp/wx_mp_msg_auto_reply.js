import request from '@/utils/request'
import { localStorage } from '@/utils/storage'
const BASE_API = '/web/api/wx/mp/msgAutoReply'
const APP_ID = localStorage.get('appId')

export default {
  page(query, headers) {
    query.appId = APP_ID
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
      headers,
    })
  },
  add(form) {
    form.appId = APP_ID
    return request({
      url: BASE_API + '/add',
      method: 'post',
      data: form,
    })
  },
  update(form) {
    form.appId = APP_ID
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

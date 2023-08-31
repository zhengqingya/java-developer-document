import request from '@/utils/request'
import { localStorage } from '@/utils/storage'
const BASE_API = '/web/api/wx/mp/material'
const APP_ID = localStorage.get('appId')

export default {
  page(query) {
    query.appId = APP_ID
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
    })
  },
  add(form) {
    form.appId = APP_ID
    return request({
      url: BASE_API + '/add',
      method: 'post',
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  delete(form) {
    return request({
      url: BASE_API + '/delete',
      method: 'delete',
      data: form,
    })
  },
}

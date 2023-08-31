import request from '@/utils/request'
import { localStorage } from '@/utils/storage'
const APP_ID = localStorage.get('appId')
const BASE_API = '/web/api/wx/mp/templateMsg/' + APP_ID

export default {
  page(query, headers) {
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
      headers,
    })
  },
  sync(form) {
    return request({
      url: BASE_API + '/sync',
      method: 'post',
      data: form,
    })
  },
  sendMsg(form) {
    form.appId = APP_ID
    return request({
      url: BASE_API + '/sendMsg',
      method: 'post',
      data: form,
    })
  },
}

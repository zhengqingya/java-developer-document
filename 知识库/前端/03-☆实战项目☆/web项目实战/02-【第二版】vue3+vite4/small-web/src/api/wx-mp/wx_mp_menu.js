import request from '@/utils/request'

const BASE_API = '/web/api/wx/mp/menu'

export default {
  detail(query) {
    return request({
      url: BASE_API + '/detail',
      method: 'get',
      params: query,
    })
  },
  update(form) {
    return request({
      url: BASE_API + '/update',
      method: 'put',
      data: form,
    })
  },
}

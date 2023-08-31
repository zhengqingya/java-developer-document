import request from '@/utils/request'

const BASE_API = '/web/api/mall/order'

export default {
  page(query, headers) {
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
      headers,
    })
  },
  tabList(query) {
    return request({
      url: BASE_API + '/getTabCondition',
      method: 'get',
      params: query,
    })
  },
  detail(orderNo) {
    return request({
      url: BASE_API + '/delete/' + orderNo,
      method: 'get',
    })
  },
  update(data) {
    return request({
      url: BASE_API + '/update',
      method: 'put',
      data: data,
    })
  },
}

import request from '@/utils/request'

const BASE_API = '/web/api/system/user'

export default {
  getUserPerm() {
    return request({
      url: BASE_API + '/getUserPerm',
      method: 'get',
      // params: { systemSource: 0 }
    })
  },
  listPage(query, headers) {
    return request({
      url: BASE_API + '/listPage',
      method: 'get',
      params: query,
      headers,
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
      params: { userId: id },
    })
  },
  updateStatus(id, status) {
    return request({
      url: BASE_API + '/updateStatus',
      method: 'post',
      data: { userId: id, status: status },
    })
  },
  resetPassword(data) {
    return request({
      url: BASE_API + '/resetPassword',
      method: 'get',
      params: data,
    })
  },
  getUserInfoById(userId) {
    return request({
      url: BASE_API + '',
      method: 'get',
      params: {
        userId: userId,
      },
    })
  },
  // 保存用户角色
  saveRoleIds(data) {
    return request({
      url: BASE_API + '/saveRoleIds',
      method: 'post',
      data: data,
    })
  },
  // 修改密码
  updatePassword(data) {
    return request({
      url: BASE_API + '/updatePassword',
      method: 'put',
      data: data,
    })
  },
}

import request from '@/utils/request';

const BASE_API = '/web/api/system/config';

export default {
  listPage(query, headers) {
    return request({
      url: BASE_API + '/listPage',
      method: 'get',
      params: query,
      headers,
    });
  },
  add(data) {
    return request({
      url: BASE_API,
      method: 'post',
      data,
    });
  },
  update(data) {
    return request({
      url: BASE_API,
      method: 'put',
      data,
    });
  },
  delete(id) {
    return request({
      url: BASE_API,
      method: 'delete',
      params: {
        id: id,
      },
    });
  },
  list(query) {
    return request({
      url: BASE_API + '/list',
      method: 'get',
      params: query,
    });
  },
  listByKey(query) {
    return request({
      url: BASE_API + '/listByKey',
      method: 'get',
      params: query,
    });
  },
  saveBatch(data) {
    return request({
      url: BASE_API + '/saveBatch',
      method: 'post',
      data,
    });
  },
};

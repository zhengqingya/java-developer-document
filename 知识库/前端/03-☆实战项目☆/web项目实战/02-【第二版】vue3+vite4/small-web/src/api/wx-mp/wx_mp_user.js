import request from '@/utils/request';
import { localStorage } from '@/utils/storage';

const BASE_API = '/web/api/wx/mp/user';

export default {
  page(query, headers) {
    query.appId = localStorage.get('appId');
    return request({
      url: BASE_API + '/page',
      method: 'get',
      params: query,
      headers,
    });
  },
  sync(form) {
    return request({
      url: BASE_API + '/sync',
      method: 'post',
      data: form,
    });
  },
};

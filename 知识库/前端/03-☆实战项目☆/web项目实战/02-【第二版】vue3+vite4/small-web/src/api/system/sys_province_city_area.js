import request from '@/utils/request';

const BASE_API = '/web/api/system/pca';

export default {
  tree(query) {
    return request({
      url: BASE_API + '/tree',
      method: 'get',
      params: query,
    });
  },
};

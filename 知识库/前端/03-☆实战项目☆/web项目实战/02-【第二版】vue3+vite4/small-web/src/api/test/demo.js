import request from '@/utils/request';

export default {
  time() {
    return request({
      url: '/api/test/seckill/00',
      method: 'get',
    });
  },
};

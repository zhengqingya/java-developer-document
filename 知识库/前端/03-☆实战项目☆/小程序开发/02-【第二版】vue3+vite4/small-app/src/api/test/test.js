import request from '@/utils/request';

const BASE_API = '/api/test/seckill';

export default {
    time() {
        return request({
            url: BASE_API + '/00',
            method: 'get',
        });
    },
    login() {
        return request({
            url: 'https://vue.ruoyi.vip/prod-api/login',
            method: 'post',
            data: {
                username: 'admin',
                password: 'admin123',
                code: 'xxx',
                uuid: 'xxx',
            },
        });
    },
};

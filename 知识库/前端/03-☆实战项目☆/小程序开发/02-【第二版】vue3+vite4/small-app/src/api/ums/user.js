import request from '@/utils/request';

const BASE_API = '/mini/api/ums/user';

export default {
    login(data) {
        return request({
            url: BASE_API + '/wxLogin',
            method: 'post',
            data,
        });
    },
    logout(params) {
        return request({
            url: '/auth/logout',
            method: 'delete',
            params: params,
        });
    },
    getUserInfo(params) {
        return request({
            url: BASE_API + '/getUserInfo',
            method: 'get',
            params: params,
        });
    },
    updateUserInfo(data) {
        return request({
            url: BASE_API + '/updateUserInfo',
            method: 'put',
            data,
        });
    },
};

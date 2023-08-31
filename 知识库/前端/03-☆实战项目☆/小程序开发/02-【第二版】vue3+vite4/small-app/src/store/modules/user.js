import { defineStore } from 'pinia';
import api from '@/api';
import config from '@/config.js';

export const useUserStore = defineStore('user', () => {
    let isLogin = ref(false);
    let userObj = ref({});
    let isTest = ref(config.baseUrl.includes('127.0.0.1'));

    // 登录
    async function login() {
        if (isLogin.value) {
            return;
        }
        uni.login({
            provider: 'weixin',
            success: async (res) => {
                // console.log(res);
                // 请求后台获取openid注册登录成功后返回基本用户信息
                let result = await api.user.login({
                    code: res.code,
                    // iv: data.iv,
                    // encryptedData: data.encryptedData,
                    // userInfo: {
                    //     nickName: data.userInfo.nickName,
                    //     avatarUrl: data.userInfo.avatarUrl,
                    // },
                });
                isLogin.value = true;
                userObj.value = result;
            },
        });
    }

    // 退出登录
    function logout() {
        isLogin.value = false;
        userObj.value = {};
    }

    // 仅测试使用
    async function localLogin() {
        let result = await api.user.login({
            code: '1',
            iv: '1',
            encryptedData: '1',
            isLocalLogin: true,
        });
        // console.log('用户信息：', result);
        isLogin.value = true;
        userObj.value = result;
    }

    return { isLogin, isTest, userObj, login, logout, localLogin };
});

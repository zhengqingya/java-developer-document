import config from '@/config.js';
import store from '@/store';

const request = ({
    url, // 请求url
    method, // 请求方式：get/post/put/delete
    params, // get请求提交参数
    data, // post/put请求提交参数
    headers, // 请求头
    mockData, // mock数据
    // 下面为文件上传所需 -------------------------
    isUploadFile, // 是否为文件上传
    filePath, // 要上传的文件路径
    formData, // 其他附加的表单数据
}) => {
    return new Promise((resolve, reject) => {
        let { isLogin, isTest, userObj, logout, login } = store.user.useUserStore();
        if (isTest && mockData != null) {
            // 测试环境可用测试数据，不直接请求接口...
            return resolve(mockData);
        }

        // console.log(111, userObj);
        const tokenName = userObj.tokenName;
        const tokenValue = userObj.tokenValue;
        headers = {
            // 'Content-Type': 'application/json;charset=utf-8',
            TENANT_ID: 1,
            // 'Authorization-smallboot': 'xxx' // TODO 仅测试使用
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:888/', // 允许跨域请求的地址（无效配置）
        };
        if (tokenValue) {
            headers[tokenName] = tokenValue;
        }
        // console.log(1, headers);

        uni[isUploadFile ? 'uploadFile' : 'request']({
            url: url.startsWith('http') ? url : config.baseUrl + url,
            data: method === 'get' ? params : data,
            method: method,
            header: headers,
            // 文件上传所需
            name: 'file', // 服务器端接收的字段名
            filePath: filePath,
            formData: formData,
            // 收到开发者服务器成功返回的回调函数
            success: (res) => {
                // console.log(666, res);
                if (isUploadFile) {
                    // 文件上传返回的是字符串，转换一下...
                    res.data = JSON.parse(res.data);
                }
                const { code, msg } = res.data;
                if (code == 200) {
                    return resolve(res.data.data);
                } else if (code == -1) {
                    // token过期 =》 先清除本地缓存，再授权登录
                    logout();
                    uni.switchTab({
                        url: '/pages/mine/index',
                    });
                    uni.showToast({
                        icon: 'none',
                        duration: 3000,
                        title: '请先授权登录！',
                    });
                    // login();
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: msg,
                });
                return reject(msg);
            },
            // 接口调用失败的回调函数
            fail(error) {
                console.log('请求错误：', error);
                uni.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: '网络异常，请稍后重试！',
                });
                return reject(error);
            },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete() {},
        });
    });
};

// 向外暴露request
export default request;

import config from '@/config.js'
import store from '@/store'

const request = ({
	url, // 请求url
	method, // 请求方式：get/post/put/delete
	params, // get请求提交参数
	data, // post/put请求提交参数
	headers // 请求头
}) => {
	return new Promise((resolve, reject) => {
		// let isTest = config.baseUrl.includes('127.0.0.1')
		let isLogin = store.state.user.isLogin
		if (!isLogin) {
			// 去看看storage中有没有数据
			store.dispatch("user/init");
		}

		if (!headers) {
			const tokenName = uni.getStorageSync('tokenName')
			const tokenValue = uni.getStorageSync(tokenName)
			headers = {
				'Content-Type': 'application/json;charset=utf-8',
				'TENANT_ID': 1,
				// 'Authorization-smallboot': 'xxx' // TODO 仅测试使用
			}
			if (tokenValue) {
				headers[tokenName] = tokenValue
			}
			// console.log(1, headers) 
		}
		uni.request({
			url: config.baseUrl + url,
			data: method === 'get' ? params : data,
			method: method,
			header: headers,
			// 收到开发者服务器成功返回的回调函数
			success: (res) => {
				// console.log(666, res)
				const {
					code,
					msg
				} = res.data
				if (code == 200) {
					return resolve(res.data.data)
				} else if (code == -1) {
					// token过期 =》 先清除本地缓存，再授权登录
					store.dispatch("user/reset");
					uni.switchTab({
						url: '/pages/mine/mine'
					});
					uni.showToast({
						icon: 'none',
						duration: 3000,
						title: '请先授权登录！'
					});
					return
				}
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: msg
				});
				return reject(msg)
			},
			// 接口调用失败的回调函数
			fail(error) {
				console.log('请求错误：', error)
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: '网络异常，请稍后重试！'
				});
				return reject(error)
			},
			// 接口调用结束的回调函数（调用成功、失败都会执行）
			complete() {}
		});
	})
}


//向外暴露request
export default request
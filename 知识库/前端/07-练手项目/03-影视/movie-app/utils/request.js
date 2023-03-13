// const BASE_URL = "http://127.0.0.1:10020"
const BASE_URL = "http://127.0.0.1:10010"

const request = ({
	url, // 请求url
	method, // 请求方式：get/post/put/delete
	params, // get请求提交参数
	data, // post/put请求提交参数
	headers // 请求头
}) => {
	return new Promise((resolve, reject) => {
		if (!headers) {
			const token = uni.getStorageSync('token')
			headers = {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': token,
				'TENANT_ID': 1
			}
		}
		uni.request({
			url: BASE_URL + url,
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

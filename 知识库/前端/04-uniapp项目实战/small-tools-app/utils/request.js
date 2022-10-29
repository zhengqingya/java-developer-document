const BASE_URL = "http://localhost:80" //公共请求头

const request = ({
	url,
	method,
	data,
	headers
}) => {
	return new Promise((resolve, reject) => {
		if (!headers) {
			headers = {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': "---",
				'TENANT_ID': 1
			}
		}
		uni.request({
			url: BASE_URL + url,
			data: data,
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
				alert(1)
				return reject(error)
			},
			// 接口调用结束的回调函数（调用成功、失败都会执行）
			complete() {}
		});
	})
}


//向外暴露request
export default request

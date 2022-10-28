import {getToken,removeToken} from './auth';
import env from './env';


// 封装数据返回成功提示函数------------------------------------------------------
function successState(res) {
  let code = res.data.code;
	console.log('@return-data:')
	console.log(res)
	//公共报错提醒
	if(code !== 200){
		// 非成功状态码弹窗
		uni.showToast({
			icon: 'none',
			duration: 3000,
			title: `${res.data.msg}`
		});
	}
  // 登陆失效
  if (res.data.code === 403) {
  	// 清除本地token
  	removeToken()
  	// 关闭所有页面返回到登录页
  	uni.reLaunch({
  		url: '/pages/login/login'
  	})
  }
  console.log('/------http(END)------/')

  return res
}
// 封装数据返回失败提示函数------------------------------------------------------
function errorState(err) {
  // 请求失败弹窗
  uni.showToast({
  	icon: 'none',
  	duration: 3000,
  	title: '服务器错误,请稍后再试'
  });
  console.log('/------http(END)------/')
}


// 封装axios---------------------------------------------------------------------
function service(options = {}) {
	options.url = `${env.baseUrl}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	if (getToken()) {
		options.header = {
			'content-type': 'application/json',
			'authorization': `${getToken()}`	// 这里是token
		};
	}
	console.log('/------http(START)------/')
  console.log('@all-url:')
  console.log(options.url)
  console.log('@params:')
  console.log(options)

	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			successState(res)
			resolved(res)
		};
		options.fail = (err) => {
			errorState(err)
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;v
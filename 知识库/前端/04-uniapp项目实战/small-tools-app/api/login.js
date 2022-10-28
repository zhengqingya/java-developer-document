import axios from '../util/http'
const Login = {
	// 获取验证码
	goPhoneCode(params) {
		return axios({
			method: 'get',
			url: `/mini/api/mall/spu/page`,
			params: params
		})
	},
}
export default Login

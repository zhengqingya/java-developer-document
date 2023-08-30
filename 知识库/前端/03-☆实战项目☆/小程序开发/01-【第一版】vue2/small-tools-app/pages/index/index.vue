<template>
	<view>
		<!-- 获取基本信息 -->
		<button type="primary" withCredentials="true" @tap="getUserProfile">授权登录</button>
		<!-- 获取手机号 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html -->
		<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {},
		methods: {
			getUserProfile() {
				uni.getUserProfile({
					desc: '登录',
					success: async (data) => {
						// 拿到的微信用户信息
						console.log(data)
						uni.login({
							provider: 'weixin',
							success: async (res) => {
								console.log(res)
								// 请求后台获取openid注册登录成功后返回基本用户信息
								let userInfo = await this.$api.user.login({
									code: res.code,
									iv: data.iv,
									encryptedData: data.encryptedData,
									userInfo: {
										nickName: data.userInfo.nickName,
										avatarUrl: data.userInfo.avatarUrl
									}
								})
								console.log(userInfo)
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>

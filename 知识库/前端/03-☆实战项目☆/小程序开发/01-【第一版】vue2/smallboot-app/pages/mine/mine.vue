<template>
	<view class="app-container">
		<view class="user-box" v-if="isLogin">
			<image class="avatar" :src="userObj.avatarUrl" />
			<view class="name">{{userObj.nickname}}</view>
		</view>
		<view v-else>
			<!-- 获取基本信息 -->
			<button type="primary" withCredentials="true" @tap="getUserProfile">授权登录</button>
		</view>
		<view v-if="isTest" style="margin-top: 100rpx;">
			<view v-if="isLogin">
				openid：{{$store.state.user.openid}}
				<br />
				昵称：{{$store.state.user.nickname}}
			</view>
			<button v-else type="warn" @tap="localLogin">本地临时登录</button>
		</view>
		<view style="height: 100%;background-color: #aaaaff;">
			<view style="text-align:center; padding: 100rpx;">HelloWorld ^_^</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	export default {
		data() {
			return {
				isTest: config.baseUrl.includes('127.0.0.1'),
				isLogin: false,
				userObj: null,
			}
		},
		onLoad() {},
		// 页面显示就触发
		onShow() {
			this.init()
		},
		methods: {
			async init() {
				this.getUserInfo()
			},
			async getUserProfile() {
				await this.$store.dispatch("user/login");
				setTimeout(() => {
					this.getUserInfo()
				}, 2000)
			},
			async localLogin() {
				await this.$store.dispatch("user/localLogin");
				this.getUserInfo()
			},
			getUserInfo() {
				this.userObj = this.$store.state.user;
				this.isLogin = this.userObj.isLogin
				// console.log(111, this.userObj)
			},
		}
	}
</script>

<style lang="scss">
	.app-container {
		.user-box {
			background-color: paleturquoise;
			height: 200rpx;
			display: flex;
			padding: 10rpx 10rpx;
			margin-bottom: -40rpx;
			align-items: center;

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100rpx;
			}

			.name {
				font-weight: bold;
				margin-left: 30rpx;
			}
		}
	}
</style>
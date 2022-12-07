<template>
	<view class="app-container">
		<view class="user-box">
			<image src="https://img2.baidu.com/it/u=2027087424,1608351807&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
			<view class="name">{{$store.state.user.nickname}}</view>
		</view>
		<view class="service-box">
			<view class="item">
				<view>10</view>
				<view>积分商城</view>
			</view>
			<view class="item">
				<view>0</view>
				<view>优惠券</view>
			</view>
			<view class="item">
				<view>田</view>
				<view>会员码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// nickname: this.$store.state.user.nickname
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				// 获取用户数据
				await this.$store.dispatch("user/getUserInfo", 1);
				// console.log(this.$store.state.user)
				// // this.$store.dispatch("user/logout");
				// this.nickname = this.$store.state.user.nickname
			}
		}
	}
</script>

<style lang="scss">
	.app-container {
		background-color: $bg-color;

		.user-box {
			display: flex;
			padding: 10rpx 50rpx;
			margin-bottom: -40rpx;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			.name {
				align-self: center;
				font-weight: bold;
			}
		}

		.service-box {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 10rpx;

			.item {
				flex: 1;
				background-color: white;
				text-align: center;
				padding: 50rpx;

				view {
					&:nth-child(1) {
						font-weight: bold;
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}
</style>

<template>
	<view class="app-container">
		<view>
			<view class="order-status-box" v-if="orderObj">
				<view class="status">{{orderObj.orderStatusName}}</view>
				<view v-if="orderObj.orderStatus===1">
					<view class="un-pay">
						<view>剩余支付时间：</view>
						<u-count-down :time="new Date(orderObj.unPayEndTime).getTime()-new Date().getTime()"
							format="mm:ss" @finish="cancelOrder()" />
					</view>
					<view class="action">
						<button class="btn" @tap="cancelOrder()">取消订单</button>
						<button class="btn" type="primary" @tap="createOrder()">立即支付</button>
					</view>
				</view>
			</view>
			<view class="product-box">
				<uni-list>
					<uni-list-item title="商品明细" />
					<uni-list-item>
						<template v-slot:footer>
							<view class="list">
								<view class="item" v-for="(item, index) in orderObj.spuList" :key="index">
									<image :src="item.coverImg" class="image" />
									<view class="left">
										<view class="name">{{item.name}}</view>
										<!-- <view class="spec-desc">{{item.specDesc}}</view> -->
									</view>
									<view class="center">
										<text>￥{{item.price/100}}</text>
									</view>
									<view class="right">
										<view class="num">x{{item.num}}</view>
									</view>
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="base-box">
				<uni-list-item title="订单号" :rightText="orderObj.orderNo" />
				<uni-list-item title="下单时间" :rightText="orderObj.createTime" />
				<uni-list-item title="店铺" rightText="天府三街测试店" />
				<uni-list-item title="配送方式" rightText="堂食" />
				<uni-list-item title="总金额" :rightText="orderObj.totalPrice/100" />
				<uni-list-item title="支付金额" :rightText="orderObj.payPrice/100" />
				<uni-list-item title="备注" :rightText="orderObj.orderRemark" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNo: '', // this.$route.query.orderNo 这种方式微信小程序用不了
				orderObj: [], // 订单详情
			};
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false
			}
			uni.switchTab({
				url: '/pages/order/order'
			})
			return true;
		},
		onLoad(params) {
			this.orderNo = params.orderNo
			this.orderDetail()
		},
		methods: {
			// 订单详情
			async orderDetail() {
				this.orderObj = await this.$api.order.detail(this.orderNo);
			},
			// 取消订单
			cancelOrder() {
				this.$api.order.cancel({
					orderNo: this.orderNo
				})
				// 倒计时
				setTimeout(() => {
					let that = this
					uni.showModal({
						title: '提示',
						content: '订单已取消',
						showCancel: false,
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								that.orderDetail()
							}
						}
					});
				}, 1500);
				// uni.switchTab({
				// 	url: '/pages/order/order'
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		background-color: $bg-color;

		.order-status-box,
		.base-box,
		.product-box {
			padding: 10rpx 10rpx;
			margin: 10rpx 10rpx;
			background-color: white;
		}

		.order-status-box {
			min-height: 80rpx;

			.status {
				font-size: 34rpx;
				font-weight: bold;
				text-align: center;
				margin-top: 10rpx;
			}

			.un-pay {
				display: flex;
				justify-content: center;
				margin-top: 20rpx;
				font-size: $font-size-base;
			}

			.action {
				display: flex;
				margin-top: 20rpx;

				.btn {
					font-size: $font-size-lg;
				}
			}
		}



		.product-box {

			.list {
				width: 100%;

				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5rpx 0;
					position: relative;
					// border: 1rpx solid gainsboro;

					.image {
						width: 60rpx;
						height: 60rpx;
						margin-right: 10rpx;
					}

					.left {
						flex: 1;
						display: flex;
						flex-direction: column;

						.name {
							font-size: $font-size-sm;
							color: $text-color-base;
						}

						.spec-desc {
							color: $text-color-assist;
							font-size: $font-size-sm;
						}
					}

					.center {
						margin-right: 120rpx;
						font-size: $font-size-base;
					}

					.right {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.num {
							font-size: $font-size-sm;
							width: 46rpx;
							height: 46rpx;
							text-align: center;
							line-height: 46rpx;
						}
					}
				}

			}
		}

	}
</style>

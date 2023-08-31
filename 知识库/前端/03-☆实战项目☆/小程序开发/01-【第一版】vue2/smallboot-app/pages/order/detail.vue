<template>
	<view class="app-container">
		<view>
			<view class="order-status-box" v-if="!isCreateOrder && orderObj">
				<view class="status">{{orderObj.orderStatusName}}</view>
				<view v-if="orderObj.orderStatus===1" class="un-pay">
					<view>剩余支付时间：</view>
					<u-count-down :timestamp="new Date(orderObj.unPayEndTime).getTime()-new Date().getTime()"
						format="mm:ss" @finish="cancelOrder()" />
				</view>
			</view>

			<view class="spu-box" v-for="(item, index) in orderObj.spuList" :key="index">
				<view class="spu-item">
					<image :src="item.coverImg" class="image" />
					<view class="left">
						<view class="name">{{item.name}}</view>
						<view class="spec-desc">{{item.specDesc}}</view>
					</view>
					<view class="center">
						<text>￥{{item.price/100}}</text>
					</view>
					<view class="right">
						<view class="num">x{{item.num}}</view>
					</view>
				</view>
			</view>

			<view class="base-box">
				<view v-if="!isCreateOrder">
					<view class="item-list">
						<text class="title">订单号</text>
						<view class="value">{{orderObj.orderNo}}</view>
					</view>
					<view class="item-list">
						<text class="title">下单时间</text>
						<view class="value">{{orderObj.createTime}}</view>
					</view>
				</view>
				<view class="item-list">
					<text class="title">取餐时间</text>
					<view class="value">立即</view>
				</view>
				<view class="item-list">
					<text class="title">配送方式</text>
					<view class="value">堂食</view>
				</view>
				<view class="item-list">
					<text class="title">总金额</text>
					<view class="value" style="color:red">{{orderObj.totalPrice/100}}</view>
				</view>
				<view class="item-list">
					<text class="title">支付金额</text>
					<view class="value" style="color:red">{{orderObj.payPrice/100}}</view>
				</view>
				<view class="tips">
					<view class="title">备注</view>
					<view class="value">
						<textarea class="textarea" :disabled="!isCreateOrder" placeholder="请输入备注信息..." maxlength="100"
							v-model="orderObj.orderRemark"></textarea>
					</view>
				</view>
			</view>


			<view class="action">
				<button v-if="isCreateOrder" class="create-order" type="warn" @click="createOrder()">创建订单</button>
				<view class="un-pay" v-if="orderObj.orderStatus===1">
					<button class="btn" @tap="cancelOrder(true)">取消订单</button>
					<button class="btn" type="primary" @tap="payOrder()">立即支付（仅测试）</button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCreateOrder: false, // 是否为创建订单页面
				orderNo: '', // this.$route.query.orderNo 这种方式微信小程序用不了
				orderObj: [], // 订单详情
				skuList: [] // 商品信息
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

			if (params.isCreateOrder) {
				// 创建订单数据
				this.isCreateOrder = true
				this.getCartList()
				return
			}
			if (this.orderNo) {
				// 订单详情
				this.orderDetail()
			} else {
				// 跳回订单列表页面
				uni.switchTab({
					url: '/pages/order/order'
				})
			}
		},
		methods: {
			// 订单详情
			async orderDetail() {
				this.orderObj = await this.$api.order.detail(this.orderNo);
			},
			// 购物车数据
			async getCartList() {
				let cartList = await this.$api.cart.list();
				let sumPrice = cartList.reduce((total, item) => total += item.num * item.price, 0)
				this.orderObj.spuList = cartList
				this.orderObj.totalPrice = sumPrice
				this.orderObj.payPrice = sumPrice
				this.orderObj.freight = Math.max.apply(Math, cartList.map(function(item) {
					return item.freight << 0
				}));
			},
			// 创建订单
			async createOrder() {
				let {
					orderNo
				} = await this.$api.order.create({
					skuList: this.orderObj.spuList,
					freight: this.orderObj.freight,
					totalPrice: this.orderObj.totalPrice,
					payPrice: this.orderObj.payPrice,
					orderRemark: this.orderObj.orderRemark
				});
				// 跳转到订单详情页面
				uni.navigateTo({
					url: '/pages/order/detail?orderNo=' + orderNo
				});
			},
			// 取消订单
			cancelOrder(isCancel) {
				if (isCancel) {
					// 手动取消订单，后端有自动取消逻辑，所以非手动取消订单操作则直接查询订单数据即可
					this.$api.order.cancel({
						orderNo: this.orderNo
					})
				}

				// 倒计时 -- 防止后端自动取消处理时间太久导致订单数据未及时更新
				setTimeout(() => {
					let that = this
					uni.showModal({
						title: '提示',
						content: '订单已取消',
						showCancel: false,
						success: function(res) {
							// console.log(res)
							if (res.confirm) {
								that.orderDetail()
							}
						}
					});
				}, 1500);
				// uni.switchTab({
				// 	url: '/pages/order/order'
				// })
			},
			async payOrder() {
				// TODO 临时测试
				// alert('条件有限，无法测试！')
				await this.$api.order.payTest({
					orderNo: this.orderNo
				})

				this.orderDetail()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		// overflow-y: scroll; // 超出滚动
		padding: 10rpx 20rpx;

		.order-status-box {
			// min-height: 80rpx;

			.status {
				font-size: 34rpx;
				font-weight: bold;
				text-align: center;
				margin-top: 10rpx;
				color: $color-primary;
			}

			.un-pay {
				display: flex;
				justify-content: center;
				margin-top: 20rpx;
				font-size: $font-size-base;
			}

		}

		.spu-box {
			margin-top: 10rpx;

			.spu-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 5rpx 0;
				position: relative;
				// border-bottom: 1rpx dashed #eee;

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

		.base-box {
			.item-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx dashed #eee;
				height: 80rpx;
				// padding: 10rpx 10rpx;

				.title {
					color: #333;
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					align-items: center;
				}

				.value {
					color: #999;
					font-size: 30rpx;
				}
			}

			.tips {
				.title {
					color: #333;
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					align-items: center;
					height: 80rpx;
				}

				.textarea {
					height: 200rpx;
					width: 100%;
					border: 1rpx solid #eee;
					border-radius: 10rpx;
					font-size: 30rpx;
					// background-color: rebeccapurple;
				}
			}
		}

		.action {
			.create-order {
				top: 20rpx;
				width: 200rpx;
				margin: auto;
			}

			.un-pay {
				display: flex;
				justify-content: center;
				margin-top: 20rpx;

				.btn {
					margin-left: 20rpx;
				}
			}


		}


	}
</style>
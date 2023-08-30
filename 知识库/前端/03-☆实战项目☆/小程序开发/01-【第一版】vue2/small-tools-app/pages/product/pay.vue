<template>
	<view class="app-container">
		<view class="base-box">
			<uni-list>
				<uni-list-item title="店铺" rightText="天府三街测试店" />
				<uni-list-item title="配送方式" rightText="堂食" />
				<uni-list-item title="联系电话">
					<template v-slot:footer>
						<input class="right-input" placeholder="请填写联系电话" value="151866666666" />
					</template>
				</uni-list-item>
				<uni-list-item title="取餐时间" rightText="立即"></uni-list-item>
			</uni-list>
		</view>
		<view class="product-box">
			<uni-list>
				<uni-list-item title="商品明细" />
				<uni-list-item>
					<template v-slot:footer>
						<view class="cart-list">
							<view class="item" v-for="(item, index) in cartList" :key="index">
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
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="remark-box">
			<uni-list-item title="备注">
				<template v-slot:footer>
					<input class="right-input" placeholder="无..." v-model="orderRemark" />
				</template>
			</uni-list-item>
		</view>
		<view class="pay-box">
			<uni-list-item>
				<template v-slot:header>
					<view>
						合计￥{{ cartList.reduce((total, item) => total += item.num * item.price, 0)/100 }}
					</view>
				</template>
				<template v-slot:footer>
					<button type="warn" class="right-input" @tap="createOrder()">创建订单</button>
				</template>
			</uni-list-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: [], // 购物车数据
				orderRemark: '',
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				// 购物车数据
				this.cartList = await this.$api.cart.list();
			},
			// 创建订单
			async createOrder() {
				let skuList = JSON.parse(JSON.stringify(this.cartList))
				let sumPrice = this.cartList.reduce((total, item) => total += item.num * item.price, 0)
				let {
					orderNo
				} = await this.$api.order.create({
					wxOpenid: "666",
					skuList: skuList,
					freight: Math.max.apply(Math, this.cartList.map(function(item) {
						return item.freight << 0
					})),
					totalPrice: sumPrice,
					payPrice: sumPrice,
					orderRemark: this.orderRemark
				});
				// 跳转到订单详情页面
				uni.navigateTo({
					url: '/pages/order/detail?orderNo=' + orderNo
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		background-color: $bg-color;

		.base-box,
		.product-box,
		.pay-box,
		.remark-box {
			padding: 10rpx 10rpx;

			.right-input {
				width: 180rpx;
				font-size: $font-size-sm;
			}
		}

		.product-box {

			.cart-list {
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

		.pay-box {
			position: absolute;
			width: 100%;
			bottom: 10rpx;
		}

	}
</style>

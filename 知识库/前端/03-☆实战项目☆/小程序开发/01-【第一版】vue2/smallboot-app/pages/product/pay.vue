<template>
	<view class="app-container">
		<view class="spu-list" v-for="(item, index) in cartList" :key="index">
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
			<view class="item-list">
				<text class="title">取餐时间</text>
				<view class="value">立即</view>
			</view>
			<view class="item-list">
				<text class="title">配送方式</text>
				<view class="value">堂食</view>
			</view>
			<view class="item-list">
				<text class="title">合计</text>
				<view class="value" style="color:red">
					￥{{ cartList.reduce((total, item) => total += item.num * item.price, 0)/100 }}
				</view>
			</view>
			<view class="tips">
				<view class="title">备注</view>
				<view class="value">
					<textarea class="textarea" placeholder="请输入备注信息..." maxlength="100"
						v-model="orderRemark"></textarea>
				</view>
			</view>
		</view>

		<view>
			<button class="create-order" type="warn" @click="createOrder()">创建订单</button>
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
					// wxOpenid: "666",
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
		// height: 1000rpx;
		// background-color: $bg-color;
		overflow-y: scroll; // 超出滚动
		padding: 10rpx 20rpx;

		.spu-list {
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

		.create-order {
			// position: absolute;
			top: 20rpx;
			width: 300rpx;
			margin: auto;
			// bottom: 10rpx;
			font-size: $font-size-base;
		}

	}
</style>
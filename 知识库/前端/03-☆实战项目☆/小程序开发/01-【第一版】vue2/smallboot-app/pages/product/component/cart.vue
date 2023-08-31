<template>
	<view class="app-container">
		<view class="cart-box" v-if="cartList && cartList.length > 0">
			<view @tap="isShowDetail = !isShowDetail" class="left">
				<view class="cart">
					<u-icon class="icon" size="55" name="shopping-cart"></u-icon>
					<u-badge class="num" :absolute="true" :offset="[-8,-18]"
						:count="cartList.reduce((total, item) => total += item.num, 0)" :overflow-count="99"></u-badge>
				</view>
				<view class="price">￥{{cartList.reduce((total, item) => total += (item.num*item.price), 0)/100}}</view>
			</view>
			<navigator :url="'/pages/order/detail?isCreateOrder=true'">
				<view class="pay">付款</view>
			</navigator>
		</view>
		<!-- 购物车详情 -->
		<view>
			<u-popup v-model="isShowDetail" class="cart-popup" :mask="true" @close="isShowDetail=false"
				:border-radius="10" mode="bottom" :custom-style="{bottom: '90rpx'}">
				<view class="top">
					<text @tap="clearCart">清空</text>
				</view>
				<scroll-view class="cart-list" scroll-y>
					<view class="wrapper">
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
								<button type="default" plain size="mini" class="btn" hover-class="none"
									@tap="updateCartItemNum(item,-1)">-</button>
								<view class="num">{{item.num}}</view>
								<button type="primary" class="btn" size="min" hover-class="none"
									@tap="updateCartItemNum(item,+1)">+</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: [], // 购物车数据
				isShowDetail: false, // 购物车弹出层
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				await this.getCartList()
			},
			// 购物车数据
			async getCartList() {
				this.cartList = await this.$api.cart.list();
				this.$emit("initCartList", this.cartList);
			},
			// 清空购物车
			async clearCart() {
				let skuIdList = []
				if (this.cartList.length > 0) {
					this.cartList.forEach(item => {
						skuIdList.push(item.skuId)
					})
					await this.$api.cart.delete({
						skuIdList: skuIdList
					});
				}
				this.handleNullCart()
			},
			// 更新购物车商品数据
			updateCartItemNum(item, num) {
				if (item.num + num < 0) {
					return
				}
				item.num += num
				this.$api.cart.add({
					spuId: item.spuId,
					skuId: item.skuId,
					num: num
				});
				this.cartList = this.cartList.filter(e => e.num > 0)
				if (this.cartList.length === 0) {
					this.handleNullCart()
				} else {
					this.$emit("initCartList", this.cartList);
				}
			},
			handleNullCart() {
				// 如果所有sku都被处理完了，则关闭弹出框
				this.cartList = []
				this.isShowDetail = false
				this.$emit("initCartList", this.cartList);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		// background-color: skyblue;
		float: left;

		.cart-box {
			position: absolute;
			z-index: 9999; // 层叠顺序
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 90rpx;
			left: 0rpx;
			right: 0rpx;
			bottom: 0rpx;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
			background-color: #FFFFFF;
			// border-radius: 45rpx;

			.left {
				flex: 1;
				display: flex;

				.cart {
					position: relative;

					.icon {
						margin-left: 50rpx;
					}

					.num {
						position: absolute;
						background-color: red;
					}
				}

				.price {
					display: flex;
					align-items: center;
					margin-left: 20rpx;
				}
			}


			.pay {
				height: 90rpx;
				width: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				// border-radius: 0 50rpx 50rpx 0;
				background-color: $color-primary;
			}
		}

		.cart-popup {
			position: absolute;
			bottom: 90rpx; // 这个属性只在uniapp上生效，小程序需 custom-style
			// left: 0rpx;
			// right: 0rpx;
			z-index: 1; // 层叠顺序

			// min-height: 300rpx;
			// max-height: 500rpx;
			// height: 800rpx;

			.top {
				background-color: $bg-color-primary;
				color: $color-primary;
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				text-align: right;
			}

			.cart-list {
				background-color: #FFFFFF;
				width: 100%;
				// min-height: 150rpx;
				max-height: 500rpx;

				.wrapper {
					height: 100%;
					display: flex;
					flex-direction: column;
					padding: 0 30rpx;
					// margin-bottom: 100rpx;

					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 15rpx 0;
						position: relative;

						&::after {
							content: ' ';
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
							background-color: $border-color;
							height: 2rpx;
							transform: scaleY(.6);
						}

						.image {
							width: 60rpx;
							height: 60rpx;
							margin-right: 10rpx;
						}

						.left {
							flex: 1;
							display: flex;
							flex-direction: column;
							overflow: hidden;
							margin-right: 30rpx;

							.name {
								font-size: $font-size-sm;
								color: $text-color-base;
							}

							.spec-desc {
								color: $text-color-assist;
								font-size: $font-size-sm;
								overflow: hidden;
								text-overflow: ellipsis; // 多行文本下，用省略号… 隐藏超出范围的文本
								white-space: nowrap; // 不换行
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

							.btn {
								width: 46rpx;
								height: 46rpx;
								border-radius: 100%;
								padding: 0;
								text-align: center;
								line-height: 46rpx;
							}

							.num {
								font-size: $font-size-base;
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
	}
</style>
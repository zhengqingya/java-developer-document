<template>
	<view class="app-container">
		<uni-segmented-control class="tab" :current="currentTab" :values="['今日订单',  '历史订单']" @clickItem="clickTab"
			styleType="text" activeColor="#ffaa00"></uni-segmented-control>
		<u-gap height="3" bg-color="#ffffff" />
		<scroll-view class="content" scroll-with-animation scroll-y="true">
			<view v-if="orderList.length==0">
				<u-empty mode="order" marginTop="100rpx" />
			</view>
			<view v-else class="order" v-for="(orderItem, index) in orderList" :key="index">
				<u-count-down v-if="orderItem.orderStatus===1" :time="getUnPayTime(orderItem.unPayEndTime)"
					format="mm:ss" />
				<view class="title">
					<view class="left">
						<view>天府三街测试店</view>
						<view class="take-type">堂食</view>
					</view>
					<navigator :url="'/pages/order/detail?orderNo='+orderItem.orderNo">
						<view class="right">{{orderItem.orderStatusName}}</view>
					</navigator>
				</view>
				<view class="spu-box">
					<view class="item" v-for="(spu, index) in orderItem.spuList" :key="index">
						<view class="spu-info">
							<image :src="spu.coverImg" />
							<view class="right">
								<view class="name">{{spu.name}}</view>
								<view class="price">￥{{spu.price/100}}</view>
								<view class="num">x{{spu.num}}</view>
							</view>
						</view>
						<view class="line" />
					</view>
				</view>
				<view class="spu-bottom">
					<view class="time">下单时间：{{orderItem.createTime}}</view>
					<view class="sum-price">实付：￥{{orderItem.payPrice/100}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				orderList: []
			};
		},
		onLoad() {
			this.orderPage(1)
		},
		methods: {
			clickTab(e) {
				switch (e.currentIndex) {
					case 0:
						// 今日订单
						this.orderPage(1)
						break;
					case 1:
						// 历史订单
						this.orderPage(2)
						break;
					default:
						break;
				}
			},
			async orderPage(dataType) {
				let result = await this.$api.order.page({
					dataType: dataType
				});
				this.orderList = result.records
			},
			getUnPayTime(unPayEndTime) {
				let time = new Date(unPayEndTime).getTime() - new Date().getTime()
				return time
			}
		}
	}
</script>

<style lang="scss">
	.app-container {
		background-color: $bg-color;

		.tab {}

		.content {
			// padding: 10rpx 10rpx;
			width: 100%;
			height: 100%;

			.order {
				margin: 10rpx;
				border-radius: 30rpx;
				background-color: white;

				.un-pay-time,
				.title,
				.spu-box,
				.spu-bottom {
					padding: 0rpx 20rpx;

				}

				.title {
					display: flex;
					justify-content: space-between;
					font-size: $font-size-lg;
					height: 80rpx;
					line-height: 80rpx;


					.left {
						display: flex;
						font-weight: bold;

						.take-type {
							font-size: $font-size-sm;
							color: $text-color-assist;
							margin-left: 10rpx;
						}
					}

					.right {
						font-size: $font-size-lg;
						font-weight: bold;
					}
				}

				.spu-box {
					.item {
						.spu-info {
							display: flex;
							justify-content: space-between;

							image {
								padding: 0rpx 10rpx;
								width: 110rpx;
								height: 110rpx;
							}

							.right {
								display: flex;
								flex-direction: column;
								align-items: flex-end;

								.name,
								.price {
									font-size: $font-size-base;
								}

								.num {
									color: $text-color-assist;
									font-size: $font-size-sm;
								}
							}
						}

						.line {
							border-bottom: 1rpx $border-color dashed;
							margin-bottom: 5rpx;
						}

						&:nth-last-child(1) {
							.line {
								border-bottom: 0rpx $border-color dashed;
							}
						}
					}




				}

				.spu-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time {
						font-size: $font-size-sm;
					}

					.sum-price {
						font-weight: bold;
						font-size: $font-size-base;
					}
				}
			}
		}
	}
</style>

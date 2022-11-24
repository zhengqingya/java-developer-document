<template>
	<view class="app-container">
		<uni-row class="header">
			<uni-col :span="18">
				<view>
					<text>天府三街测试店</text>
					<uni-icons type="right" size="15" />
				</view>
				<view class="location">
					<uni-icons type="location" size="15" />
					<text>距离您 1km</text>
				</view>
			</uni-col>
			<uni-col :span="6">
				<view class="right">
					<view class="takein" :class="{active: orderType == 'takein'}">
						<text>自取</text>
					</view>
					<view class="takeout" :class="{active: orderType == 'takeout'}">
						<text>外卖</text>
					</view>
				</view>
			</uni-col>
		</uni-row>

		<uni-row class="content">
			<uni-col :span="6" class="category">
				<scroll-view scroll-with-animation scroll-y="true">
					<view>
						<view class="item" v-for="(item, index) in reSpuList" :key="index"
							@tap="chooseCategory(item.id)" :class="{'choose': item.id === chooseCategoryId}">
							<text>{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
			</uni-col>
			<uni-col :span="18">
				<view class="spu">
					<view v-for="(item, index) in reSpuList" :key="index">
						<view class="title">
							<text>{{ item.name }}</text>
						</view>
						<view class="spuList">
							<view class="item" v-for="(item, index) in item.spuList" :key="index">
								<uni-row>
									<uni-col :span="8">
										<image class="image" :src="item.coverImg" />
									</uni-col>
									<uni-col :span="16">
										<view class="right">
											<view><text>{{ item.name }}</text></view>
											<view class="price-action">
												<text class="price">{{ item.skuList[0].sellPrice }}</text>
												<view class="action">
													+
												</view>

											</view>
										</view>
									</uni-col>
								</uni-row>
							</view>
						</view>
					</view>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderType: 'takein',
				reSpuList: [],
				chooseCategoryId: 0
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				this.reSpuList = await this.$api.category.reSpuList();
				if (this.reSpuList) {
					this.chooseCategoryId = this.reSpuList[0].id
				}
			},
			chooseCategory(id) {
				this.chooseCategoryId = id
			},
			//详情
			goToDetail(item) {
				uni.navigateTo({
					url: `/pages/product/product?id=${item.id}`
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		overflow: hidden;
		// background-color: #aaffff;

		.header {
			padding: 5px 5px;

			.location {
				margin-top: 3px;
				font-size: 10px;
				color: #919293;
			}

			.right {
				display: flex;
				margin-top: 10px;

				.takein,
				.takeout {
					text-align: center;
					width: 120rpx;
					color: #ceac93;
					background-color: #f5f5f5;
					// border-radius: 30rpx;
				}

				.takein.active {
					background-color: $color-primary;
					color: white;
				}

				.takeout.active {
					background-color: $color-primary;
					color: white;
				}
			}
		}

		.content {
			height: 100%;
			margin-top: 10px;
			$chooce-font-color: #5a5b5c;

			.category {
				height: 100%;
				background-color: #f5f5f5;
				color: #c1c1c1;
				font-size: 30rpx;

				.item {
					padding: 10rpx 20rpx;

					&.choose {
						background-color: #ffffff;
						color: $chooce-font-color;
					}
				}
			}

			.spu {
				margin-left: 20rpx;

				.title {
					color: $chooce-font-color;
					font-size: 30rpx;
				}

				.spuList {
					.item {
						margin-top: 3px;

						.image {
							width: 160rpx;
							height: 160rpx;
						}

						.right {
							height: 160rpx;
							width: 100%;

							.price {
								float: left;
								margin-top: 35px;
								font-size: 30rpx;
								font-weight: 600;
							}

							.action {
								float: right;
								margin-top: 35px;
								margin-right: 20px;
								width: 20px;
								height: 20px;
								background-color: $color-primary;
								border-radius: 20rpx;
								text-align: center;
								line-height: 16px;
								color: white;

							}

						}
					}

				}
			}



		}
	}
</style>

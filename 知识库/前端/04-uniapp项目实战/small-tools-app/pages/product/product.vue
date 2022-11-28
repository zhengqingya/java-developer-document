<template>
	<view class="app-container">
		<view class="header">
			<view class="left">
				<view>
					<text>天府三街测试店</text>
					<uni-icons type="right" size="15" />
				</view>
				<view class="location">
					<uni-icons type="location" size="15" />
					<text>距离您 1km</text>
				</view>
			</view>
			<view class="right">
				<view class="takein" :class="{active: orderType == 'takein'}">
					<text>自取</text>
				</view>
				<view class="takeout" :class="{active: orderType == 'takeout'}">
					<text>外卖</text>
				</view>
			</view>
		</view>

		<view class="content">
			<scroll-view class="category" scroll-with-animation scroll-y="true">
				<view class="item" v-for="(item, index) in reSpuList" :key="index" @tap="hanleCategoryTap(item.id)"
					:class="{'choose': item.id === currentCategoryId}">
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>

			<scroll-view class="spu" scroll-with-animation scroll-y :scroll-top="cateScrollTop"
				@scroll="handleSpuScroll">
				<view id="ads"></view>
				<view :id="`cate-${item.id}`" class="list" v-for="(item, index) in reSpuList" :key="index">
					<view class="title">
						<text>{{ item.name }}</text>
					</view>
					<view>
						<view class="good" v-for="(good, index) in item.spuList" :key="index">
							<view class="left">
								<image class="image" :src="good.coverImg" />
							</view>
							<view class="right">
								<text class="name">{{ good.name }}</text>
								<view class="price-action">
									<text class="price">￥{{ good.skuList[0].sellPrice }}</text>
									<view class="action">
										<button class="btn property_btn" @tap="showGoodDetailModal(item, good)">
											选规格
										</button>
										<view class="dot">
											1
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderType: 'takein',
				reSpuList: [],
				currentCategoryId: 0,
				cateScrollTop: 0,
				sizeCalcState: false
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				this.reSpuList = await this.$api.category.reSpuList();
				if (this.reSpuList) {
					this.currentCategoryId = this.reSpuList[0].id
				}
			},
			// 点击左侧分类时，动态滑动右侧数据到关联分类位置
			hanleCategoryTap(id) {
				if (!this.sizeCalcState) {
					this.calcSize()
				}
				this.currentCategoryId = id
				this.$nextTick(() => this.cateScrollTop = this.reSpuList.find(item => item.id == id).top)
			},
			// 右侧商品滚动时触发
			handleSpuScroll({
				detail
			}) {
				if (!this.sizeCalcState) {
					this.calcSize()
				}
				const {
					scrollTop
				} = detail
				let tabs = this.reSpuList.filter(item => item.top <= scrollTop).reverse()
				if (tabs.length > 0) {
					this.currentCategoryId = tabs[0].id
				}
			},
			calcSize() {
				// 高度
				let h = 0

				let view = uni.createSelectorQuery().select('#ads')
				view.fields({
					size: true
				}, data => {
					h += Math.floor(data.height)
				}).exec()

				this.reSpuList.forEach(item => {
					let view = uni.createSelectorQuery().select(`#cate-${item.id}`)
					view.fields({
						size: true
					}, data => {
						item.top = h
						h += data.height
						item.bottom = h
					}).exec()
				})
				this.sizeCalcState = true
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
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		// background-color: #ffff2c;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60rpx;
			padding: 5px 5px;

			.left {
				flex: 1;

				.location {
					margin-top: 3px;
					font-size: 10px;
					color: #919293;
				}
			}

			.right {
				display: flex;

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
			flex: 1;
			display: flex;
			height: 100%;
			$chooce-font-color: #5a5b5c;
			// background-color: #aaffff;

			.category {
				width: 180rpx;
				height: 100%;
				background-color: #aaffff;
				height: 100%;
				background-color: #f5f5f5;
				color: #c1c1c1;



				.item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding: 10rpx 10rpx;
					font-size: 30rpx;


					&.choose {
						background-color: #ffffff;
						color: $chooce-font-color;
					}
				}
			}

			.spu {
				flex: 1;
				padding: 20rpx;

				.list {
					.title {
						color: $chooce-font-color;
						font-size: 30rpx;
					}

					.good {
						display: flex;
						align-items: center;
						margin-top: 3px;

						.left {
							.image {
								width: 160rpx;
								height: 160rpx;
								border-radius: 10rpx;
							}
						}

						.right {
							flex: 1;
							height: 160rpx;
							overflow: hidden;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: space-between;
							padding: 0 15rpx;
							// background-color: #aaffff;

							.name {
								font-size: 28rpx;
								margin-bottom: 10rpx;
							}

							.price-action {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.price {
									font-size: 26rpx;
									font-weight: 600;
								}

								.action {
									display: flex;
									justify-content: space-between;
									align-items: center;
									position: relative;

									.btn {
										padding: 0 20rpx;
										box-sizing: border-box;
										font-size: 28rpx;
										height: 44rpx;
										line-height: 44rpx;
										background-color: $color-primary;
										color: white;
										font-size: 26rpx;

										&.property_btn {
											border-radius: 24rpx;
										}
									}

									.dot {
										position: absolute;
										background-color: #ffffff;
										border: 1px solid $color-primary;
										color: $color-primary;
										font-size: 28rpx;
										width: 36rpx;
										height: 36rpx;
										line-height: 36rpx;
										text-align: center;
										border-radius: 100%;
										right: -12rpx;
										top: -10rpx;
									}
								}
							}
						}
					}

				}
			}



		}
	}
</style>

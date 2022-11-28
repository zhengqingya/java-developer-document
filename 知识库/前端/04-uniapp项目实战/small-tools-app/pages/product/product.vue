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
				<view class="list">
					<view :id="`cate-${item.id}`" v-for="(item, index) in reSpuList" :key="index">
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
											<button class="btn property_btn" @tap="showSpuDetailModal(item, good)">
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
				</view>
			</scroll-view>
		</view>

		<!-- 购物车 -->
		<view class="cart" v-if="cart.length == 0">
			<view @tap="openCartPopup">
				<uni-badge :text="22" absolute="rightTop" type="warning">
					<uni-icons class="icon" type="cart" size="22" />
				</uni-badge>
			</view>
			<view class="price">￥10</view>
			<view class="pay">付款</view>
		</view>


		<view>
			<!--  商品详情  -->
			<modal :show="goodDetailModalVisible" class="good-detail-modal" color="#5A5B5C" width="90%" custom
				padding="0rpx" radius="12rpx">
				<view class="cover">
					<image :src="good.coverImg" class="image"></image>
					<view class="close">
						<uni-icons type="closeempty" @tap="closeSpuDetailModal" />
					</view>
				</view>
				<scroll-view class="detail" scroll-y>
					<view class="wrapper">
						<view class="basic">
							<view class="name">{{ good.name }}</view>
						</view>
						<view class="properties">
							<view class="property" v-for="(item, index) in good.attrList" :key="index">
								<view class="title">
									<text class="name">{{ item.attrKeyName }}</text>
									<view class="desc" v-if="item.attrKeyName">({{ item.attrKeyName }})</view>
								</view>
								<view class="values">
									<view class="value" :class="{'default': value.is_default}"
										v-for="(value, key) in item.attrValueList" :key="key"
										@tap="changePropertyDefault(index, key)">
										{{ value.attrValueName }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="action">
					<view class="left">
						<view class="price">￥{{ good.sellPrice }}</view>
						<view class="props">
							{{ currentAttrDesc }}
						</view>
					</view>
					<view class="btn-group">
						<button type="default" plain class="btn" size="mini" hover-class="none"
							@tap="handlePropertyReduce">
							<view>-</view>
						</button>
						<view class="number">{{ good.number }}</view>
						<button type="primary" class="btn btn-right" size="min" hover-class="none"
							@tap="handlePropertyAdd">
							+
						</button>
					</view>
				</view>
				<view class="add-to-cart-btn" @tap="handleAddToCartInModal">
					<view>加入购物车</view>
				</view>
			</modal>

			<!-- 购物车详情 -->
			<uni-popup ref="cartPopupVisible" type="bottom">
				<view class="cart-popup">
					<view>
						<view class="top">
							<text @tap="handleCartClear">清空</text>
						</view>
						<scroll-view class="cart-list" scroll-y>
							<view class="wrapper">
								<view class="item" v-for="(item, index) in 10" :key="index">
									<view class="left">
										<view class="name">11</view>
										<view class="props">222</view>
									</view>
									<view class="center">
										<text>￥111</text>
									</view>
									<view class="right">
										<button type="default" plain size="mini" class="btn" hover-class="none"
											@tap="handleCartItemReduce(index)">
											<view>-</view>
										</button>
										<view class="number">1</view>
										<button type="primary" class="btn" size="min" hover-class="none"
											@tap="handleCartItemAdd(index)">
											+
										</button>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</uni-popup>
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
				good: {},
				category: {},
				cateScrollTop: 0,
				sizeCalcState: false,
				goodDetailModalVisible: false,
				currentAttrDesc: "",
				cart: [],
				cartPopupVisible: false,
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
			// 商品详情
			async showSpuDetailModal(item, good) {
				this.good = await this.$api.spu.detail(good.id);
				// this.good = JSON.parse(JSON.stringify({
				// 	...good,
				// 	number: 1
				// }))
				this.good.number = 1
				// console.log(this.good)
				this.category = JSON.parse(JSON.stringify(item))
				this.goodDetailModalVisible = true
			},
			closeSpuDetailModal() {
				this.goodDetailModalVisible = false
			},
			changePropertyDefault(index, key) {
				this.good.attrList[index].attrValueList.forEach(value => this.$set(value, 'is_default', 0))
				this.good.attrList[index].attrValueList[key].is_default = 1
				this.good.number = 1
				this.getGoodSelectedProps()
			},
			getGoodSelectedProps() {
				let attrDescList = []
				this.good.attrList.forEach(attr => {
					attr.attrValueList.forEach(value => {
						if (value.is_default) {
							attrDescList.push(value.attrValueName)
						}
					})
				})
				this.currentAttrDesc = attrDescList.join('，')
			},
			handlePropertyAdd() {
				this.good.number += 1
			},
			handlePropertyReduce() {
				if (this.good.number === 1) return
				this.good.number -= 1
			},
			openCartPopup() {
				this.cartPopupVisible = !this.cartPopupVisible
				if (this.cartPopupVisible) {
					this.$refs.cartPopupVisible.open()
				} else {
					this.$refs.cartPopupVisible.close()
				}
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
					padding-bottom: 60rpx;

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


		.good-detail-modal {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.cover {
				height: 220rpx;
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.image {
					width: 200rpx;
					height: 200rpx;
				}

				.close {
					position: absolute;
					right: 10rpx;
					top: 10rpx;
				}
			}

			.detail {
				min-height: 1vh;
				max-height: calc(90vh - 320rpx - 80rpx - 120rpx);

				.wrapper {
					width: 100%;
					height: 100%;
					overflow: hidden;

					.basic {
						padding: 0 20rpx 30rpx;
						display: flex;
						flex-direction: column;

						.name {
							font-size: 28rpx;
							color: #5A5B5C;
							margin-bottom: 10rpx;
						}
					}

					.properties {
						width: 100%;
						border-top: 2rpx solid #F5F5F5;
						padding: 10rpx 30rpx 0;
						display: flex;
						flex-direction: column;

						.property {
							width: 100%;
							display: flex;
							flex-direction: column;
							margin-bottom: 30rpx;
							padding-bottom: -16rpx;

							.title {
								width: 100%;
								display: flex;
								justify-content: flex-start;
								align-items: center;
								margin-bottom: 20rpx;

								.name {
									font-size: 26rpx;
									color: #5A5B5C;
									margin-right: 20rpx;
								}

								.desc {
									flex: 1;
									font-size: 28rpx;
									color: $color-primary;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}

							.values {
								width: 100%;
								display: flex;
								flex-wrap: wrap;

								.value {
									border-radius: 8rpx;
									background-color: #F5F5F5;
									padding: 16rpx 30rpx;
									font-size: 26rpx;
									color: #919293;
									margin-right: 16rpx;
									margin-bottom: 16rpx;

									&.default {
										background-color: $color-primary;
										color: white;
									}
								}
							}
						}
					}
				}
			}

			.action {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #F5F5F5;
				height: 120rpx;
				padding: 0 26rpx;

				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-right: 20rpx;
					overflow: hidden;

					.price {
						font-size: 28rpx;
						color: #5A5B5C;
					}

					.props {
						color: #919293;
						font-size: 24rpx;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.btn-group {
					display: flex;
					align-items: center;
					justify-content: space-around;

					.number {
						font-size: 28rpx;
						width: 44rpx;
						height: 44rpx;
						line-height: 44rpx;
						text-align: center;
					}

					.btn {
						padding: 0;
						font-size: 28rpx;
						width: 44rpx;
						height: 44rpx;
						line-height: 44rpx;
						border-radius: 100%;

						&.btn-right {
							background-color: $color-primary;
						}
					}
				}
			}

			.add-to-cart-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: $color-primary;
				color: white;
				font-size: 28rpx;
				height: 80rpx;
				border-radius: 0 0 12rpx 12rpx;
			}
		}

		.cart {
			position: absolute;
			display: flex;
			justify-content: space-around;
			align-items: center;
			z-index: 9999;
			height: 90rpx;
			left: 30rpx;
			right: 30rpx;
			bottom: 10rpx;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
			background-color: #FFFFFF;
			border-radius: 45rpx;

			.icon {
				margin-left: 50rpx;
			}

			.price {
				flex: 1;
				margin-left: 20rpx;
			}

			.pay {
				height: 90rpx;
				width: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				border-radius: 0 50rpx 50rpx 0;
				background-color: $color-primary;
			}
		}

		.cart-popup {
			// height: 100rpx;
			background-color: red;

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
				overflow: hidden;
				min-height: 1vh;
				max-height: 60vh;

				.wrapper {
					height: 100%;
					display: flex;
					flex-direction: column;
					padding: 0 30rpx;
					margin-bottom: 156rpx;

					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0;
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

							.props {
								color: $text-color-assist;
								font-size: 24rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
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

							.number {
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

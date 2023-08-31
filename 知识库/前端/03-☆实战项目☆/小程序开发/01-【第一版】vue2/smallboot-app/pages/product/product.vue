<template>
	<view class="app-container">
		<!-- 	<view class="header">
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
		</view> -->

		<view class="content">
			<scroll-view class="category" scroll-with-animation scroll-y="true">
				<view class="item" v-for="(item, index) in reSpuList" :key="index" @tap="hanleCategoryTap(item.id)"
					:class="{'choose': item.id === currentCategoryId}">
					<view class="name">
						<view>{{ item.name }}</view>
						<u-badge :absolute="true" :offset="[-8,-30]" :count="getCategoryCartNum(item.id)"
							:overflow-count="99" />
					</view>
				</view>
			</scroll-view>

			<scroll-view class="spu" scroll-with-animation scroll-y :scroll-top="categoryScrollTop"
				@scroll="handleSpuScroll">
				<view id="ads"></view>
				<view class="list">
					<view class="spu-box" :id="`cate-${item.id}`" v-for="(item, index) in reSpuList" :key="index">
						<view class="title">
							<text>{{ item.name }}</text>
						</view>
						<view>
							<view class="spu-item" v-for="(spuItem, index) in item.spuList" :key="index">
								<view class="left">
									<image class="image" :src="spuItem.coverImg" />
								</view>
								<view class="right">
									<text class="name">{{ spuItem.name }}</text>
									<text class="stock">库存：{{ spuItem.usableStockSum }}</text>
									<view class="price-action">
										<text class="price">￥{{ spuItem.skuList[0].sellPrice/100 }}</text>
										<view class="action">
											<button class="choose-attr" @tap="showSpuDetailModal(item, spuItem)">
												选规格
											</button>
											<u-badge bgColor="white" color="#409EFF" :absolute="true"
												:offset="[-10,-10]" :count="getSkuNum(spuItem) " :overflow-count="99" />
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
		<view>
			<cart ref="cart" @initCartList="initCartList" />
		</view>
		<!--  商品详情  -->
		<view>
			<sku ref="sku" @close="handleCloseSkuChoose" />
		</view>

	</view>
</template>

<script>
	import cart from './component/cart.vue'
	import sku from './component/sku.vue'

	export default {
		components: {
			cart,
			sku
		},
		data() {
			return {
				orderType: 'takein', // 堂食：takein  外卖：takeout
				reSpuList: [], // 分类关联的商品列表数据
				currentCategoryId: 0, // 当前分类id
				spu: {}, // 当前选择的商品
				categoryScrollTop: 0, // 竖向滚动条位置 
				cartList: [], // 购物车数据
			}
		},
		onLoad() {

		},
		// 页面显示就触发
		onShow() {
			this.init()
		},
		methods: {
			async init() {
				this.reSpuList = await this.$api.category.reSpuList();
				if (this.reSpuList) {
					this.currentCategoryId = this.reSpuList[0].id
				}
				this.showCart()
			},
			// 购物车
			async showCart() {
				// 延时500毫秒，防止数据库未及时更新数据
				setTimeout(() => {
					this.$refs.cart.init()
				}, 500);
			},
			initCartList(cartList) {
				this.cartList = cartList
			},
			// 点击左侧分类时，动态滑动右侧数据到关联分类位置
			hanleCategoryTap(id) {
				this.calcSize()
				this.currentCategoryId = id
				this.$nextTick(() => this.categoryScrollTop = this.reSpuList.find(item => item.id == id).top)
			},
			// 右侧商品滚动时触发
			handleSpuScroll({
				detail
			}) {
				this.calcSize()
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
			},
			// 商品在购物车中的数量
			getSkuNum(spuItem) {
				return this.cartList.filter(e => e.spuId === spuItem.id).reduce((total, item) => total += item.num, 0)
			},
			// 指定分类下所有商品在购物车中的数量
			getCategoryCartNum(categoryId) {
				let sum = 0;
				this.reSpuList.forEach(e => {
					if (e.id === categoryId) {
						let spuIdList = e.spuList.map(item => item.id)
						sum = this.cartList.filter(e => spuIdList.includes(e.spuId)).reduce((total, item) =>
							total +=
							item
							.num, 0);
						return
					}
				})
				return sum;
			},
			// 选规格-商品详情
			async showSpuDetailModal(item, spu) {
				this.spu = await this.$api.spu.detail(spu.id);
				this.spu.num = 1
				this.$refs.sku.show(this.spu)
			},
			// 关闭sku选择时触发
			handleCloseSkuChoose() {
				this.showCart()
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
			height: 70rpx;
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
			// height: 100%;
			$chooce-font-color: #5a5b5c;
			// background-color: #aaffff;

			.category {
				width: 180rpx;
				height: 100%;
				background-color: #aaffff;
				background-color: #f5f5f5;
				color: #c1c1c1;



				.item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding: 10rpx 10rpx;
					font-size: 30rpx;
					height: 80rpx;

					&.choose {
						background-color: #ffffff;
						color: $chooce-font-color;
					}

					.name {
						position: relative;
					}
				}
			}

			.spu {
				flex: 1;
				padding: 20rpx;

				.list {
					padding-bottom: 60rpx;

					.spu-box {
						.title {
							color: $chooce-font-color;
							font-size: 30rpx;
						}

						.spu-item {
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

								.stock {
									font-size: 20rpx;
									color: gray;
									// margin-bottom: -40rpx;
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

										.choose-attr {
											padding: 0 20rpx;
											height: 44rpx;
											line-height: 44rpx;
											background-color: $color-primary;
											color: white;
											font-size: $font-size-sm;
											border-radius: 24rpx;
										}

										.num {
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

						&:nth-last-child(1) {
							margin-bottom: 100rpx;
						}
					}
				}
			}
		}

	}
</style>
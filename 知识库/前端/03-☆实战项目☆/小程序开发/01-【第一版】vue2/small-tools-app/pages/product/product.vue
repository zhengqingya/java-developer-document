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
									<view class="price-action">
										<text class="price">￥{{ spuItem.skuList[0].sellPrice/100 }}</text>
										<view class="action">
											<button class="choose-attr" @tap="showSpuDetailModal(item, spuItem)">
												选规格
											</button>
											<view class="num" v-if="getSkuNum(spuItem) > 0">
												{{ getSkuNum(spuItem) }}
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
		<view class="cart" v-show="cartList.length > 0">
			<view @tap="openCartPopup">
				<uni-badge :text="cartList.reduce((total, item) => total += item.num, 0)" absolute="rightTop"
					type="warning">
					<uni-icons class="icon" type="cart" size="22" />
				</uni-badge>
			</view>
			<view class="price">￥{{cartList.reduce((total, item) => total += (item.num*item.price), 0)/100}}</view>
			<navigator :url="'/pages/product/pay'">
				<view class="pay">付款</view>
			</navigator>
		</view>


		<view>
			<!--  商品详情  -->
			<modal :show="spuDetailShow" class="spu-detail" color="#5A5B5C" width="90%" custom padding="0rpx"
				radius="12rpx">
				<view class="cover">
					<image :src="spu.coverImg" class="image"></image>
					<view class="close">
						<uni-icons type="closeempty" @tap="spuDetailShow = false" />
					</view>
				</view>
				<scroll-view class="detail" scroll-y>
					<view class="wrapper">
						<view class="basic">
							<view class="name">{{ spu.name }}</view>
						</view>
						<view class="attrList">
							<view class="attr" v-for="(item, index) in spu.attrList" :key="index">
								<view class="title">
									<text class="name">{{ item.attrKeyName }}</text>
									<view class="desc" v-if="item.attrKeyName">({{ item.attrKeyName }})</view>
								</view>
								<view class="values">
									<view class="value" :class="{'default': value.isChoose}"
										v-for="(value, key) in item.attrValueList" :key="key"
										@tap="chooseSku(index, key)">
										{{ value.attrValueName }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="action">
					<view class="left">
						<view class="price">￥{{ spu.sellPrice/100 }}</view>
						<view class="spec-desc">
							{{ calSkuSpecDesc() }}
						</view>
					</view>
					<view class="right">
						<button type="default" plain class="btn" size="mini" hover-class="none"
							@tap="updateSkuNum(-1)">-</button>
						<view class="number">{{ spu.num }}</view>
						<button type="primary" class="btn btn-right" size="min" hover-class="none"
							@tap="updateSkuNum(+1)">+</button>
					</view>
				</view>
				<view class="add-cart" @tap="addCart">
					加入购物车
				</view>
			</modal>

			<!-- 购物车详情 -->
			<uni-popup ref="cartPopupVisible" type="bottom">
				<view class="cart-popup">
					<view>
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
				orderType: 'takein', // 堂食：takein  外卖：takeout
				reSpuList: [], // 分类关联的商品列表数据
				currentCategoryId: 0, // 当前分类id
				spu: {}, // 当前选择的商品
				categoryScrollTop: 0, // 竖向滚动条位置
				spuDetailShow: false, // 商品选规格时的详情框是否显示
				cartList: [], // 购物车数据
				cartPopupVisible: false, // 购物车弹出层
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
				this.getCartList()
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
			// 选规格-商品详情
			async showSpuDetailModal(item, spu) {
				this.spu = await this.$api.spu.detail(spu.id);
				this.spu.num = 1
				this.spuDetailShow = true
			},
			// 选sku
			chooseSku(index, key) {
				this.spu.attrList[index].attrValueList.forEach(value => this.$set(value, 'isChoose', 0))
				this.spu.attrList[index].attrValueList[key].isChoose = 1
				this.calSkuSpecDesc()
			},
			calSkuSpecDesc() {
				let attrDescList = []
				if (this.spu.attrList) {
					this.spu.attrList.forEach(attr => {
						attr.attrValueList.forEach(value => {
							if (value.isChoose) {
								attrDescList.push(value.attrValueName)
							}
						})
					})
				}
				return attrDescList.join(',')
			},
			// 加入购物车
			addCart() {
				// 确认sku-id
				let specList = []
				let skuId = null;
				let skuPrice = null;
				this.spu.attrList.forEach(attr => {
					attr.attrValueList.forEach(value => {
						if (value.isChoose) {
							// 这里是选择的sku
							specList.push({
								"attrKeyId": attr.attrKeyId,
								"attrKeyName": attr.attrKeyName,
								"attrValueId": value.attrValueId,
								"attrValueName": value.attrValueName
							})
						}
					})
				})
				this.spu.skuList.forEach(sku => {
					let skuReSpecList = sku.specList
					if (JSON.stringify(skuReSpecList) == JSON.stringify(specList)) {
						skuId = sku.id
						skuPrice = sku.sellPrice
					}
				})
				if (skuId == null) {
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: '请选择sku！'
					});
					return
				}
				// 请求后端开始加入购物车数据
				this.$api.cart.add({
					spuId: this.spu.id,
					skuId: skuId,
					num: this.spu.num
				});
				this.cartList.push({
					spuId: this.spu.id,
					skuId: skuId,
					name: this.spu.name,
					num: this.spu.num,
					specDesc: this.calSkuSpecDesc(),
					price: skuPrice
				})
				this.spuDetailShow = false
			},
			updateSkuNum(num) {
				if (this.spu.num + num === 0) {
					return
				}
				this.spu.num += num
				this.num = this.spu.num
			},
			// 打开购物车列表框
			async openCartPopup() {
				this.cartPopupVisible = !this.cartPopupVisible
				if (this.cartPopupVisible) {
					await this.getCartList()
					this.$refs.cartPopupVisible.open()
				} else {
					this.$refs.cartPopupVisible.close()
				}
			},
			// 购物车数据
			async getCartList() {
				this.cartList = await this.$api.cart.list();
			},
			// 清空购物车
			clearCart() {
				let skuIdList = []
				if (this.cartList.length > 0) {
					this.cartList.forEach(item => {
						skuIdList.push(item.skuId)
					})
					this.$api.cart.delete({
						skuIdList: skuIdList
					});
				}
				this.cartList = []
				this.$refs.cartPopupVisible.close()
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
				if (this.cartList.filter(e => e.num > 0).length === 0) {
					// 如果所有sku都被处理完了，则关闭弹出框
					this.$refs.cartPopupVisible.close()
					this.cartList = []
				}
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


		.spu-detail {
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
						padding: 10rpx 30rpx;
						font-size: $font-size-base;
						color: #5A5B5C;
						margin-bottom: 10rpx;
					}

					.attrList {
						width: 100%;
						border-top: 2rpx solid #F5F5F5;
						padding: 10rpx 30rpx 0;
						display: flex;
						flex-direction: column;

						.attr {
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
									font-size: $font-size-base;
									color: #5A5B5C;
									margin-right: 20rpx;
								}

								.desc {
									flex: 1;
									font-size: $font-size-base;
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
									font-size: $font-size-base;
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
				height: 100rpx;
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

					.spec-desc {
						color: #919293;
						font-size: 24rpx;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.right {
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

			.add-cart {
				background-color: $color-primary;
				color: white;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: $font-size-base;
				border-radius: 0 0 12rpx 12rpx;
			}
		}

		.cart {
			position: absolute;
			z-index: 9999; // 层叠顺序
			display: flex;
			justify-content: space-around;
			align-items: center;
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
				min-height: 1vh;
				max-height: 60vh;

				.wrapper {
					height: 100%;
					display: flex;
					flex-direction: column;
					padding: 0 30rpx;
					margin-bottom: 200rpx;

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

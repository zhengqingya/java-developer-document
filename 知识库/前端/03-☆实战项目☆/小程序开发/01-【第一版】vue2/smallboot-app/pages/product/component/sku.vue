<template>
	<view class="app-container" v-if="isShow">
		<!--  商品详情  -->
		<u-popup v-model="isShow" @close="handleClose" :border-radius="10" mode="bottom" :closeable="true">
			<view class="top">
				<image :src="spu.coverImg" class="image"></image>
				<view class="spu-info">
					<view class="name">{{ spu.name }}</view>
					<view class="prince">
						<view v-if="chooseSkuData">
							￥{{ chooseSkuData.sellPrice/100 }}
						</view>
						<view v-else>
							<view v-if="spu.minPrice=spu.maxPrice">￥{{ spu.minPrice/100 }}</view>
							<view v-else>
								￥{{ spu.minPrice/100 }} - {{ spu.maxPrice/100 }} 元
							</view>
						</view>
					</view>
					<view class="stock">
						库存：{{ chooseSkuData ? chooseSkuData.usableStock : spu.usableStock }}</view>
				</view>
			</view>
			<scroll-view class="detail" scroll-y="true">
				<view class="wrapper">
					<view class="attrList" v-if="spu.attrList">
						<view class="attr" v-for="(item, index) in spu.attrList" :key="index">
							<view class="title">
								<text class="name">{{ item.attrKeyName }}</text>
								<!-- <view class="desc" v-if="item.attrKeyName">({{ item.attrKeyName }})</view> -->
							</view>
							<view class="values">
								<view class="value" :class="{'default': value.isChoose}"
									v-for="(value, key) in item.attrValueList" :key="key" @tap="chooseSku(index, key)">
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
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "sku",
		// props: {
		// 	spu: {
		// 		type: Object,
		// 		default: () => {},
		// 	},
		// },
		data() {
			return {
				isShow: false, // 商品选规格时的详情框是否显示
				chooseSkuData: null, // 选择的sku
				skuMap: null, // "X,蓝色" => sku
				spu: null
			}
		},
		methods: {
			async show(spu) {
				this.spu = spu
				this.isShow = true
				this.chooseSkuData = null

				function getGroupArrayObj(list, attr) {
					const map = new Map()
					list.forEach((item, index, arr) => {
						if (!map.has(item[attr])) {
							map.set(
								item[attr],
								arr.filter((a) => a[attr] == item[attr]),
							)
						}
					})
					const unique = (arrs) => {
						const res = new Map()
						return arrs.filter((arr) => !res.has(arr.attrValueName) && res.set(arr.attrValueName, 1))
					}
					return Array.from(map).map((item) => {
						let attrValueList = unique(item[1])
						return {
							attrKeyId: attrValueList[0].attrKeyId,
							attrKeyName: item[0],
							attrValueList: attrValueList
						}
					})
				}
				// 计算sku中包含的属性值
				let specList = []
				// console.log(111, this.spu)
				this.spu.skuList.forEach(skuItem => {
					skuItem.specList.forEach(specItem => {
						specList.push(specItem)
					})
				})
				this.spu.attrList = getGroupArrayObj(specList, 'attrKeyName')
				// console.log(111, this.spu.attrList)
				this.initSkuMap()
			},
			// 规格信息对应sku  "X,蓝色" => sku
			initSkuMap() {
				const map = new Map()
				this.spu.skuList.forEach(skuItem => {
					let attrValueNameList = []
					skuItem.specList.forEach(specItem => {
						attrValueNameList.push(specItem.attrValueName)
					})
					map.set(attrValueNameList.join(","), skuItem)
				})
				this.skuMap = map
				// console.log(1, map)
			},
			calSkuSpecDesc() {
				let attrDescList = []
				if (this.spu.attrList) {
					// console.log(1, this.spu.attrList)
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
			// 选sku
			chooseSku(index, key) {
				if (this.spu.attrList[index].attrValueList[key].isChoose === 1) {
					this.spu.attrList[index].attrValueList[key].isChoose = 0
					this.chooseSkuData = null
					return
				}
				this.spu.attrList[index].attrValueList.forEach(value => this.$set(value, 'isChoose', 0))
				this.spu.attrList[index].attrValueList[key].isChoose = 1
				let attrDesc = this.calSkuSpecDesc()
				// 确认所需 sku-id
				this.chooseSkuData = this.skuMap.get(attrDesc)
				// console.log(111, this.chooseSkuData)
			},
			// 加入购物车
			addCart() {
				if (this.chooseSkuData == null) {
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
					skuId: this.chooseSkuData.id,
					num: this.spu.num
				});
				// this.cartList.push({
				// 	spuId: this.spu.id,
				// 	skuId: this.chooseSkuData.id,
				// 	name: this.spu.name,
				// 	num: this.spu.num,
				// 	specDesc: this.calSkuSpecDesc(),
				// 	price: this.chooseSkuData.sellPrice
				// })
				this.handleClose()
			},
			updateSkuNum(num) {
				if (this.spu.num + num === 0) {
					return
				}
				this.spu.num += num
				this.num = this.spu.num
			},
			handleClose() {
				this.$emit('close', false)
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		// height: 500px;
		overflow-y: scroll; // 超出滚动

		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;


		.top {
			height: 220rpx;
			padding: 30rpx 0;
			display: flex;
			// justify-content: center;
			// align-items: center;
			position: relative;

			.image {
				width: 150rpx;
				height: 150rpx;
				margin-left: 30rpx;
			}

			.spu-info {
				margin-left: 30rpx;

				.name {
					// padding: 10rpx 30rpx;
					font-size: 32rpx;
					font-weight: 700;
				}

				.prince {
					// font-size: 20rpx;
					margin-top: 10rpx;
					font-weight: 700;
					color: #ff1929;
				}

				.stock {
					margin-top: 10rpx;
					font-size: 20rpx;
				}
			}

		}

		.detail {
			min-height: 1vh;
			max-height: calc(90vh - 320rpx - 80rpx - 120rpx);

			.wrapper {
				// width: 100%;
				// height: 100%;
				// overflow: hidden;


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
</style>
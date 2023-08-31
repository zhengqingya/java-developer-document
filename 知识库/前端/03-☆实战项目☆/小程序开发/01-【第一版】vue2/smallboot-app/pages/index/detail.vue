<template>
	<view class="app-container">
		<!-- 轮播图 -->
		<u-swiper :list="state.detailData.slideImgList" keyName="url" indicator indicatorMode="line"
			circular></u-swiper>

		<view class="subject">
			<view>
				<view class="name">{{state.detailData.name}}</view>
				<view class="use-stock">已售：{{state.detailData.useStock}}</view>
			</view>
			<view class="price">¥ {{state.detailData.sellPrice/100}}</view>
		</view>

		<view class="content">
			<view class="item"><text class="left">类型</text> <text>{{state.detailData.typeName}}</text></view>
			<view class="item"><text class="left">运费</text> <text>{{state.detailData.freight}}元</text></view>
		</view>

		<u-loadmore status="nomore" line height="50rpx" nomoreText="商品详情" />

		<view class="detail-img">
			<image class="img" v-for="(item, index) in state.detailData.detailImgList" :key="index" :src="item.url" />
		</view>

		<view class="bottom">
			<u-button type="error" text="购买" @click="openSkuPopup"></u-button>
		</view>
	</view>
	<vk-data-goods-sku-popup ref="skuPopup" v-model="state.isShowSku" border-radius="20" :localdata="state.goodsInfo"
		:mode="3" :selected-init="true" @buy="buy"></vk-data-goods-sku-popup>
</template>

<script setup>
	import {
		ref,
		toRefs,
		reactive,
		getCurrentInstance,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	// 组件实例
	const {
		proxy
	} = getCurrentInstance();

	const state = reactive({
		id: null,
		detailData: {},
		isShowSku: false,
		goodsInfo: {}
	});

	onLoad((params) => {
		let id = params.id
		id = '1534420706752856064' // 测试使用
		if (!id) {
			uni.switchTab({
				url: '/pages/index/index'
			})
			return
		}
		state.id = id
	});

	onMounted((params) => {
		detail()
	});

	async function detail() {
		let result = await proxy.$api.spu.detail(state.id)
		state.detailData = result
	};

	let openSkuPopup = () => {
		let spu = state.detailData;
		// 组装数据
		let specList = []
		let skuList = []
		spu.skuList.forEach(item => {
			item.specList.forEach(specItem => {
				specList.push(specItem)
			})

			skuList.push({
				_id: item.id,
				image: item.coverImg,
				price: item.sellPrice,
				sku_name_arr: item.specList.map(e => e.attrValueName),
				stock: item.usableStock
			})
		})
		// console.log(skuList)
		specList = getGroupArray(unique(specList), 'attrKeyName');

		// 去重
		function unique(arrs) {
			const res = new Map()
			return arrs.filter((arr) => !res.has(arr.attrValueName) && res.set(arr.attrValueName, 1))
		}
		// 分组函数
		function getGroupArray(list, attr) {
			const map = new Map()
			list.forEach((item, index, arr) => {
				if (!map.has(item[attr])) {
					map.set(
						item[attr],
						arr.filter((a) => a[attr] == item[attr]),
					)
				}
			})
			let result = []
			map.forEach((attrValueList, attrName) => {
				let list = []
				attrValueList.forEach(item => {
					list.push({
						name: item.attrValueName
					})
				})
				result.push({
					name: attrName,
					list: list
				})
			})
			return result
		}


		state.goodsInfo = {
			goods_thumb: spu.coverImg,
			sku_list: skuList,
			spec_list: specList
		};
		state.isShowSku = true;
	};

	// 加入购物车按钮
	let buy = (selectShop) => {
		// console.log("监听-立即购买", selectShop);
		let {
			_id: skuId,
			buy_num,
			price,
			sku_name_arr,
			image: coverImg
		} = selectShop
		// console.log("监听-立即购买-sku", skuId); 
		let spu = state.detailData;


		proxy.$store.commit('order/setData', {
			spu: {
				spuId: spu.id,
				skuId: skuId,
				name: spu.name,
				specName: sku_name_arr.join(),
				price: price,
				num: buy_num,
				coverImg: coverImg,
				freight: spu.freight
			}
		})

		uni.redirectTo({
			url: `/pages/index/pay?spuId=${spu.id}&skuId=${skuId}`
		})
	}
</script>
<style lang="scss" scoped>
	$price-color: #ff462e;

	@mixin space {
		margin-top: 20rpx;
	}

	page {
		background-color: #f8f8f8;
	}

	.app-container {
		.subject {
			display: flex;
			justify-content: space-between;
			align-items: center;
			@include space;
			background-color: #fff;
			padding-left: 15rpx;
			height: 120rpx;

			.name {
				font-weight: bold;
			}

			.use-stock {
				color: #999;
				font-size: small;
			}

			.price {
				color: $price-color;
				margin-right: 10rpx;
			}
		}

		.content {
			@include space;
			background-color: #fff;

			.item {
				padding: 10rpx;

				.left {
					color: #999;
				}
			}
		}

		.detail-img {
			text-align: center;

			.img {
				border: 10rpx solid ghostwhite;
			}
		}

		.bottom {
			background: #f8f8f8;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
		}
	}
</style>
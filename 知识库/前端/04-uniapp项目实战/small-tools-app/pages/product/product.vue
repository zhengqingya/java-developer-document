<template>
	<view>
		<!-- <text>helloworld</text> -->
		<!-- <text>{{productList}}</text> -->
		<view class="product-box">
			<view v-for="(item,index) in productList" :key="index" @click="goToDetail(item)">
				<view class="product-image">
					<image :src="item.coverImg" mode="aspectFill"></image>
				</view>
				<text class="product-name">
					<h4>{{ item.name }}</h4>
				</text>
				<view class="product-info">
					<text> {{ item.sellPrice / 100 }}</text>
					<text>已售 {{ item.useStock }}</text>
				</view>
			</view>
		</view>
		<view>
			<!-- <blockquote>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, quos.</blockquote> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: []
			}
		},
		onLoad() {
			this.spuList()
		},
		methods: {
			async spuList() {
				let params = {
					name: '',
				}
				let result = await this.$api.spu.page(params);
				this.productList = result.records
				// console.log(22233, this.productList)
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

<style lang="scss">
	.product-box {
		margin: 80rpx;

		image {
			height: 600rpx;
			width: 600rpx;
		}

		.product-name {
			font-size: 50rpx;
		}

		.product-info {
			text {
				font-size: 30rpx;
				padding: 0 30rpx;
			}


		}

	}
</style>

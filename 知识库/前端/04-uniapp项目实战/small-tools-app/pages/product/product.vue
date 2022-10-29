<template>
	<view>
		<text>helloworld</text>
		<!-- <view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.picUrl" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{ item.name }}</text>
				<view class="price-box">
					<text class="price">{{ item.price/100 }}</text>
					<text>已售 {{ item.sales }}</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			console.log('---------------------------')
			// console.log(this.$api)
			this.test()
		},
		methods: {
			async test() {
				let res = await this.$api.spu.test()
				console.log(22233, res)
			},
			spuList() {
				this.$api.spu.test().then((res) => {
					console.log(11, res)
				})
			},

			//详情
			navToDetailPage(item) {
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				});
			},
		}
	}
</script>

<style lang="scss">

</style>

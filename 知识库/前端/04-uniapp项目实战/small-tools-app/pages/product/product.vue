<template>
	<view>
		<!-- <text>helloworld</text> -->
		<!-- <text>{{productList}}</text> -->
		<view class="product-item">
			<view v-for="(item,index) in productList" :key="index" @click="goToDetail(item)">
				<view class="product-image">
					<image :src="item.coverImg" mode="aspectFill"></image>
				</view>
				<text class="product-name">{{ item.name }}</text>
				<view class="product-info-box">
					<text>{{ item.sellPrice / 100 }}</text>
					<text>已售 {{ item.useStock }}</text>
				</view>
			</view>
		</view>
		<view>
			<blockquote>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, quos.</blockquote>
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

</style>

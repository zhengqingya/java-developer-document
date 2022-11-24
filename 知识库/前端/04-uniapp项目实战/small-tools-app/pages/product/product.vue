<template>
	<view>
		<view class="header">
			<uni-row>
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
		</view>


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
				orderType: 'takein',
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

<style lang="scss" scoped>
	.header {
		margin: 10px;

		.location {
			margin-top: 3px;
			font-size: 10px;
			color: #919293;
		}

		.right {
			display: flex;


			.takein,
			.takeout {
				width: 120rpx;
				color: #ceac93;
				text-align: center;
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

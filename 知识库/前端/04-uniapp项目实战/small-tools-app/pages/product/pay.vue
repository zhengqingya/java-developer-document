<template>
	<view class="app-container">
		<view class="base-box">
			<uni-list>
				<uni-list-item title="店铺" rightText="天府三街测试店"></uni-list-item>
				<uni-list-item title="配送方式" rightText="堂食"></uni-list-item>
				<uni-list-item title="联系电话">
					<template v-slot:footer>
						<input class="right-input" placeholder="请填写联系电话" />
					</template>
				</uni-list-item>
				<uni-list-item title="取餐时间" rightText="立即"></uni-list-item>
			</uni-list>
		</view>
		<view class="product-box">

		</view>
		<view class="pay-box">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		.base-box {
			padding: 10rpx 10rpx;
			background-color: $bg-color;

			.right-input {
				width: 180rpx;
				font-size: $font-size-sm;
			}
		}

		.product-box {
			background-color: $bg-color;
		}

		.product-box {
			background-color: $bg-color;
		}

	}
</style>

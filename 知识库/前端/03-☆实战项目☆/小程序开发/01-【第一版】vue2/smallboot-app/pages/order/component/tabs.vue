<template>
	<view class="tabs">
		<view v-for="(item, index) in tabList" :key="index" class="tabs_list" @tap="clickTab(item,index)"
			:style="'color:' + (active == index ?activeColor :'') + ';font-weight:' + (active == index ?'bold' : '500')">
			{{item.name}}
			<view class="active" :style="'background:' + activeColor" v-if="active == index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			activeColor: {
				type: String,
				default: "#000"
			},
			tabList: {
				type: Array
			},
			active: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {};
		},
		methods: {
			clickTab(item, index) {
				this.$emit('clickTab', item, index);
			}
		}
	};
</script>
<style scoped lang="scss">
	.tabs {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #fff;
	}

	.tabs_list {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		position: relative;
		color: #333;
	}

	.active {
		font-weight: bold;
		color: #DD4F42;
		width: 50rpx;
		height: 5rpx;
		border-radius: 20rpx;
		background-color: #DD4F42;
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		transition: all 0.3s;
	}
</style>
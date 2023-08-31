<template>
	<!-- 搜索栏 -->
	<view class="search">
		<u-search placeholder="请输入搜索关键词" v-model="state.keyword" :show-action="true" actionText="搜索"
			@custom="onLoad"></u-search>
	</view>

	<!-- 商品列表 -->
	<view class="product-list">
		<u-list @scrolltolower="onLoad">
			<u-list-item v-for="(item, index) in state.list" :key="index">
				<navigator v-for="item in state.list" :key="item" :url="'/pages/index/detail?id='+item.id">
					<view class="item">
						<image style="width: 100px; height: 100px; background-color: #eeeeee;" mode="aspectFill"
							:src="item.coverImg" />
						<view class="right">
							<view class="name">{{item.name}}</view>
							<view class="price">¥ {{item.sellPrice/100}}元</view>
						</view>
					</view>
				</navigator>
			</u-list-item>
		</u-list>
	</view>

</template>

<script setup>
	import {
		ref,
		toRefs,
		reactive,
		getCurrentInstance,
		onMounted
	} from 'vue';
	// 组件实例
	const {
		proxy
	} = getCurrentInstance();

	const state = reactive({
		keyword: '',
		list: [],
		page: 0,
		loading: false,
		finished: false,
		refreshing: false,
	})

	onMounted(() => {
		onLoad()
	})

	const onLoad = () => {
		if (state.finished) {
			return
		}
		state.page++
		getList();
	};

	async function getList() {
		let result = await proxy.$api.spu.page({
			name: state.keyword,
			page: state.page
		})
		state.list = result.records;
		if (result.current == result.pages) {
			state.finished = true;
		}
	};
</script>
<style lang="scss" scoped>
	.search {
		margin-top: 15rpx;
	}

	.product-list {
		margin-top: 15rpx;

		.item {
			display: flex;
			text-shadow: 0 0 1px black;
			// background-color: #ff462e;
			padding: 10px;
			border: 10rpx solid ghostwhite;
			border-radius: 30rpx;

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.name {
					margin-top: 20rpx;
					font-weight: bold;
				}

				.price {
					color: #ff462e;
				}
			}
		}
	}

	.img {
		height: 320rpx;
		width: 100%;
	}
</style>
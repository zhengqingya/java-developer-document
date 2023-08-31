<template>
	<view v-if="state.spu" class="page">
		<view class="spu">
			<image style="width: 100px; height: 100px; background-color: #eeeeee;" mode="aspectFill"
				:src="state.spu.coverImg" />
			<view class="right">
				<view class="name">{{state.spu.name}}</view>
				<view class="spec-name">规格：{{state.spu.specName}}</view>
				<view>
					<text class="price">¥ {{state.spu.price/100}}</text>
					<text class="num"> x {{state.spu.num}}</text>
				</view>
			</view>
		</view>
		<view class="form">
			<u--form labelPosition="left" :model="state.form">
				<u-form-item label="备注">
					<u--input v-model="state.form.remark" border="none" placeholder="请输入"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view class="buy">
			<u-button type="error" text="购买" @click="createOrder"></u-button>
		</view>
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
	import {
		onLoad
	} from "@dcloudio/uni-app"
	// 组件实例
	const {
		proxy
	} = getCurrentInstance();

	const state = reactive({
		spu: null,
		form: null
	});

	onLoad((params) => {
		// console.log(1, params)
	});

	onMounted(() => {
		let {
			spu
		} = proxy.$store.getters['order/getData']
		state.spu = spu
		state.form = spu
		// console.log(111, spu)
	});

	async function createOrder() {
		let result = await proxy.$api.order.create({
			skuList: [{
				spuId: state.form.spuId,
				skuId: state.form.skuId,
				num: state.form.num,
				price: state.form.price,
			}],
			freight: state.form.freight,
			totalPrice: state.form.price * state.form.num,
			payPrice: state.form.price * state.form.num,
			orderRemark: state.form.remark
		})

		let payParams = await proxy.$api.order.pay({
			orderNo: result.orderNo
		})

		// 使用参考 https://uniapp.dcloud.net.cn/api/plugins/payment.html
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: payParams.timeStamp,
			nonceStr: payParams.nonceStr,
			package: payParams.wxPackage,
			signType: payParams.signType,
			paySign: payParams.paySign,
			success: function(res) {
				console.log('success: ' + JSON.stringify(res));
			},
			fail: function(err) {
				console.log('fail: ' + JSON.stringify(err));
			}
		});
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
	}

	.spu {
		display: flex;
		text-shadow: 0 0 1px black;
		background-color: #fff;
		padding: 10px;
		border: 10rpx solid ghostwhite;
		border-radius: 30rpx;

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.name {
				margin-top: 20rpx;
				font-weight: bold;
			}

			.spec-name {
				color: #999;
				font-size: small;
			}

			.price {
				color: #ff462e;
			}

			.num {
				font-size: small;
			}
		}

	}

	.form {
		background-color: #fff;
	}

	.buy {
		margin-top: 20rpx;
	}
</style>
<template>
    <u-navbar
        @leftClick="back"
        bgColor="#00aaff"
        border
        placeholder
        :title="isCreateOrder ? '创建订单' : '订单详情'"
        titleStyle="font-weight: bold" />
    <view class="h100 w100 p-x-30" v-if="orderObj">
        <scroll-view class="h100" scroll-y>
            <view v-if="!isCreateOrder" class="h-200 flex-c-center-center">
                <view class="font-size-lg font-bold text-color-primary">
                    {{ orderObj.orderStatusName }}
                </view>
                <u-count-down
                    v-if="
                        orderObj.orderStatus === 1 && new Date(orderObj.unPayEndTime) >= new Date()
                    "
                    class="m-t-20"
                    :time="new Date(orderObj.unPayEndTime).getTime() - new Date().getTime()"
                    format="mm:ss"
                    @finish="cancelOrder()" />
            </view>

            <view class="spu-list flex-column">
                <view
                    class="item flex-between-center p-y-10"
                    v-for="(item, index) in orderObj.spuList"
                    :key="index">
                    <image :src="item.coverImg" class="img-sm" />
                    <view class="flex-column flex-1 m-l-10">
                        <view class="font-size-base text-overflow-1">
                            {{ item.name }}
                        </view>
                        <view class="font-size-sm text-color-grey m-t-10 text-overflow-1">
                            {{ item.specDesc }}
                        </view>
                    </view>
                    <view class="font-size-base m-r-30">￥{{ item.price / 100 }}</view>
                    <view class="font-size-base text-color-grey">x{{ item.num }}</view>
                </view>
            </view>

            <view class="base-box">
                <view v-if="!isCreateOrder">
                    <view class="item-list">
                        <text class="title">订单号</text>
                        <view class="value">{{ orderObj.orderNo }}</view>
                    </view>
                    <view class="item-list">
                        <text class="title">下单时间</text>
                        <view class="value">{{ orderObj.createTime }}</view>
                    </view>
                </view>
                <view class="item-list">
                    <text class="title">取餐时间</text>
                    <view class="value">立即</view>
                </view>
                <view class="item-list">
                    <text class="title">配送方式</text>
                    <view class="value">堂食</view>
                </view>
                <view class="item-list">
                    <text class="title">总金额</text>
                    <view class="value">￥{{ orderObj.totalPrice / 100 }}</view>
                </view>
                <view class="item-list">
                    <text class="title">支付金额</text>
                    <view class="value" style="color: red">￥{{ orderObj.payPrice / 100 }}</view>
                </view>
                <view class="tips">
                    <view class="title">备注</view>
                    <view class="value">
                        <textarea
                            class="textarea"
                            :disabled="!isCreateOrder"
                            placeholder="请输入备注信息..."
                            maxlength="100"
                            v-model="orderObj.orderRemark" />
                    </view>
                </view>
            </view>

            <view class="action">
                <up-button
                    v-if="isCreateOrder"
                    class="w-200 m-t-20 h-80"
                    type="error"
                    @click="createOrder()">
                    创建订单
                </up-button>
                <view class="flex-center-start m-t-20" v-if="orderObj.orderStatus === 1">
                    <up-button @tap="cancelOrder(true)">取消订单</up-button>
                    <up-button class="m-l-10" type="primary" @tap="payOrder()">
                        支付（仅测试）
                    </up-button>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
const { proxy } = getCurrentInstance();
import { onBackPress, onLoad } from '@dcloudio/uni-app';

let isCreateOrder = ref(false); // 是否为创建订单页面
let orderNo = ref(''); // proxy.$route.query.orderNo 这种方式微信小程序用不了
let orderObj = ref({}); // 订单详情
let skuList = ref([]); // 商品信息

// onBackPress((event) => {
//     if (event.from === 'navigateBack') {
//         return false;
//     }
//     uni.switchTab({
//         url: '/pages/order/index',
//     });
//     return true;
// });

function back() {
    uni.switchTab({
        url: '/pages/order/index',
    });
}

onLoad((params) => {
    orderNo.value = params.orderNo;
    if (params.isCreateOrder) {
        // 创建订单数据
        isCreateOrder.value = true;
        getCartList();
        return;
    }
    if (orderNo.value) {
        // 订单详情
        orderDetail();
    } else {
        // 跳回订单列表页面
        uni.switchTab({
            url: '/pages/order/index',
        });
    }
});

// 订单详情
async function orderDetail() {
    orderObj.value = await proxy.$api.order.detail(orderNo.value);
    if (!orderObj.value.orderRemark) {
        orderObj.value.orderRemark = ' 无';
    }
}
// 购物车数据
async function getCartList() {
    let cartList = await proxy.$api.cart.list();
    let sumPrice = cartList.reduce((total, item) => (total += item.num * item.price), 0);
    orderObj.value.spuList = cartList;
    orderObj.value.totalPrice = sumPrice;
    orderObj.value.payPrice = sumPrice;
    orderObj.value.freight = Math.max.apply(
        Math,
        cartList.map(function (item) {
            return item.freight << 0;
        })
    );
}
// 创建订单
async function createOrder() {
    let { orderNo } = await proxy.$api.order.create({
        skuList: orderObj.value.spuList,
        freight: orderObj.value.freight,
        totalPrice: orderObj.value.totalPrice,
        payPrice: orderObj.value.payPrice,
        orderRemark: orderObj.value.orderRemark,
    });
    // 跳转到订单详情页面
    uni.redirectTo({
        url: '/pages/order/detail?orderNo=' + orderNo,
    });
}
// 取消订单
function cancelOrder(isCancel) {
    if (isCancel) {
        // 手动取消订单，后端有自动取消逻辑，所以非手动取消订单操作则直接查询订单数据即可
        proxy.$api.order.cancel({
            orderNo: orderNo.value,
        });
    }

    // getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
    let pages = getCurrentPages();
    if (!pages[pages.length - 1].$page.fullPath.startsWith('/pages/order/detail')) {
        // 未支付倒计时自动取消时，如果已经不在当前页面则不做下面的提示处理...
        return;
    }

    // 倒计时 -- 防止后端自动取消处理时间太久导致订单数据未及时更新
    setTimeout(() => {
        uni.showModal({
            title: '提示',
            content: '订单' + orderNo.value + '已取消',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    orderDetail();
                }
            },
        });
    }, 1500);
    // uni.switchTab({
    // 	url: '/pages/order/index'
    // })
}

async function payOrder() {
    // TODO 临时测试
    // alert('条件有限，无法测试！')
    await proxy.$api.order.payTest({
        orderNo: orderNo.value,
    });

    orderDetail();
}
</script>

<style lang="scss" scoped>
::v-deep .u-count-down {
    .u-count-down__text {
        color: red;
    }
}

.base-box {
    .item-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // border-bottom: 1rpx dashed #eee;
        height: 80rpx;
        // padding: 10rpx 10rpx;

        &:first-child {
            // border-top: 1rpx dashed #eee;
        }

        .title {
            color: #333;
            font-size: 26rpx;
            font-weight: bold;
            display: flex;
            align-items: center;
        }

        .value {
            color: #999;
            font-size: 26rpx;
        }
    }

    .tips {
        .title {
            color: #333;
            font-size: 26rpx;
            font-weight: bold;
            display: flex;
            align-items: center;
            // height: 80rpx;
        }

        .textarea {
            margin-top: 10rpx;
            height: 200rpx;
            width: 99%;
            border: 1rpx solid #eee;
            border-radius: 10rpx;
            font-size: 30rpx;
            // padding: 10rpx;
            // background-color: rebeccapurple;
        }
    }
}
</style>

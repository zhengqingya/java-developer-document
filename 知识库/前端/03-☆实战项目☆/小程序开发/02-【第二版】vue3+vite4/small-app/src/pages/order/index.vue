<template>
    <view class="flex-column w100 h100">
        <view class="h100 overflow-y-scroll">
            <scroll-view
                class="h100 flex-1 bg-color-lightgrey"
                scroll-y
                enable-back-to-top
                @scrolltolower="onPushRefresh"
                :refresher-enabled="true"
                :refresher-triggered="isReFresh"
                @refresherrefresh="onPullRefresh">
                <view v-if="orderList.length > 0">
                    <view
                        class="bg-color-white m-20 m-y-20 p-20 border-radius-30 font-size-base"
                        v-for="(orderItem, index) in orderList"
                        :key="index"
                        @click="goDetail(orderItem.orderNo)">
                        <view class="top flex-between-start">
                            <view class="left flex-start-center">
                                <u-icon name="home" :size="20" color="rgb(94,94,94)"></u-icon>
                                <view class="m-x-10 font-bold font-size-base">
                                    成都高新区天府三街测试店
                                </view>
                                <u-icon
                                    name="arrow-right"
                                    color="rgb(203,203,203)"
                                    :size="18"></u-icon>
                            </view>
                            <view class="flex-c-center-end">
                                <view class="text-color-warning">
                                    {{ orderItem.orderStatusName }}
                                </view>
                                <view
                                    v-if="
                                        orderItem.orderStatus === 1 &&
                                        new Date(orderItem.unPayEndTime) >= new Date()
                                    "
                                    class="m-t-10">
                                    <u-count-down
                                        :time="
                                            new Date(orderItem.unPayEndTime).getTime() -
                                            new Date().getTime()
                                        "
                                        format="mm:ss"
                                        @finish="orderPage(true)" />
                                </view>
                            </view>
                        </view>
                        <view class="flex-column m-t-10">
                            <view
                                class="flex-between-center p-y-10"
                                v-for="(item, index) in orderItem.spuList"
                                :key="index">
                                <image :src="item.coverImg" class="img-sm" />
                                <view class="flex-column flex-1 m-l-10">
                                    <view class="font-size-base text-overflow-1">
                                        {{ item.name }}
                                    </view>
                                    <view
                                        class="font-size-sm text-color-grey m-t-10 text-overflow-1">
                                        {{
                                            item.specList.map((obj) => obj.attrValueName).join(',')
                                        }}
                                    </view>
                                </view>
                                <view class="font-size-base m-r-30">￥{{ item.price / 100 }}</view>
                                <view class="font-size-base text-color-grey">x{{ item.num }}</view>
                            </view>
                        </view>
                        <view class="flex-c-center-end m-t-10">
                            <view>下单时间：{{ orderItem.createTime }}</view>
                            <view>
                                共{{
                                    orderItem.spuList.reduce(
                                        (total, item) => (total += item.num),
                                        0
                                    )
                                }}件商品 实付:
                                <text class="text-color-red">￥{{ orderItem.payPrice / 100 }}</text>
                            </view>
                        </view>
                    </view>
                    <u-loadmore
                        v-if="orderList.length > 5"
                        :line="true"
                        :status="loadmoreStatus"></u-loadmore>
                </view>
                <view v-else class="h100 content-center bg-color-white">
                    <u-empty mode="order" text="订单为空" />
                </view>
            </scroll-view>
        </view>
        <g-tab-bar :active="2" />
    </view>
</template>

<script setup>
const { proxy } = getCurrentInstance();
import { onShow } from '@dcloudio/uni-app';
let orderList = ref([]);
let current = ref(0);
let pageNum = ref(1);
let total = ref(1);
let loadmoreStatus = ref('loadmore');
let isReFresh = ref(true);

// 页面显示就触发
onShow(() => {
    orderPage(true);
});

// 上拉加载更多 -- 滑到底部触发
function onPushRefresh() {
    loadmoreStatus.value = 'loading';
    pageNum.value++;
    setTimeout(async () => {
        await orderPage();
    }, 200);
}

// 下拉刷新
function onPullRefresh() {
    isReFresh.value = true;
    orderPage(true);
    setTimeout(() => {
        isReFresh.value = false;
    }, 100);
}

// 分页查询订单数据
async function orderPage(isFirst) {
    if (isFirst) {
        pageNum.value = 1;
    }
    if (!isFirst && orderList.value.length >= total.value) {
        loadmoreStatus.value = 'nomore';
        return;
    } else {
        loadmoreStatus.value = 'loadmore';
    }

    let result = await proxy.$api.order.page({
        pageNum: pageNum.value,
        pageSize: 10,
    });
    total.value = result.total;
    pageNum.value = result.current;
    orderList.value = isFirst ? result.records : [...orderList.value, ...result.records];
}

// 跳转到订单详情页面
function goDetail(orderNo) {
    uni.navigateTo({
        url: '/pages/order/detail?orderNo=' + orderNo,
    });
}
</script>

<style lang="scss" scoped>
::v-deep .u-count-down {
    .u-count-down__text {
        color: red;
    }
}
</style>

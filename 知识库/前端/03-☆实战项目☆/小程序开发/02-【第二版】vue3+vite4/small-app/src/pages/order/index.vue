<template>
  <base-wraper activeTabName="order">
    <base-scroll
      class="h-full overflow-y-scroll bg-color-lightgrey"
      :isPage="true"
      api="order.page"
      :params="{
        tabValue: -1,
      }"
      :loadmoreNum="0">
      <template #empty>
        <u-empty mode="order" text="订单为空" />
      </template>
      <template #default="{ list }">
        <view
          class="bg-color-white m-20 m-y-20 p-20 b-rd-30 font-size-base"
          v-for="(orderItem, index) in list"
          :key="index"
          @click="goDetail(orderItem.orderNo)">
          <view class="top flex-between-start">
            <view class="left flex-start-center">
              <u-icon name="home" :size="20" color="rgb(94,94,94)"></u-icon>
              <view class="m-x-10 font-bold font-size-base">成都高新区天府三街测试店</view>
              <u-icon name="arrow-right" color="rgb(203,203,203)" :size="18"></u-icon>
            </view>
            <view class="flex-c-center-end">
              <view class="text-color-warning">
                {{ orderItem.orderStatusName }}
              </view>
              <view
                v-if="orderItem.orderStatus === 1 && new Date(orderItem.unPayEndTime) >= new Date()"
                class="m-t-10">
                <u-count-down
                  :time="new Date(orderItem.unPayEndTime).getTime() - new Date().getTime()"
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
                <view class="font-size-sm text-color-grey m-t-10 text-overflow-1">
                  {{ item.specList.map((obj) => obj.attrValueName).join(',') }}
                </view>
              </view>
              <view class="font-size-base m-r-30">￥{{ item.price / 100 }}</view>
              <view class="font-size-base text-color-grey">x{{ item.num }}</view>
            </view>
          </view>
          <view class="flex-c-center-end m-t-10">
            <view>下单时间：{{ orderItem.createTime }}</view>
            <view>
              共{{ orderItem.spuList.reduce((total, item) => (total += item.num), 0) }}件商品 实付:
              <text class="text-color-red">￥{{ orderItem.payPrice / 100 }}</text>
            </view>
          </view>
        </view>
      </template>
    </base-scroll>
  </base-wraper>
</template>

<script setup>
const { proxy } = getCurrentInstance();

// 跳转到订单详情页面
function goDetail(orderNo) {
  uni.navigateTo({
    url: '/subPackages/order/detail?orderNo=' + orderNo,
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

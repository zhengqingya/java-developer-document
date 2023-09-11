<template>
  <view class="box" v-if="cartList && cartList.length > 0">
    <view class="cart flex-around-center w-full bg-color-white" style="height: 90rpx">
      <view @click="isShowDetail = !isShowDetail" class="flex flex-1">
        <view class="position-relative" style="margin-left: 60rpx">
          <u-icon size="28" name="shopping-cart" />
          <up-badge
            :value="cartList.reduce((total, item) => (total += item.num), 0)"
            max="99"
            :offset="[-2, -10]"
            :absolute="true" />
        </view>
        <view class="flex-end-center w-full m-r-20 text-color-red">
          ￥{{ cartList.reduce((total, item) => (total += item.num * item.price), 0) / 100 }}
        </view>
      </view>
      <navigator :url="'/subPackages/order/detail?isCreateOrder=true'">
        <up-button type="error" text="付款" />
      </navigator>
    </view>

    <u-overlay :show="isShowDetail" @click="isShowDetail = false" zIndex="1" opacity="0.3" />

    <view class="detail w-full bg-color-white" :class="{ active: isShowDetail }">
      <view
        class="flex-end-center p-x-30 p-y-10 text-color-primary font-size-base"
        @click="clearCart">
        <u-icon size="15" name="trash" />
        <text>清空</text>
      </view>

      <scroll-view class="overflow-y-scroll" style="max-height: 500rpx" scroll-y>
        <view
          class="item flex-between-center p-x-30 p-y-10"
          v-for="(item, index) in cartList"
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
          <view class="font-size-base m-r-30 text-color-red">
            <text>￥{{ item.price / 100 }}</text>
          </view>
          <view class="flex-between-center">
            <u-icon name="minus" size="12" @tap="changeSkuNum(item, -1)" />
            <view style="width: 60rpx" class="flex-center-center font-size-base m-x-10">
              {{ item.num }}
            </view>
            <u-icon name="plus" size="12" @tap="changeSkuNum(item, +1)" />
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let cartList = ref([]); // 购物车数据
let isShowDetail = ref(false); // 购物车弹出层

const props = defineProps({
  modelValue: {
    type: Array,
    required: false,
    default: () => [],
  },
});

// 暴露方法
defineExpose({
  init,
});

async function init() {
  // 购物车数据
  cartList.value = await proxy.$api.cart.list();
  // 过滤掉已失效的商品
  cartList.value = cartList.value.filter((e) => !e.isLose);
  commitCartDataToParent();
}

// 清空购物车
async function clearCart() {
  uni.showModal({
    title: '清空购物车',
    content: '您确定清空吗？',
    confirmColor: '#ff0000',
    success: async function (res) {
      if (res.confirm) {
        let skuIdList = [];
        if (cartList.value.length > 0) {
          cartList.value.forEach((item) => {
            skuIdList.push(item.skuId);
          });
          await proxy.$api.cart.delete({
            skuIdList: skuIdList,
          });
        }
        handleNullCart();
      } else if (res.cancel) {
        return;
      }
    },
  });
}
// 更新购物车商品数据
async function changeSkuNum(item, num) {
  if (item.num + num < 0) {
    return;
  }
  let isOver = false;
  await proxy.$api.cart
    .updateNum({
      spuId: item.spuId,
      skuId: item.skuId,
      num: num,
    })
    .catch((msg) => {
      console.log('购物车异常：', msg);
      if (msg.includes('购买商品已失效')) {
        proxy.$api.cart.delete({
          skuIdList: [item.skuId],
        });
        cartList.value = cartList.value.filter((e) => e !== item);
      }
      isOver = true;
    });
  if (isOver) {
    return;
  }
  item.num += num;
  // 过滤留下非0数据
  cartList.value = cartList.value.filter((e) => e.num > 0);
  if (cartList.value.length === 0) {
    handleNullCart();
  } else {
    proxy.$emit('initCartList', cartList);
  }
}
function handleNullCart() {
  // 如果所有sku都被处理完了，则关闭弹出框
  cartList.value = [];
  isShowDetail.value = false;
  commitCartDataToParent();
}
function commitCartDataToParent() {
  proxy.$emit('update:modelValue', cartList);
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 90rpx;

  .cart {
    z-index: 3; // 层叠顺序
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 0;
  }

  .detail {
    z-index: 2; // 层叠顺序
    position: absolute;
    // bottom: 90rpx;
    display: none; // 先隐藏

    &.active {
      display: block; // 点击后显示

      // 向上滑出动画 -- 浮动元素使用
      @keyframes floatUp {
        from {
          bottom: -100rpx; // 初始状态
        }
        to {
          bottom: 90rpx; // 结束状态
        }
      }
      animation: floatUp 0.3s ease-in-out forwards; // 添加浮动动画，持续时间为1秒
    }
  }
}
</style>

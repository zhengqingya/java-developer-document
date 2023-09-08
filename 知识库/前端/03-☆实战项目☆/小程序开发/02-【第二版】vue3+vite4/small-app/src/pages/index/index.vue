<template>
  <base-wraper activeTabName="index">
    <u-swiper :list="bannerList" indicator indicatorMode="line" circular height="550rpx" />

    <view class="introText h-full flex-center-center">Vue3+Vite4 小程序</view>
  </base-wraper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const bannerList = ref([
  'http://127.0.0.1:886/2023-09-06/1699373277820203008-美图16.jpg',
  'http://127.0.0.1:886/2023-09-06/1699373158366425088-美图13.png',
]);
</script>

<style lang="scss" scoped>
// @font-face {
//     font-family: 'iconfont';
//     src: url('https://test.ttf');
// }
// .introText {
//     font-family: iconfont;
// }
</style>

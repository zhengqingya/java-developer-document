<template>
    <view class="w100 h100 flex-column">
        <u-swiper :list="bannerList" indicator indicatorMode="line" circular height="550rpx" />

        <view class="introText h100 content-center">Vue3+Vite 小程序</view>

        <g-tab-bar :active="0" />
    </view>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const bannerList = reactive([
    'http://127.0.0.1:886/2023-08-30/1696826547278839808-美图13.png',
    'http://127.0.0.1:886/2023-08-30/1696826560859996160-美图15.jpg',
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

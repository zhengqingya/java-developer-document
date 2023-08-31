<template>
    <u-tabbar
        :value="active"
        @change="changeTab"
        :fixed="false"
        activeColor="#00aaff"
        inactiveColor="#7A7E83"
        :z-index="10">
        <u-tabbar-item
            v-for="(item, index) in tabbarList"
            :key="index"
            :text="item.text"
            :icon="item.icon" />
    </u-tabbar>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
    active: {
        type: Number,
        required: true,
        default: 0,
    },
});
let tabbarList = [
    {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: 'home',
    },
    {
        pagePath: '/pages/product/index',
        text: '点餐',
        icon: 'shopping-cart',
    },
    {
        pagePath: '/pages/order/index',
        text: '订单',
        icon: 'order',
    },
    {
        pagePath: '/pages/mine/index',
        text: '我的',
        icon: 'account',
    },
];
function changeTab(index) {
    if (index == proxy.active) {
        return;
    }
    uni.switchTab({
        url: tabbarList[index].pagePath,
    });
}
</script>
<style lang="scss" scoped></style>

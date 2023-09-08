<template>
  <u-tabbar
    :value="activeTabName"
    :fixed="false"
    @change="changeTab"
    activeColor="#00aaff"
    inactiveColor="#7A7E83"
    :z-index="10">
    <u-tabbar-item
      v-for="(item, index) in tabbarList"
      :key="item.name"
      :text="item.text"
      :name="item.name"
      :icon="item.icon" />
  </u-tabbar>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  activeTabName: { type: String, required: true, default: 'index' },
});
let tabbarList = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    icon: 'home',
    name: 'index',
  },
  {
    pagePath: '/pages/product/index',
    text: '点餐',
    icon: 'shopping-cart',
    name: 'product',
  },
  {
    pagePath: '/pages/order/index',
    text: '订单',
    icon: 'order',
    name: 'order',
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    icon: 'account',
    name: 'mine',
  },
];
function changeTab(name) {
  if (props.activeTabName === name) {
    return;
  }
  uni.switchTab({
    url: tabbarList.filter((e) => e.name === name)[0].pagePath,
  });
}
</script>
<style lang="scss" scoped></style>

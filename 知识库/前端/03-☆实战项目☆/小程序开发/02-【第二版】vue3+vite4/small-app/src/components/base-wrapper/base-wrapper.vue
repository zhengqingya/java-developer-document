<template>
  <view class="flex-column h-full w-full">
    <slot />
    <g-tab-bar :activeTabName="activeTabName" />
  </view>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 激活的菜单索引
  activeTabName: { type: String, required: true },
});
</script>
<style lang="scss" scoped></style>

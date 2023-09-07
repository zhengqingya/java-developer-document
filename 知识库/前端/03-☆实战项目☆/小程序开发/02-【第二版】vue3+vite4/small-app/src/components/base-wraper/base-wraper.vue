<template>
  <view class="flex-column h100 w100">
    <slot />
    <g-tab-bar :active="active" />
  </view>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 激活的菜单索引
  active: { type: Number, required: true },
});
</script>
<style lang="scss" scoped></style>

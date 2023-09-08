<template>
  <div class="app p-10">
    <div class="header">
      <div class="title flex-between-center">
        <span class="font-bold font-size-base">{{ title }}</span>
        <div><slot name="append" /></div>
      </div>
    </div>
    <div class="line m-y-10"></div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: '标题',
  },
});
</script>
<style lang="scss" scoped>
.line {
  border-bottom: 1px solid #e5e7ee;
}
</style>

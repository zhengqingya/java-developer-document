<template>
  <div class="flex-start-center" :style="{ 'padding-top': top + 'px', 'padding-bottom': bottom + 'px' }">
    <div class="flex-1">
      <slot></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>
<script setup>
defineProps({
  top: {
    type: Number,
    default: 0,
  },
  bottom: {
    type: Number,
    default: 10,
  },
});
</script>
<style lang="scss" scoped></style>

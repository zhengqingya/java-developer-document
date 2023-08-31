<template>
  <div class="wraper" :class="{ 'is-full-height': fullHeight }">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  props: {
    fullHeight: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.wraper {
  padding: 15px;
  background: $dark_main_color;

  &.is-full-height {
    min-height: 100%;
  }

  border-radius: 2px;
}
</style>

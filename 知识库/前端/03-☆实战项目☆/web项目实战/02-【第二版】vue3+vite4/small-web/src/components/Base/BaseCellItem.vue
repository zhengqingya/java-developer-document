<template>
  <div class="app flex">
    <div class="flex-end-center p-y-10 bg-color-lightgrey" :style="{ width: computedLabelWidth }">
      <span class="m-r-10">{{ label }}</span>
    </div>
    <div class="flex-1 flex-start-center m-x-10">
      <slot />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: String,
    default: '',
  },
});

const baseCellLabelWidth = inject('baseCellLabelWidth', '200px');

const computedLabelWidth = computed(() => {
  return props.labelWidth || baseCellLabelWidth;
});
</script>
<style lang="scss" scoped>
.app {
  border: 1px solid rgb(230, 233, 240);
  &:not(:first-child) {
    border-top: none;
  }
}
</style>

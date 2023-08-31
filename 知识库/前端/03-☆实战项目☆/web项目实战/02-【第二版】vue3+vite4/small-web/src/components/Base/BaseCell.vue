<template>
  <div>
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  labelWidth: {
    type: String,
    default: '200px',
  },
});
provide('baseCellLabelWidth', props.labelWidth);
</script>
<style lang="scss" scoped></style>

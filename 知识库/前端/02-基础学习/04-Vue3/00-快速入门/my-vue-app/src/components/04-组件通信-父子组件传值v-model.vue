<template>
  <h3>子组件count:{{ modelValue }}</h3>
  <button @click="changeData">click</button>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: () => 0,
  },
});
function changeData() {
  proxy.$emit("update:modelValue", 666);
}
</script>

<style scoped></style>

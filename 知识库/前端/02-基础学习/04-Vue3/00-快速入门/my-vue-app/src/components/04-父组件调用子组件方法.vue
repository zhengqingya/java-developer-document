<template>
  <h3>count:{{ count }}</h3>
</template>

<script setup>
const count = ref(0);

function changeData() {
  count.value++;
}

// 暴露方法
defineExpose({
  changeData,
});
</script>

<style scoped></style>

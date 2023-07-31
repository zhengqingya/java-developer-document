<template>
  <h3>{{ list }}</h3>
  <button @click="handleSubmit">提交数据</button>
</template>

<script setup>
// 父传子
const props = defineProps({
  list: {
    type: Array,
    required: false,
    default: () => [],
  },
});

// 子传父
const emits = defineEmits(["add"]);
function handleSubmit() {
  emits("add", "child");
  // 只读，无法修改
  // props.list[0].name = "xxx";
  // console.log(props.list[0].name);
}
</script>

<style scoped></style>

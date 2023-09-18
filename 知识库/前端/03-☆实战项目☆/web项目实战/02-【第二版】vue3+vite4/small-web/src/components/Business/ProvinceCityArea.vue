<template>
  <el-cascader
    v-bind="$attrs"
    :props="{
      value: 'name',
      label: 'name',
      children: 'children',
    }"
    :options="$store.system.useSystemStore().provinceCityAreaList"
    placeholder="请选择"
    @change="handleChange" />
</template>

<script setup>
const { proxy } = getCurrentInstance();
// let selectValue = ref(['810000']);
async function handleChange(value) {
  // console.log('111', selectValue.value, value);
}
</script>
<style lang="scss" scoped></style>

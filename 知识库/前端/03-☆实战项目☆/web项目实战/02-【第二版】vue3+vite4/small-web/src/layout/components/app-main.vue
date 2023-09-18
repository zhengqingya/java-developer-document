<template>
  <el-scrollbar>
    <div :style="{ height: height, width: width }">
      <!-- 路由视图 -->
      <router-view />
    </div>
  </el-scrollbar>
</template>
<script setup>
defineProps({
  height: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss" scoped></style>

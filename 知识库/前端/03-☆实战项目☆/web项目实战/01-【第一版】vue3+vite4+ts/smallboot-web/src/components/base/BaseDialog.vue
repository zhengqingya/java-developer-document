<template>
  <el-dialog :close-on-click-modal="false" v-bind="$attrs">
    <slot />

    <!-- <template #title>
      <slot name="title" />
    </template> -->

    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped></style>

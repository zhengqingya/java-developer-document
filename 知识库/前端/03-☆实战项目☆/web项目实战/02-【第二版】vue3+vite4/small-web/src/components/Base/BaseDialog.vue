<template>
  <el-dialog :close-on-click-modal="false" v-bind="$attrs">
    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script setup></script>
<style lang="scss" scoped></style>

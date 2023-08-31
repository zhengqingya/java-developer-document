<template>
  <div class="page-footer" :style="{ justifyContent: alignMap[align] }" :class="{ fixed: fixed }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    align: {
      type: String,
      default: 'center',
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      alignMap: {
        center: 'center',
        left: 'flex-start',
        right: 'flex-end',
      },
    }
  },
  mounted() {
    this.$parent.$el.style.cssText += ';transform: scale(1);height:100%'
  },
}
</script>
<style lang="scss" scoped>
.page-footer {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fixed {
  position: fixed;
  bottom: 0;
}
</style>

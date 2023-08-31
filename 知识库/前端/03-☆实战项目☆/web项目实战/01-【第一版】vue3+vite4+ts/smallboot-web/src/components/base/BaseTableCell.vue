<template>
  <ul class="table-cell"
    :class="[true ? 'table-cell-dark-theme' : '', labelPosition ? 'table-cell__label-' + labelPosition : '']">
    <slot />
  </ul>
</template>
<script>
export default {
  props: {
    labelPosition: {
      type: String,
      default: 'left',
    },
    labelWidth: {
      type: String,
      default: '200px',
    },
  },
  provide() {
    return {
      tableCell: this,
    }
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
ul.table-cell {
  line-height: 38px;
  width: 100%;
  // background: #fff;
  font-size: 12px;
}

ul.table-cell__label-left {
  .cell-item {
    text-align: left;
  }
}

ul.table-cell__label-right {
  .cell-item {
    text-align: right;
  }
}
</style>

<template>
  <li class="cell-item clearfix" :class="{ 'cell-item-dark-theme': true }">
    <div class="key" :style="{ width: computedLabelWidth }">{{ label }}</div>
    <div class="val" :style="{ 'margin-left': computedLabelWidth || '200px' }">
      <slot />
    </div>
  </li>
</template>
<script>
export default {
  name: 'CellItem',
  inject: ['tableCell'],
  props: {
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    computedLabelWidth() {
      return this.labelWidth || this.tableCell.labelWidth
    },
  },
}
</script>
<style lang="scss" scoped>
.cell-item {
  overflow: hidden;
  margin-left: -40px;
  border: 1px solid rgba(235, 238, 245, 1);

  div.key {
    float: left;
    width: 200px;
    background: #f9f9f9;
    color: #909399;
    border-right: 1px solid rgba(235, 238, 245, 1);
    margin-bottom: -9999px;
    padding-bottom: 9999px;
    padding-left: 15px;
    padding-right: 15px;
  }

  div.val {
    margin-left: 150px;
    color: #606266;
    padding: 0 15px;
  }

  &.cell-item-dark-theme {
    div.key {
      background: $dark_table_th_bgcolor;
      color: $dark_table_td_color;
      border-right: 1px solid $dark_table_border_color;
    }

    div.val {
      // color: #fff;
    }

    & {
      border: 1px solid $dark_table_border_color;
    }
  }
}

ul.table-cell {
  [class*='cell-item']:not(:first-child) {
    border-top: none;
    // border-right:none;
  }
}
</style>

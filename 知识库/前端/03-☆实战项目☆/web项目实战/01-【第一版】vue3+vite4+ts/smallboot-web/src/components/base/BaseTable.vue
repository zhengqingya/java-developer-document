<template>
  <el-table v-bind="$attrs">
    <template v-for="(item, index) in columns">
      <el-table-column v-if="item.slotName" :key="index" v-bind="item">
        <template slot-scope="scope">
          <slot :name="item.slotName" v-bind="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else v-bind="item"> </el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  created() {},
}
</script>

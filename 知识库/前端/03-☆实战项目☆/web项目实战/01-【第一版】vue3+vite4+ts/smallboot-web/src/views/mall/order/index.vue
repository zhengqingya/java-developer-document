<template>
  <base-wraper>
    <base-header>
      <el-select v-model="listQuery.tabValue" placeholder="请选择订单状态" style="width: 200px">
        <el-option v-for="item in tabList" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.orderNo" placeholder="请输入订单编号" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.userPhone" placeholder="请输入用户电话" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <!-- <el-button type="primary" @click="handleAdd">添加</el-button> -->
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="oms_order.page" :params="listQuery">
      <el-table-column label="订单编号" prop="orderNo" align="center"></el-table-column>
      <el-table-column label="用户名称" prop="username" align="center"></el-table-column>
      <el-table-column label="用户电话" prop="userPhone" align="center"></el-table-column>
      <!-- <el-table-column label="支付流水号" prop="payNo" align="center"></el-table-column> -->
      <!-- <el-table-column label="支付时间" prop="payTime" align="center"> </el-table-column> -->
      <!-- <el-table-column label="未支付结束时间" prop="unPayEndTime" align="center"> </el-table-column> -->
      <el-table-column label="订单状态" prop="orderStatusName" align="center"></el-table-column>
      <el-table-column label="运费" prop="freight" align="center"></el-table-column>
      <el-table-column label="总金额" prop="totalPrice" align="center">
        <template v-slot="scope">
          {{ scope.row.totalPrice / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="实付金额" prop="payPrice" align="center">
        <template v-slot="scope">
          {{ scope.row.payPrice / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
      <!-- <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button link @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </base-table-p>
  </base-wraper>
</template>

<script>
export default {
  name: 'OmsOrder',
  data() {
    return {
      listQuery: {
        orderNo: undefined, // 订单编号
        userPhone: undefined, // 用户电话
        tabValue: -1, // 订单状态(1->待支付 2->已取消 3->待发货 4->待收货 5->已完成 6->已退款)
      },
      form: {},
      tabList: [],
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    async getTabList() {
      let res = await this.$api.oms_order.tabList()
      this.tabList = res.data
    },
    handleDetail(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'detail'
      this.dialogVisible = true
    },
  },
}
</script>
<style scoped></style>

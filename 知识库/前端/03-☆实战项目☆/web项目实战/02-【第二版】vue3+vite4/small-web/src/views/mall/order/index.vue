<template>
  <base-wrapper>
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

    <base-table-p ref="baseTableRef" api="oms_order.page" :params="listQuery">
      <el-table-column label="订单编号" prop="orderNo" align="center"></el-table-column>
      <el-table-column label="商品" align="center" width="230px">
        <template #default="scope">
          <!-- {{ scope.row.skuList }} -->
          <div v-for="item in scope.row.spuList" :key="item.id" class="flex-between-center p-y-3">
            <el-image :src="item.coverImg" class="img-sm" />
            <div class="flex-1 m-l-10">
              <div class="flex-between-center">
                <span class=""> {{ item.name }} </span>

                <span class="">￥{{ item.price / 100 }}</span>
              </div>
              <div class="flex-between-center">
                <span class="text-color-grey"> {{ item.specList.map((obj) => obj.attrValueName).join(',') }} </span>
                <span>x{{ item.num }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column label="支付流水号" prop="payNo" align="center"></el-table-column> -->
      <!-- <el-table-column label="支付时间" prop="payTime" align="center"> </el-table-column> -->
      <!-- <el-table-column label="未支付结束时间" prop="unPayEndTime" align="center"> </el-table-column> -->

      <!-- <el-table-column label="运费" prop="freight" align="center"></el-table-column> -->
      <el-table-column label="总金额" prop="totalPrice" align="center">
        <template #default="scope">
          <span class="">￥{{ scope.row.totalPrice / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实付金额" prop="payPrice" align="center">
        <template #default="scope">
          <span class="text-color-red font-bold">￥{{ scope.row.payPrice / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="orderStatusName" align="center"></el-table-column>
      <el-table-column label="用户名称" prop="username" align="center"></el-table-column>
      <el-table-column label="用户电话" prop="userPhone" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
      <!-- <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button link @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </base-table-p>
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({
  tabValue: -1, // 订单状态(1->待支付 2->已取消 3->待发货 4->待收货 5->已完成 6->已退款)
});
let tabList = $ref([]);

onMounted(() => {
  getTabList();
});

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
async function getTabList() {
  let res = await proxy.$api.oms_order.tabList();
  tabList = res.data;
}
function handleDetail(row) {
  form = Object.assign({}, row);
  dialogStatus = 'detail';
  dialogVisible = true;
}
</script>
<style scoped></style>

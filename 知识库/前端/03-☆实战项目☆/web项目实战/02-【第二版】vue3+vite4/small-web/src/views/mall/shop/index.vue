<template>
  <base-wrapper>
    <base-header>
      <el-input v-model="listQuery.shopId" placeholder="请输入门店ID" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.shopName" placeholder="请输入门店名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <router-link to="/mall/shop-edit?isAdd=true">
          <el-button type="primary">添加</el-button>
        </router-link>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="sms_shop.page" :params="listQuery">
      <el-table-column label="门店ID" prop="shopId" align="center"></el-table-column>
      <el-table-column label="门店名称" prop="shopName" align="center"></el-table-column>
      <!-- <el-table-column label="店铺类型" prop="type" align="center"></el-table-column> -->
      <el-table-column label="是否显示 " prop="isShow" align="center">
        <template #default="scope">
          <span>{{ scope.row.isShow ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="堂食状态" prop="snackStatus" align="center">
        <template #default="scope">
          <span>{{ scope.row.snackStatus ? '开启' : '关闭' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="外卖状态" prop="takeoutStatus" align="center">
        <template #default="scope">
          <span>{{ scope.row.takeoutStatus ? '开启' : '关闭' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门店营业状态" prop="openStatus" align="center">
        <template #default="scope">
          <span>{{ scope.row.openStatus ? '营业中' : '未营业' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template #default="scope">
          <router-link :to="`/mall/shop-edit?shopId=` + scope.row.shopId">
            <el-button link>编辑</el-button>
          </router-link>
          <router-link :to="`/mall/shop-edit?isDetail=true&shopId=` + scope.row.shopId">
            <el-button link>详情</el-button>
          </router-link>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({});
let form = $ref({});
let dialogVisible = $ref(false);
let dialogStatus = $ref('');
let rules = $ref({});

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
// function handleDetail(row) {
//   form = Object.assign({}, row);
//   dialogStatus = 'detail';
//   dialogVisible = true;
// }
// function handleAdd() {
//   form = {};
//   dialogStatus = 'add';
//   dialogVisible = true;
// }
// function handleUpdate(row) {
//   form = Object.assign({}, row);
//   dialogStatus = 'update';
//   dialogVisible = true;
// }
async function handleDelete(row) {
  let res = await proxy.$api.sms_shop.delete({ shopId: row.shopId });
  refreshTableData();
  proxy.submitOk(res.message);
}
</script>

<style lang="scss" scoped></style>

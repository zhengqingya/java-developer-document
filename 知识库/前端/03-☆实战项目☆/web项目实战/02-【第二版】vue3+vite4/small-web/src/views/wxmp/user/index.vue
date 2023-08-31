<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.openid" placeholder="请输入微信openid" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleSync">同步公众号用户数据</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="wx_mp_user.page" :params="listQuery">
      <el-table-column label="微信openid" prop="openid" align="center" width="220px"></el-table-column>
      <el-table-column label="昵称" prop="nickname" align="center"></el-table-column>
      <el-table-column label="头像" prop="headImgUrl" align="center"></el-table-column>
      <el-table-column label="关注来源" prop="subscribeSceneName" align="center"></el-table-column>
      <el-table-column label="关注时间" prop="subscribeTime" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button link @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
      <base-cell label-width="100px">
        <base-cell-item label="AppID">{{ form.appId }}</base-cell-item>
        <base-cell-item label="微信openid">{{ form.openid }}</base-cell-item>
        <base-cell-item label="昵称">{{ form.nickname }}</base-cell-item>
        <base-cell-item label="头像">{{ form.headImgUrl }}</base-cell-item>
        <base-cell-item label="关注来源">{{ form.subscribeSceneName }}</base-cell-item>
        <base-cell-item label="关注时间">{{ form.subscribeTime }}</base-cell-item>
      </base-cell>
      <template v-if="dialogStatus !== 'detail'" #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({});
let form = $ref({});
let dialogVisible = $ref(false);
let dialogStatus = $ref('');

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleDetail(row) {
  form = Object.assign({}, row);
  dialogStatus = 'detail';
  dialogVisible = true;
}
async function handleSync() {
  let res = await proxy.$api.wx_mp_user.sync();
  proxy.submitOk(res.message);
  refreshTableData();
}
</script>
<style scoped></style>

<template>
  <base-wrapper>
    <base-header>
      <el-input v-model="listQuery.id" placeholder="请输入主键ID" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.openid" placeholder="请输入微信openid" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.phone" placeholder="请输入手机号码" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <!-- <el-button type="primary" @click="handleAdd">添加</el-button> -->
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="ums_user.page" :params="listQuery">
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column label="openid" prop="openid" align="center"></el-table-column>
      <el-table-column label="昵称" prop="nickname" align="center"></el-table-column>
      <el-table-column label="手机号码" prop="phone" align="center"></el-table-column>
      <el-table-column label="头像" prop="avatarUrl" align="center">
        <template #default="scope">
          <span>
            <img :src="scope.row.avatarUrl" alt="" style="width: 50px; height: 50px" />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center"> </el-table-column>
    </base-table-p>
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({});
let form = $ref({});
function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
</script>
<style scoped></style>

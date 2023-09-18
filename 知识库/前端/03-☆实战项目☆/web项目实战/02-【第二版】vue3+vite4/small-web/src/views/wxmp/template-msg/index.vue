<template>
  <base-wrapper>
    <base-header>
      <el-input v-model="listQuery.title" placeholder="请输入模板标题" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleSync">同步公众号模板数据</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="wx_mp_template_msg.page" :params="listQuery">
      <el-table-column label="AppID" prop="appId" align="center"></el-table-column>
      <el-table-column label="模板ID" prop="templateId" align="center"></el-table-column>
      <el-table-column label="模板标题" prop="title" align="center"></el-table-column>
      <el-table-column label="模板内容" prop="content" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button link @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="50%">
      <base-cell label-width="100px">
        <base-cell-item label="AppID">{{ form.appId }}</base-cell-item>
        <base-cell-item label="模板ID">{{ form.templateId }}</base-cell-item>
        <base-cell-item label="模板标题">{{ form.title }}</base-cell-item>
        <base-cell-item label="模板内容">
          <div class="flex w-full">
            <div style="width: 500px">
              <el-input v-model="form.content" type="textarea" disabled autosize />
            </div>
            <div class="m-l-10 w-full">
              <div v-for="item in form.dataList" :key="item.name" class="flex-start-center">
                <span>{{ item.name }}：</span>
                <el-input v-model="item.value" type="textarea" autosize rows="1" placeholder="内容"></el-input>
                <el-color-picker v-model="item.color" />
              </div>
            </div>
          </div>
        </base-cell-item>
        <base-cell-item label="openid">
          <el-input v-model="form.openid" />
        </base-cell-item>
      </base-cell>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="submitForm">发送消息</el-button>
      </template>
    </base-dialog>
  </base-wrapper>
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
  form.openid = 'ojplN5tMax4tNacU3tKeWCnL7qEU';
  dialogStatus = 'detail';
  dialogVisible = true;
}
async function handleSync() {
  let res = await proxy.$api.wx_mp_template_msg.sync();
  proxy.submitOk(res.message);
  refreshTableData();
}
async function submitForm() {
  let res = await proxy.$api.wx_mp_template_msg.sendMsg(form);
  proxy.submitOk(res.message);
}
</script>
<style lang="scss" scoped></style>

<template>
  <base-wrapper>
    <base-header>
      <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.matchValue" placeholder="请输入关键词" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="wx_mp_msg_auto_reply.page" :params="listQuery">
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="类型" prop="typeName" align="center"></el-table-column>
      <el-table-column label="关键词" prop="matchValue" align="center"></el-table-column>
      <el-table-column label="是否精确匹配" prop="isExactMatch" align="center"></el-table-column>
      <el-table-column label="回复消息类型" prop="replyTypeName" align="center"></el-table-column>
      <el-table-column label="回复消息内容" prop="replyContent" align="left" width="500px" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button link @click="handleDetail(scope.row)">详情</el-button>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
      <el-form v-if="dialogStatus !== 'detail'" ref="dataFormRef" :model="form" label-width="120px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select v-model="form.type" placeholder="请选择" @change="handleChangeType">
            <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <div v-if="form.type === 2">
          <el-form-item label="关键词:" prop="matchValue">
            <el-input v-model="form.matchValue"></el-input>
          </el-form-item>
          <el-form-item label="是否精确匹配:" prop="isExactMatch">
            <el-select v-model="form.isExactMatch" placeholder="请选择">
              <el-option v-for="item in isExactMatchList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="回复消息类型:" prop="replyType">
          <el-select v-model="form.replyType" placeholder="请选择">
            <el-option v-for="item in replyTypeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="回复消息内容:" prop="replyContent">
          <el-input v-model="form.replyContent"></el-input>
        </el-form-item>
      </el-form>
      <base-cell v-else label-width="100px">
        <base-cell-item label="名称">{{ form.name }}</base-cell-item>
        <base-cell-item label="类型">{{ form.typeName }}</base-cell-item>
        <base-cell-item label="关键词">{{ form.matchValue }}</base-cell-item>
        <base-cell-item label="是否精确匹配">{{ form.isExactMatch }}</base-cell-item>
        <base-cell-item label="回复消息类型">{{ form.replyTypeName }}</base-cell-item>
        <base-cell-item label="回复消息内容">
          <span class="text-overflow-1 w-300">{{ form.replyContent }}</span>
        </base-cell-item>
      </base-cell>
      <template v-if="dialogStatus !== 'detail'" #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
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

let typeList = [
  { value: 1, name: '关注时回复' },
  { value: 2, name: '关键词回复' },
];
let isExactMatchList = [
  { value: true, name: '是' },
  { value: false, name: '否' },
];
let replyTypeList = [
  { value: 'text', name: '文本' },
  { value: 'image', name: '图片' },
  { value: 'voice', name: '语音' },
  { value: 'video', name: '视频' },
  { value: 'music', name: '音乐' },
  { value: 'news', name: '图文' },
];

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleDetail(row) {
  form = Object.assign({}, row);
  dialogStatus = 'detail';
  dialogVisible = true;
}
function handleAdd() {
  form = { isExactMatch: true };
  dialogStatus = 'add';
  dialogVisible = true;
}
function handleUpdate(row) {
  form = Object.assign({}, row);
  dialogStatus = 'update';
  dialogVisible = true;
}
function handleChangeType() {
  if (form.type === 1) {
    form.matchValue === 'subscribe';
  }
}
async function handleDelete(row) {
  let res = await proxy.$api.wx_mp_msg_auto_reply.delete(row.id);
  refreshTableData();
  proxy.submitOk(res.message);
}
function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      let res = await proxy.$api.wx_mp_msg_auto_reply[form.id ? 'update' : 'add'](form);
      proxy.submitOk(res.message);
      refreshTableData();
      dialogVisible = false;
    }
  });
}
</script>
<style scoped></style>

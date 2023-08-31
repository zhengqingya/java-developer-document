<template>
  <base-no-data v-show="!listQuery.attrKeyId" class="h-200">tip:点击规格可查看关联属性</base-no-data>
  <div v-show="listQuery.attrKeyId">
    <base-header>
      <span class="font-bold font-size-base">关联属性：</span>
      <!-- <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input> -->
      <template #right>
        <el-button type="primary" @click="refreshTableData">刷新</el-button>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="pms_attr.listValue" :params="listQuery" :is-page="false">
      <el-table-column label="属性名称" prop="attrValueName" align="center"></el-table-column>
      <el-table-column label="排序" prop="sort" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
      <el-form ref="dataFormRef" :model="form" label-width="100px">
        <el-form-item label="规格名称:">
          <el-input v-model="attrKeyObj.attrKeyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="属性名称:">
          <el-input v-model="form.attrValueName"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </base-dialog>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let listQuery = $ref({});
let form = $ref({});
let dialogVisible = $ref(false);
let dialogStatus = $ref('');
let attrKeyObj = $ref(null);

defineExpose({ show });

function show(data) {
  attrKeyObj = data;
  listQuery.attrKeyId = attrKeyObj.id;
  refreshTableData();
}
function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleAdd() {
  form = { sort: 1 };
  dialogStatus = 'add';
  dialogVisible = true;
}
function handleUpdate(row) {
  form = Object.assign({}, row);
  dialogStatus = 'update';
  dialogVisible = true;
}
async function handleDelete(row) {
  let res = await proxy.$api.pms_attr.deleteValue({ id: row.attrValueId });
  refreshTableData();
  proxy.submitOk(res.message);
}
function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      form.id = form.attrValueId;
      form.attrKeyId = attrKeyObj.id;
      let res = await proxy.$api.pms_attr[form.id ? 'updateValue' : 'addValue'](form);
      proxy.submitOk(res.message);
      refreshTableData();
      dialogVisible = false;
    }
  });
}
</script>
<style scoped></style>

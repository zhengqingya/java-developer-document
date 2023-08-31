<template>
  <base-wraper>
    <el-row :gutter="20">
      <el-col :span="8">
        <base-header>
          <el-input v-model="listQuery.attrKeyName" placeholder="请输入规格名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
          <el-button type="primary" @click="refreshTableData">查询</el-button>
          <template #right>
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </template>
        </base-header>

        <base-table-p ref="baseTableRef" api="pms_attr.listKey" :params="listQuery" :is-page="false" @cell-click="tableNodeclick">
          <el-table-column label="规格名称" prop="attrKeyName" align="center"></el-table-column>
          <el-table-column label="排序" prop="sort" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="scope">
              <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
              <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
            </template>
          </el-table-column>
        </base-table-p>

        <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
          <el-form v-if="dialogStatus !== 'detail'" ref="dataFormRef" :model="form" label-width="100px">
            <el-form-item label="规格名称:" prop="attrKeyName">
              <el-input v-model="form.attrKeyName"></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop="sort">
              <el-input v-model="form.sort"></el-input>
            </el-form-item>
          </el-form>
          <template v-if="dialogStatus !== 'detail'" #footer>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </template>
        </base-dialog>
      </el-col>
      <el-col :span="16">
        <attr-value ref="attrValueRef" />
      </el-col>
    </el-row>
  </base-wraper>
</template>

<script setup>
import attrValue from './attr-value.vue';
const { proxy } = getCurrentInstance();
let listQuery = $ref({});
let form = $ref({});
let dialogVisible = $ref(false);
let dialogStatus = $ref('');

function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleAdd() {
  form = Object.assign({}, {});
  form.isShow = true;
  form.sort = 1;
  dialogStatus = 'add';
  dialogVisible = true;
}
function handleUpdate(row) {
  form = Object.assign({}, row);
  dialogStatus = 'update';
  dialogVisible = true;
}
async function handleDelete(row) {
  let res = await proxy.$api.pms_attr.deleteKey({ id: row.id });
  refreshTableData();
  proxy.submitOk(res.message);
}
function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      let res = await proxy.$api.pms_attr[form.id ? 'updateKey' : 'addKey'](form);
      proxy.submitOk(res.message);
      refreshTableData();
      dialogVisible = false;
    }
  });
}
function tableNodeclick(row) {
  proxy.$refs.attrValueRef.show(row);
}
</script>
<style scoped></style>

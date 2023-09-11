<template>
  <base-wraper class="flex">
    <div style="width: 400px">
      <base-header>
        <el-input v-model="listQuery.name" placeholder="请输入分类名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
        <el-button type="primary" @click="refreshTableData">查询</el-button>
        <template #right>
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </template>
      </base-header>

      <base-table-p ref="baseTableRef" api="pms_category.list" :params="listQuery" :is-page="false" @cell-click="tableNodeclick">
        <!-- <el-table-column label="ID" prop="id" align="center" width="160px"></el-table-column> -->
        <!-- <el-table-column label="父分类id" prop="parentId" align="center" width="160px"></el-table-column> -->
        <el-table-column label="分类名称" prop="name" align="center"></el-table-column>
        <el-table-column label="排序" prop="sort" align="center"></el-table-column>
        <el-table-column label="是否显示" prop="isShow" align="center">
          <template #default="scope">
            {{ scope.row.isShow ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
            <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
          </template>
        </el-table-column>
      </base-table-p>

      <base-dialog v-model="dialogVisible" :title="dialogTitleObj[dialogStatus]" width="30%">
        <el-form v-if="dialogStatus !== 'detail'" ref="dataFormRef" :model="form" label-width="100px">
          <!-- <el-form-item label="父分类id:" prop="parentId">
          <el-input v-model="form.parentId"></el-input>
        </el-form-item> -->
          <el-form-item label="分类名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="是否显示:" prop="isShow">
            <el-radio-group v-model="form.isShow">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template v-if="dialogStatus !== 'detail'" #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </template>
      </base-dialog>
    </div>
    <div class="flex-1 m-x-10">
      <spu ref="spuRef" />
    </div>
  </base-wraper>
</template>

<script setup>
import spu from './spu.vue';
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
  let res = await proxy.$api.pms_category.deleteBatch({ idList: [row.id].join() });
  refreshTableData();
  proxy.submitOk(res.message);
}
function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      form.parentId = 0;
      let res = await proxy.$api.pms_category[form.id ? 'update' : 'add'](form);
      proxy.submitOk(res.message);
      refreshTableData();
      dialogVisible = false;
    }
  });
}
function tableNodeclick(row) {
  proxy.$refs.spuRef.show(row.id);
}
</script>
<style scoped></style>

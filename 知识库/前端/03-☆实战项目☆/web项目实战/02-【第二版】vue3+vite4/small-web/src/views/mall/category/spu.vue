<template>
  <base-no-data v-show="!listQuery.categoryId" style="height: 200px">tip:点击分类可查看关联商品数据</base-no-data>
  <div v-show="listQuery.categoryId">
    <base-header>
      <span class="font-bold font-size-base">关联商品：</span>
      <!-- <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input> -->
      <template #right>
        <el-button type="primary" @click="refreshTableData">刷新</el-button>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="pms_category_spu_relation.page" :params="listQuery">
      <el-table-column label="商品ID" prop="spuId" align="center"></el-table-column>
      <el-table-column label="名称" prop="spuName" align="center"></el-table-column>
      <el-table-column label="封面图" prop="spuCoverImg" align="center">
        <template #default="scope">
          <el-image :src="scope.row.spuCoverImg" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="是否上架" prop="isPut" align="center">
        <template #default="scope">
          {{ scope.row.isPut ? '上架' : '下架' }}
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="isShow" align="center">
        <template #default="scope">
          {{ scope.row.isShow ? '显示' : '隐藏' }}
        </template>
      </el-table-column>
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
        <el-form-item v-if="dialogStatus === 'add'" label="商品:">
          <el-select v-model="form.spuId" filterable placeholder="选择商品">
            <el-option v-for="item in spuList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'update'" label="商品名称:">
          <el-input v-model="form.spuName" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否上架:" prop="isPut">
          <el-radio-group v-model="form.isPut">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示:" prop="isShow">
          <el-radio-group v-model="form.isShow">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
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
let spuList = $ref([]);

defineExpose({ show });

function show(categoryId) {
  listQuery.categoryId = categoryId;
  refreshTableData();
}
function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleAdd() {
  getSpuList();
  form = Object.assign({}, {});
  form.isPut = true;
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
  let res = await proxy.$api.pms_category_spu_relation.deleteBatch({ idList: [row.id].join() });
  refreshTableData();
  proxy.submitOk(res.message);
}
function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      form.categoryId = listQuery.categoryId;
      let res = await proxy.$api.pms_category_spu_relation[form.id ? 'update' : 'add'](form);
      proxy.submitOk(res.message);
      refreshTableData();
      dialogVisible = false;
    }
  });
}
async function getSpuList() {
  let res = await proxy.$api.pms_spu.list({ notEqCategoryId: listQuery.categoryId });
  spuList = res.data;
}
</script>
<style scoped></style>

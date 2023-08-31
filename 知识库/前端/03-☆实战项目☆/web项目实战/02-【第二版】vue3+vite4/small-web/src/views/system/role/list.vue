<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.name" clearable placeholder="角色名称" style="width: 200px" @clear="refreshTableData" />
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="add">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="sys_role.listPage" :params="listQuery">
      <el-table-column prop="name" label="角色名" />
      <el-table-column prop="code" label="角色编码" />
      <el-table-column label="操作" align="center" width="250">
        <template #default="scope">
          <el-button link @click="update(scope.row)">编辑</el-button>
          <router-link :to="{ path: '/system/role-edit', query: { id: scope.row.roleId } }">
            <el-button link>权限</el-button>
          </router-link>
          <base-delete-btn @ok="deleteData(scope.row.roleId)" />
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="textMap[dialogStatus]" width="50%">
      <el-form ref="roleFormRef" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名：" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="角色编码：" prop="code">
          <el-input v-model="roleForm.code" placeholder="请输入角色编码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let roleForm = $ref({});
let dialogVisible = $ref(false);
let listQuery = $ref({});
let rules = {
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
};
let dialogStatus = $ref('');
let textMap = $ref({ update: '编辑', create: '添加' });

async function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function saveForm() {
  proxy.$refs.roleFormRef.validate(async (valid) => {
    if (valid) {
      let res = await proxy.$api.sys_role[roleForm.roleId ? 'update' : 'add'](roleForm);
      proxy.submitOk(res.msg);
      refreshTableData();
      dialogVisible = false;
    }
  });
}
function update(row) {
  roleForm = Object.assign({}, row);
  dialogVisible = true;
  dialogStatus = 'update';
}
function add() {
  dialogVisible = true;
  dialogStatus = 'create';
  roleForm.roleId = null;
  roleForm.name = '';
  roleForm.code = '';
}
async function deleteData(id) {
  let res = await proxy.$api.sys_role.delete(id);
  proxy.submitOk(res.msg);
  refreshTableData();
}
</script>
<style scoped></style>

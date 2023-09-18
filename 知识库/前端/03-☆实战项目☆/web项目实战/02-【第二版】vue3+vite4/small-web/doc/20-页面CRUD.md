# 页面CRUD

![vue3-curd-1.png](images/20-页面CRUD-1.png)
![vue3-curd-2.png](images/20-页面CRUD-2.png)
![vue3-curd-3.png](images/20-页面CRUD-3.png)

[src/views/system/role/list.vue](../src/views/system/role/list.vue)

```vue
<template>
  <base-wrapper>
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
  </base-wrapper>
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
let textMap = $ref({ update: '编辑', add: '添加' });

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
  dialogStatus = 'add';
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
```

[src/api/system/sys_role.js](../src/api/system/sys_role.js)

```js
import request from '@/utils/request';

const BASE_API = '/web/api/system/role';

export default {
  listPage(query, headers) {
    return request({
      url: BASE_API + '/listPage',
      method: 'get',
      params: query,
      headers,
    });
  },
  list(query) {
    return request({
      url: BASE_API + '/list',
      method: 'get',
      params: query,
    });
  },
  detail(id) {
    return request({
      url: BASE_API + '/detail',
      method: 'get',
      params: { roleId: id },
    });
  },
  add(data) {
    return request({
      url: BASE_API,
      method: 'post',
      data,
    });
  },
  update(data) {
    return request({
      url: BASE_API,
      method: 'put',
      data,
    });
  },
  delete(id) {
    return request({
      url: BASE_API,
      method: 'delete',
      params: { roleId: id },
    });
  },
  updateStatus(id, status) {
    return request({
      url: BASE_API + '/updateStatus',
      method: 'post',
      data: { roleId: id, status: status },
    });
  },
};
```

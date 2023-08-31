<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.username" clearable placeholder="请输入账号" style="width: 200px" @clear="refreshTableData" />
      <el-input v-model="listQuery.nickname" clearable placeholder="请输入名称" style="width: 200px" @clear="refreshTableData" />
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button v-has-perm="'sys:user:add'" type="primary" @click="handleCreate">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTableRef" api="sys_user.listPage" :params="listQuery">
      <el-table-column :show-overflow-tooltip="true" prop="username" label="用户账号" />
      <el-table-column prop="nickname" label="用户名称" />
      <el-table-column prop="sexName" label="性别" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="头像" prop="avatarUrl" align="center">
        <template #default="scope">
          <span>
            <img :src="scope.row.avatarUrl" alt="" class="img-sm" />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template #default="scope">
          <el-button link @click="handleUpdate(scope.row, 'update')">编辑</el-button>
          <el-button link @click="handleUpdate(scope.row, 'role')">角色权限</el-button>
          <base-delete-btn @ok="deleteData(scope.row.userId)" />
          <el-button link @click="updatePwd(scope.row)">更新密码</el-button>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-if="dialogStatus === 'updatePwd'" v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
      <el-input v-model="newPassword" />
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPwd()">确定</el-button>
      </template>
    </base-dialog>
    <base-dialog v-else v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
      <el-form ref="dataFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="头像:" prop="avatarUrl">
          <base-upload-single v-model="form.avatarUrl" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </base-dialog>

    <role-permission ref="rolePermRef" @save-succ="refreshTableData" />
  </base-wraper>
</template>
<script setup>
import RolePermission from './rolePermission.vue';

const { proxy } = getCurrentInstance();
let useUserStore = proxy.$store.user.useUserStore();
let { logout } = useUserStore;
let { userObj } = toRefs(useUserStore);

let dialogVisible = ref(false);
let listQuery = ref({});
let form = ref({});
let dialogStatus = ref('');
let titleMap = ref({
  update: '编辑',
  create: '创建',
  updatePwd: '更新密码',
});
let newPassword = ref('123456');
let rules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pwd: [{ pattern: /^(\w){6,16}$/, message: '请设置6-16位字母、数字组合' }],
  nickname: [{ required: true, message: '请输入你昵称', trigger: 'blur' }],
});

async function refreshTableData() {
  proxy.$refs.baseTableRef.refresh();
}
function handleCreate() {
  form.value = {};
  form.value.sex = 0;
  dialogStatus.value = 'create';
  dialogVisible.value = true;
}
function handleUpdate(row, type) {
  if (type === 'update') {
    form.value = Object.assign({}, row);
    dialogStatus.value = 'update';
    dialogVisible.value = true;
  } else if (type === 'role') {
    proxy.$refs.rolePermRef.open(row);
  }
}
async function deleteData(id) {
  let res = await proxy.$api.sys_user.delete(id);
  proxy.submitOk(res.messge);
  refreshTableData();
}
async function updatePwd(row) {
  form.value = Object.assign({}, row);
  dialogStatus.value = 'updatePwd';
  newPassword.value = '123456';
  dialogVisible.value = true;
}
async function submitPwd() {
  let res = await proxy.$api.sys_user.resetPassword({ userId: form.value.userId, password: newPassword.value });
  proxy.submitOk(res.msg, () => {
    handelCurrentLoginUser();
  });
  dialogVisible.value = false;
}
function submitForm() {
  proxy.$refs.dataFormRef.validate(async (valid) => {
    if (valid) {
      if (form.value.pwd) {
        form.value.password = form.value.pwd;
      }
      let res = await proxy.$api.sys_user[form.value.userId ? 'update' : 'add'](form.value);
      proxy.submitOk(res.msg);
      handelCurrentLoginUser();
      refreshTableData();
      dialogVisible.value = false;
    }
  });
}
function handelCurrentLoginUser() {
  if (form.value.userId === userObj.value.userId) {
    logout();
  }
}
</script>
<style lang="scss" scoped></style>

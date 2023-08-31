<template>
  <base-dialog v-model="dialogRoleVisible" title="修改用户角色" width="700px">
    <el-form ref="userFormRef" :model="userForm">
      <base-cell label-width="80px">
        <base-cell-item label="用户名称：">{{ userForm.nickname }}</base-cell-item>
        <base-cell-item label="用户账号：">{{ userForm.username }}</base-cell-item>
      </base-cell>
    </el-form>
    <div class="m-t-20">
      <h3>角色权限</h3>
      <el-transfer
        v-model="userForm.roleIdList"
        class="m-t-20"
        :data="roleList"
        :titles="['待选列表', '已选列表']"
        :props="{
          key: 'roleId',
          label: 'name',
        }" />
    </div>
    <template #footer>
      <el-button @click="dialogRoleVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitRoleForm">确 定</el-button>
    </template>
  </base-dialog>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let dialogRoleVisible = ref(false);
let roleList = ref([]);
let userForm = ref({});

// 暴露方法
defineExpose({
  open,
});

async function open(data) {
  let res = await proxy.$api.sys_role.list();
  roleList.value = res.data;
  userForm.value = Object.assign({}, data);
  dialogRoleVisible.value = true;
}

async function submitRoleForm() {
  let res = await proxy.$api.sys_user.saveRoleIds(userForm.value);
  proxy.$emit('save-succ');
  dialogRoleVisible.value = false;
  proxy.submitOk(res.msg);
}
</script>
<style lang="scss" scoped></style>

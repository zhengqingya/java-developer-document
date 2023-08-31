<template>
  <base-dialog v-model="dialogRoleVisible" title="修改用户角色" width="700px">
    <el-form ref="userForm" :model="userForm" label-width="100px">
      <base-table-cell>
        <base-cell-item label="用户名称：">{{ userForm.nickname }}</base-cell-item>
        <base-cell-item label="用户账号：">{{ userForm.username }}</base-cell-item>
      </base-table-cell>
    </el-form>
    <div style="margin-left: 0px; margin-top: 10px">
      <el-transfer v-model="userForm.roleIdList" :data="roleList" :titles="['待选列表', '已选列表']" :props="{
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
<script>
export default {
  name: 'RolePermission',
  emits: ["saveSucc"],
  data() {
    return {
      dialogRoleVisible: false,
      roleList: [], // 角色列表
      userForm: {},
    }
  },
  methods: {
    open(data) {
      this.getRoleList()
      if (data.roleIdList) {
        // 把数组项拼接成字符串，并以分号隔开
        // data.roleIdList = '[' + data.roleIdList.join(',') + ']';
      }
      const computedRoleIds = data.roleIdList ? data.roleIdList : []
      this.userForm = Object.assign({}, data, { roleIdList: computedRoleIds })
      this.dialogRoleVisible = true
    },
    async getRoleList() {
      let res = await this.$api.sys_role.list({ status: 1 })
      this.roleList = res.data
    },
    async submitRoleForm() {
      this.userForm.roleIdList = this.userForm.roleIdList
      let res = await this.$api.sys_user.saveRoleIds(this.userForm)
      this.$emit('saveSucc')
      this.dialogRoleVisible = false
      this.submitOk(res.msg)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>

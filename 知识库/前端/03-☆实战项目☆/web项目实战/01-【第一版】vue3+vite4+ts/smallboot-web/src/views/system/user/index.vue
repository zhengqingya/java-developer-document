<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.username" clearable placeholder="请输入账号" style="width: 200px" @clear="refreshTableData" />
      <el-input v-model="listQuery.nickname" clearable placeholder="请输入名称" style="width: 200px" @clear="refreshTableData" />
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button v-hasPerm="'sys:user:add'" type="primary" @click="handleCreate">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="sys_user.listPage" :params="listQuery">
      <el-table-column :show-overflow-tooltip="true" prop="username" label="用户账号" />
      <el-table-column prop="nickname" label="用户名称" />
      <el-table-column prop="sexName" label="性别" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="头像" prop="avatarUrl" align="center">
        <template v-slot="scope">
          <span>
            <img :src="scope.row.avatarUrl" alt="" style="width: 50px; height: 50px" />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template v-slot="scope">
          <el-button link @click="handleUpdate(scope.row, 'update')">编辑</el-button>
          <el-button link @click="handleUpdate(scope.row, 'role')">角色权限</el-button>
          <base-delete-btn @ok="deleteData(scope.row.userId)" />
          <el-button link @click="updatePwd(scope.row)">更新密码</el-button>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-if="dialogStatus === 'updatePwd'" v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%" @close="handleDialogClose">
      <el-input v-model="newPassword" />
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPwd()">确定</el-button>
      </template>
    </base-dialog>
    <base-dialog v-else v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%" @close="handleDialogClose">
      <el-form ref="dataForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="头像:" prop="avatarUrl">
          <base-upload :url="form.avatarUrl" @saveSucc="(url) => (form.avatarUrl = url)" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </base-dialog>

    <role-permission ref="rolePermisson" @saveSucc="refreshTableData" />
  </base-wraper>
</template>
<script>
import RolePermission from './rolePermission.vue'
import useStore from '@/store'
export default {
  name: 'User',
  components: { RolePermission },
  data() {
    return {
      userId: useStore().user.userId,
      dialogVisible: false,
      sexList: [
        { key: 0, display_name: '未知' },
        { key: 1, display_name: '男' },
        { key: 2, display_name: '女' },
      ],
      listQuery: {
        username: '',
        nickname: '',
      },
      form: {
        userId: undefined, // 主键ID
        username: undefined, // 账号
        password: undefined, // 登录密码
        pwd: undefined, // 登录密码(修改密码时使用)
        nickname: undefined, // 昵称
        sex: undefined, // 性别 0:男 1:女
        phone: undefined, // 手机号码
        email: undefined, // 邮箱
        avatarUrl: undefined, // 头像
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建',
        updatePwd: '更新密码',
      },
      newPassword: '123456',
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ pattern: /^(\w){6,16}$/, message: '请设置6-16位字母、数字组合' }],
        nickname: [{ required: true, message: '请输入你昵称', trigger: 'blur' }],
      },
    }
  },
  mounted() {},
  methods: {
    async refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row, type) {
      if (type === 'update') {
        this.form = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogVisible = true
      } else if (type === 'role') {
        this.$refs.rolePermisson.open(row)
      }
    },
    async deleteData(id) {
      let res = await this.$api.sys_user.delete(id)
      this.submitOk(res.messge)
      this.refreshTableData()
    },
    async updatePwd(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'updatePwd'
      this.newPassword = '123456'
      this.dialogVisible = true
    },
    async submitPwd() {
      let userId = this.form.userId
      if (userId) {
        let res = await this.$api.sys_user.resetPassword({ userId: userId, password: this.newPassword })
        this.submitOk(res.msg, () => {
          const currentUser = useStore().user.userId
          if (userId === currentUser) {
            this.$store.dispatch('user/logout').then((res) => {
              this.$router.replace({ path: '/login' })
            })
          }
        })
        this.dialogVisible = false
      }
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.form.pwd) {
            this.form.password = this.form.pwd
          }
          let res = await this.$api.sys_user[this.form.userId ? 'update' : 'add'](this.form)
          this.refreshTableData()
          this.submitOk(res.msg)
          this.dialogVisible = false
        }
      })
      if (this.userId === this.form.userId) {
        // store数据修改
      }
    },
    resetForm() {
      this.form = {
        userId: undefined, // 主键ID
        username: undefined, // 账号
        password: '', // 登录密码
        pwd: '', // 登录密码(修改密码时使用)
        nickname: undefined, // 昵称
        sex: undefined, // 性别 0:男 1:女
        phone: undefined, // 手机号码
        email: undefined, // 邮箱
        avatarUrl: undefined, // 头像
        status: undefined, // 状态
      }
    },
    // 监听dialog关闭时的处理事件
    handleDialogClose() {
      if (this.$refs['dataForm']) {
        this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

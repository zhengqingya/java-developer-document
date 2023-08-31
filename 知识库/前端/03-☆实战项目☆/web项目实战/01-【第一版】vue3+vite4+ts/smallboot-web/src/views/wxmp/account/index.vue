<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.account" placeholder="请输入公众号ID" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-input v-model="listQuery.appId" placeholder="请输入AppID" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="wx_mp_account.page" :params="listQuery">
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="账号类型" prop="typeName" align="center"></el-table-column>
      <el-table-column label="公众号ID" prop="account" align="center"></el-table-column>
      <el-table-column label="AppID" prop="appId" align="center"></el-table-column>
      <!-- <el-table-column label="AppSecret" prop="appSecret" align="center"></el-table-column> -->
      <!-- <el-table-column label="Token" prop="token" align="center"></el-table-column> -->
      <!-- <el-table-column label="AESKey" prop="aesKey" align="center"></el-table-column> -->
      <el-table-column label="公众号二维码" prop="qrCodeUrl" align="center">
        <template v-slot="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.qrCodeUrl" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button link @click="showApiUrl(scope.row)">接入地址</el-button>
          <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
      <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号类型:" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option v-for="item in accountTypeList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="公众号ID:" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="AppID:" prop="appId">
          <el-input v-model="form.appId"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret:" prop="appSecret">
          <el-input v-model="form.appSecret"></el-input>
        </el-form-item>
        <el-form-item label="Token:" prop="token">
          <el-input v-model="form.token"></el-input>
        </el-form-item>
        <el-form-item label="AESKey:" prop="aesKey">
          <el-input v-model="form.aesKey"></el-input>
        </el-form-item>
        <el-form-item label="二维码地址:" prop="qrCodeUrl">
          <el-input v-model="form.qrCodeUrl"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>

<script>
export default {
  name: 'WxMpAccount',
  data() {
    return {
      listQuery: {},
      form: {},
      accountTypeList: [
        { value: 1, name: '测试号' },
        { value: 2, name: '服务号' },
        { value: 3, name: '订阅号' },
      ],
      dialogVisible: false,
      dialogStatus: '',
      titleMap: {
        add: '添加',
        update: '编辑',
        detail: '详情',
      },
      rules: {},
    }
  },
  created() {},
  methods: {
    refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    handleAdd() {
      this.form = Object.assign({}, {})
      this.dialogStatus = 'add'
      this.dialogVisible = true
    },
    showApiUrl(row) {
      alert('接入地址：http://{ip}' + row.url)
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    async handleDelete(row) {
      let res = await this.$api.wx_mp_account.delete(row.id)
      this.refreshTableData()
      this.submitOk(res.message)
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let res = await this.$api.wx_mp_account[this.form.id ? 'update' : 'add'](this.form)
          this.refreshTableData()
          this.submitOk(res.message)
          this.dialogVisible = false
        }
      })
    },
  },
}
</script>
<style scoped></style>

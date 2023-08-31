<template>
  <base-wraper v-show="isShow">
    <base-header>
      <!-- <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input> -->
      <template #right>
        <el-button type="primary" @click="refreshTableData">刷新</el-button>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="pms_attr.listValue" :params="listQuery" :isPage="false">
      <el-table-column label="属性名称" prop="attrValueName" align="center"></el-table-column>
      <el-table-column label="排序" prop="sort" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
          <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
        </template>
      </el-table-column>
    </base-table-p>

    <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
      <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="规格名称:">
          <el-input v-model="attrKeyObj.attrKeyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="属性名称:">
          <el-input v-model="form.attrValueName"></el-input>
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
  </base-wraper>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      attrKeyObj: null,
      listQuery: {},
      form: {},
      dialogVisible: false,
      dialogStatus: '',
      titleMap: {
        add: '添加',
        update: '编辑',
      },
      rules: {},
      spuList: [],
    }
  },
  created() {},
  methods: {
    show(attrKeyObj) {
      this.isShow = true
      this.attrKeyObj = attrKeyObj
      console.log(attrKeyObj)
      this.listQuery.attrKeyId = attrKeyObj.id
      this.refreshTableData()
    },
    refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    handleAdd() {
      this.form = Object.assign({}, {})
      this.form.sort = 1
      this.dialogStatus = 'add'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    async handleDelete(row) {
      let res = await this.$api.pms_attr.deleteValue({ id: row.attrValueId })
      this.refreshTableData()
      this.submitOk(res.message)
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.form.id = this.form.attrValueId
          this.form.attrKeyId = this.attrKeyObj.id
          let res = await this.$api.pms_attr[this.form.id ? 'updateValue' : 'addValue'](this.form)
          this.submitOk(res.message)
          this.refreshTableData()
          this.dialogVisible = false
        }
      })
    },
  },
}
</script>
<style scoped></style>

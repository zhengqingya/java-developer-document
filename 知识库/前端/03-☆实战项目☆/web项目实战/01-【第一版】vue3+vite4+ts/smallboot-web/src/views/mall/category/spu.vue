<template>
  <base-wraper v-show="isShow">
    <base-header>
      <!-- <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input> -->
      <template #right>
        <el-button type="primary" @click="refreshTableData">刷新</el-button>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="pms_category_spu_relation.page" :params="listQuery">
      <el-table-column label="商品ID" prop="spuId" align="center"></el-table-column>
      <el-table-column label="名称" prop="spuName" align="center"></el-table-column>
      <el-table-column label="封面图" prop="spuCoverImg" align="center">
        <template v-slot="scope">
          <el-image :src="scope.row.spuCoverImg" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="是否上架" prop="isPut" align="center">
        <template v-slot="scope">
          {{ scope.row.isPut ? '上架' : '下架' }}
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="isShow" align="center">
        <template v-slot="scope">
          {{ scope.row.isShow ? '显示' : '隐藏' }}
        </template>
      </el-table-column>
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
  </base-wraper>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
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
    show(categoryId) {
      this.isShow = true
      this.listQuery.categoryId = categoryId
      this.refreshTableData()
    },
    refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    handleAdd() {
      this.getSpuList()
      this.form = Object.assign({}, {})
      this.form.isPut = true
      this.form.isShow = true
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
      let res = await this.$api.pms_category_spu_relation.deleteBatch({ idList: [row.id].join() })
      this.refreshTableData()
      this.submitOk(res.message)
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.form.categoryId = this.listQuery.categoryId
          let res = await this.$api.pms_category_spu_relation[this.form.id ? 'update' : 'add'](this.form)
          this.submitOk(res.message)
          this.refreshTableData()
          this.dialogVisible = false
        }
      })
    },
    async getSpuList() {
      let res = await this.$api.pms_spu.list({ notEqCategoryId: this.listQuery.categoryId })
      this.spuList = res.data
    },
  },
}
</script>
<style scoped></style>

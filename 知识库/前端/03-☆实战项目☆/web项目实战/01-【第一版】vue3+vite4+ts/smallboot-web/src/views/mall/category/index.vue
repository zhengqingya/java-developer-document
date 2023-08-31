<template>
  <base-wraper>
    <el-row :gutter="20">
      <el-col :span="8">
        <base-header>
          <el-input v-model="listQuery.name" placeholder="请输入分类名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
          <el-button type="primary" @click="refreshTableData">查询</el-button>
          <template #right>
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </template>
        </base-header>

        <base-table-p ref="baseTable" api="pms_category.list" :params="listQuery" :isPage="false" @cell-click="tableNodeclick">
          <!-- <el-table-column label="ID" prop="id" align="center" width="160px"></el-table-column> -->
          <!-- <el-table-column label="父分类id" prop="parentId" align="center" width="160px"></el-table-column> -->
          <el-table-column label="分类名称" prop="name" align="center"></el-table-column>
          <!-- <el-table-column label="排序" prop="sort" align="center"></el-table-column> -->
          <el-table-column label="是否显示" prop="isShow" align="center">
            <template v-slot="scope">
              {{ scope.row.isShow ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template v-slot="scope">
              <el-button link @click="handleUpdate(scope.row)">编辑</el-button>
              <base-delete-btn @ok="handleDelete(scope.row)"></base-delete-btn>
            </template>
          </el-table-column>
        </base-table-p>

        <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
          <el-form ref="dataForm" v-if="dialogStatus !== 'detail'" :model="form" :rules="rules" label-width="100px">
            <!-- <el-form-item label="父分类id:" prop="parentId">
          <el-input v-model="form.parentId"></el-input>
        </el-form-item> -->
            <el-form-item label="分类名称:" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop="sort">
              <el-input v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否显示:" prop="isShow">
              <el-radio-group v-model="form.isShow">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <template #footer v-if="dialogStatus !== 'detail'">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </template>
        </base-dialog>
      </el-col>
      <el-col :span="16" style="height: 100%">
        <spu ref="spu" />
      </el-col>
    </el-row>
  </base-wraper>
</template>

<script>
import spu from './spu.vue'
export default {
  name: 'PmsCategory',
  components: { spu },
  data() {
    return {
      listQuery: {},
      form: {},
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
      let res = await this.$api.pms_category.deleteBatch({ idList: [row.id].join() })
      this.refreshTableData()
      this.submitOk(res.message)
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.form.parentId = 0
          let res = await this.$api.pms_category[this.form.id ? 'update' : 'add'](this.form)
          this.submitOk(res.message)
          this.refreshTableData()
          this.dialogVisible = false
        }
      })
    },
    tableNodeclick(row) {
      // console.log('分类ID', row.id)
      this.$refs.spu.show(row.id)
    },
  },
}
</script>
<style scoped></style>

<template>
  <base-wraper>
    <base-header>
      <el-input v-model="listQuery.name" placeholder="请输入名称" style="width: 200px" clearable @clear="refreshTableData"></el-input>
      <el-button type="primary" @click="refreshTableData">查询</el-button>
      <template #right>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </base-header>

    <base-table-p ref="baseTable" api="pms_spu.page" :params="listQuery">
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="封面图" prop="coverImg" align="center">
        <template v-slot="scope">
          <el-image :src="scope.row.coverImg" style="width: 50px; height: 50px" />
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

    <base-dialog v-if="dialogVisible" v-model="dialogVisible" :title="titleMap[dialogStatus]" width="80%">
      <el-form ref="dataForm" v-if="dialogStatus !== 'detail'" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="封面图:" prop="coverImg">
          <base-upload-single v-model="form.coverImg" />
        </el-form-item>
        <el-form-item label="轮播图:" prop="slideImgList">
          <base-upload-multi v-model="form.slideImgList" />
        </el-form-item>
        <el-form-item label="商品详情图:" prop="detailImgList">
          <base-upload-multi v-model="form.detailImgList" />
        </el-form-item>
        <el-form-item label="商品sku:">
          <sku-form ref="skuForm" v-model="form.skuList" />
        </el-form-item>
        <el-form-item label="是否上架:" prop="isPut">
          <el-radio-group v-model="form.isPut">
            <el-radio :label="false">下架</el-radio>
            <el-radio :label="true">上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示:" prop="isShow">
          <el-radio-group v-model="form.isShow">
            <el-radio :label="false">隐藏</el-radio>
            <el-radio :label="true">显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="运费:" prop="freight">
          <el-input v-model="form.freight"></el-input>
        </el-form-item>
      </el-form>
      <template #footer v-if="dialogStatus !== 'detail'">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>

<script>
import skuForm from './sku-form.vue'

export default {
  name: 'PmsSpu',
  components: { skuForm },
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
      this.dialogStatus = 'add'
      this.dialogVisible = true
      this.form.isPut = true
      this.form.isShow = true
      this.form.sort = 0
      this.form.freight = 0
      this.form.type = 101
    },
    async handleUpdate(row) {
      // this.form = Object.assign({}, row)
      let res = await this.$api.pms_spu.detail({ id: row.id })
      this.form = Object.assign({}, res.data)
      this.dialogStatus = 'update'
      this.dialogVisible = true

      // 金额一类 分转元
      this.form.freight = this.form.freight / 100

      // 初始化sku组件数据 -- 无效
      // this.$refs.skuForm.init()
      // skuForm.methods.init()
    },
    async handleDelete(row) {
      let res = await this.$api.pms_spu.deleteBatch({ idList: [row.id].join() })
      this.refreshTableData()
      this.submitOk(res.message)
    },
    submitForm() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          // 金额 元转分
          this.form.freight = this.form.freight * 100
          this.form.skuList.forEach((item) => {
            item.sellPrice = item.sellPrice * 100
          })
          let res = await this.$api.pms_spu[this.form.id ? 'update' : 'add'](this.form)
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

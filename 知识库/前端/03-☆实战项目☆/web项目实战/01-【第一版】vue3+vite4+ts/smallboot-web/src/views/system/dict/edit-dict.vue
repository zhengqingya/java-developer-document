<template>
  <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="20%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="字典名称：" prop="name">
        <el-input v-model="form.name" placeholder="输入字典名称" />
      </el-form-item>
      <el-form-item label="字典值：" prop="value">
        <el-input v-model="form.value" placeholder="输入字典值" />
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="form.sort" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </template>
  </base-dialog>
</template>
<script>
export default {
  name: 'EditDict',
  emits: ['saveSucc'],
  data() {
    return {
      titleMap: {
        create: '添加',
        update: '编辑',
      },
      dialogStatus: '',
      dialogVisible: false,
      form: {
        id: undefined,
        name: '',
        sort: 0,
        value: '',
        dictTypeId: undefined,
      },
      rules: {
        name: [{ required: true, message: '字典名称不得为空', trigger: 'blur' }],
        value: [{ required: true, message: '字典值不得为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    open(type, data, dictTypeId, code, maxSort) {
      this.dialogStatus = type
      if (type === 'create') {
        this.resetForm()
        this.form.dictTypeId = dictTypeId
        this.form.code = code
        this.form.sort = maxSort
      } else if (type === 'update') {
        this.form = Object.assign({}, data)
      }
      this.dialogVisible = true
    },
    handleSave() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res = await this.$api.sys_dict[this.form.id ? 'update' : 'add'](this.form)
          this.$emit('saveSucc')
          this.dialogVisible = false
          this.submitOk(res.msg)
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.form = {
        id: undefined,
        name: '',
        sort: 0,
        value: '',
        dictTypeId: undefined,
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

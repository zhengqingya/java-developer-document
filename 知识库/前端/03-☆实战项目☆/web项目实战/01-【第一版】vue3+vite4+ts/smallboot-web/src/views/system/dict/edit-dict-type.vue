<template>
  <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="字典类型名称：" prop="name">
        <el-input v-model="form.name" placeholder="输入字典类型名称" />
      </el-form-item>
      <el-form-item label="字典类型编码：">
        <el-input v-model="form.code" :disabled="form.id" placeholder="输入字典类型编码" />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-select v-model="form.status" placeholder="请选择" style="width: 280px">
          <el-option v-for="item in statusList" :key="item.value" :label="item.name" :value="item.value" />
        </el-select>
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
  name: 'EditDictType',
  emits: ["saveSucc"],
  data() {
    return {
      statusList: [
        { value: 1, name: '启用' },
        { value: 0, name: '禁用' },
      ],
      titleMap: {
        create: '添加',
        update: '编辑',
      },
      dialogStatus: '',
      dialogVisible: false,
      form: {
        id: undefined,
        code: '',
        name: '',
        status: 1,
      },
    }
  },
  methods: {
    open(type, data) {
      this.dialogStatus = type
      if (type === 'create') {
        this.form = Object.assign({}, {})
        this.form.status = 1
      } else if (type === 'update') {
        this.form = Object.assign({}, data)
      }
      this.dialogVisible = true
    },
    async handleSave() {
      let res = await this.$api.sys_dict_type[this.form.id ? 'update' : 'add'](this.form)
      this.$emit('saveSucc')
      this.dialogVisible = false
      this.submitOk(res.msg)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>

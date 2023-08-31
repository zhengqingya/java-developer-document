<template>
  <base-dialog v-model="dialogVisible" :title="titleMap[dialogStatus]" width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="120px">
      <el-form-item v-if="hasParent" label="上级菜单:">
        <span>{{ parentName }}</span>
      </el-form-item>
      <el-form-item label="菜单标题:" prop="title">
        <el-input v-model="form.title" placeholder="输入标题" />
      </el-form-item>
      <el-form-item label="菜单名称:">
        <el-input v-model="form.name" placeholder="输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单路径:" prop="path">
        <el-input v-model="form.path" placeholder="输入菜单链接" />
      </el-form-item>
      <el-form-item label="重定向路径:">
        <el-input v-model="form.redirect" placeholder="输入重定向路径" />
      </el-form-item>
      <el-form-item label="组件名称:" prop="component">
        <el-input v-model="form.component" placeholder="输入菜单对应的文件路径" />
      </el-form-item>
      <el-form-item label="菜单图标:">
        <el-select v-model="form.icon" placeholder="请选择图标" style="width: 200px" clearable>
          <el-option v-for="item in elIconList" :key="item.name" :value="item.name" :label="item.name">
            <span style="float: left; color: #8492a6; font-size: 12px">{{ item.name }}</span>
            <div style="float: right">
              <el-icon>
                <component :is="item.name" />
              </el-icon>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示顺序:">
        <el-input-number v-model="form.sort" />
      </el-form-item>
      <el-form-item label="是否隐藏:">
        <el-radio-group v-model="form.hidden">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示面包屑:">
        <el-radio-group v-model="form.breadcrumb">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示子菜单:">
        <el-radio-group v-model="form.isShowChildren">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
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
  emits: ['handleSucc'],
  data() {
    return {
      dialogVisible: false,
      titleMap: { create: '创建', edit: '编辑' },
      dialogStatus: 'create',
      hasParent: false,
      parentName: '',
      elIconList: [],
      form: {},
      rules: {
        title: [{ required: true, message: '菜单标题不得为空', trigger: 'blur' }],
        path: [{ required: true, message: '菜单链接不得为空', trigger: 'blur' }],
        component: [{ required: true, message: '菜单文件路径不得为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    open(type, parent) {
      if (type === 1) {
        // 新增第一级
        this.hasParent = false
        this.resetForm()
      } else if (type === 2) {
        // 添加下一级
        this.hasParent = true
        this.resetForm()
        if (parent) {
          this.form.parentId = parent.menuId
          this.parentName = parent.title
        }
      } else if (type === 3) {
        // 编辑
        if (parent) {
          if (parent.parentId) {
            this.hasParent = true
            this.parentName = parent.parentName
          }
          this.form = Object.assign({}, parent, { menuId: parent.menuId })
        }
      }
      this.getIconList()
      this.dialogVisible = true
    },
    async getIconList() {
      let res = await this.$api.sys_dict.listFromCacheByCode('element_icon')
      this.elIconList = res.data
    },
    handleSave() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res = await this.$api.sys_menu[this.form.menuId ? 'update' : 'add'](this.form)
          this.submitOk(res.msg)
          this.$emit('handleSucc')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.form = {
        parentId: 0,
        title: '',
        name: '',
        path: '',
        redirect: '',
        component: '',
        icon: '',
        sort: '',
        hidden: false, // 是否隐藏
        breadcrumb: true, // 面包屑是否显示
        isShowChildren: true, // 是否显示子菜单
      }
    },
    handleClose() {},
  },
}
</script>
<style lang="scss" scoped></style>

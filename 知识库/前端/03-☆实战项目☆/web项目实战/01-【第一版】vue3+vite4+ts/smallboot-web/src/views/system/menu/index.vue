<template>
  <base-wraper>
    <el-row :gutter="15" style="height: 100%">
      <el-col :span="4" style="height: 100%">
        <base-wraper>
          <base-title-card title="菜单" style="padding-top: 0">
            <el-button type="warning" @click="handleAddMenu">新增一级菜单</el-button>
            <!--菜单树-->
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
          </base-title-card>
        </base-wraper>
      </el-col>
      <el-col :span="8" style="height: 100%">
        <base-wraper>
          <base-title-card title="菜单详情">
            <div v-if="currentClickMenu">
              <el-button type="danger" @click="handleDelete">删除</el-button>
              <el-button type="primary" @click="handleEdit">编辑</el-button>
              <el-button type="primary" @click="addNextMenu">添加下级菜单</el-button>
            </div>
            <base-table-cell v-if="currentClickMenu" label-width="130px">
              <base-cell-item label="菜单ID">{{ currentClickMenu.menuId }}</base-cell-item>
              <base-cell-item label="菜单标题">{{ currentClickMenu.title }}</base-cell-item>
              <base-cell-item label="菜单名称">{{ currentClickMenu.name }}</base-cell-item>
              <base-cell-item label="菜单路径">{{ currentClickMenu.path }}</base-cell-item>
              <base-cell-item label="重定向路径">{{ currentClickMenu.redirect }}</base-cell-item>
              <base-cell-item label="组件名称">{{ currentClickMenu.component }}</base-cell-item>
              <base-cell-item label="菜单图标"><i :class="currentClickMenu.icon" /> {{ currentClickMenu.icon }} </base-cell-item>
              <base-cell-item label="显示顺序">{{ currentClickMenu.sort }}</base-cell-item>
              <base-cell-item label="是否隐藏">{{ currentClickMenu.hidden ? '是' : '否' }}</base-cell-item>
              <base-cell-item label="是否隐藏面包屑">{{ currentClickMenu.breadcrumb ? '显示' : '隐藏' }}</base-cell-item>
              <base-cell-item label="是否显示子菜单">{{ currentClickMenu.isShowChildren ? '显示' : '隐藏' }}</base-cell-item>
              <base-cell-item label="上级菜单">{{ currentClickMenu.parentName }}</base-cell-item>
            </base-table-cell>
            <base-no-data v-else>请先选中左侧菜单</base-no-data>
          </base-title-card>
        </base-wraper>
      </el-col>
      <el-col :span="12" style="height: 100%">
        <base-title-card v-if="currentClickMenu" title="页面按钮权限" style="margin-top: 10px">
          <base-header>
            <template #right>
              <el-button type="primary" @click="refreshTableDataRePerm">刷新</el-button>
              <el-button type="primary" @click="addForMenuRePerm">添加</el-button>
            </template>
          </base-header>
          <base-table-p :data="permDataList" :isPage="false">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="name" label="权限名称" />
            <el-table-column prop="btnPerm" label="按钮权限标识" />
            <el-table-column prop="urlPerm" label="URL权限标识" width="260" />
            <el-table-column label="操作" align="center" width="100">
              <template v-slot="scope">
                <el-button link @click="updateForMenuRePerm(scope.row)">编辑</el-button>
                <base-delete-btn @ok="deleteMenuRePerm(scope.row.id)" />
              </template>
            </el-table-column>
          </base-table-p>
          <base-dialog v-model="dialogVisibleForMenuRePerm" :title="textMapForMenuRePerm[dialogStatusForMenuRePerm]" width="50%">
            <el-form ref="roleForm" :model="menuRePermForm" label-width="120px">
              <el-form-item label="权限名称：" prop="name">
                <el-input v-model="menuRePermForm.name" placeholder="添加按钮" />
              </el-form-item>
              <el-form-item label="按钮权限标识：" prop="btnPerm">
                <el-input v-model="menuRePermForm.btnPerm" placeholder="sys:user:add" />
              </el-form-item>
              <el-form-item label="URL权限标识：" prop="urlPerm">
                <el-input v-model="menuRePermForm.urlPerm" placeholder="POST:/web/api/user" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="dialogVisibleForMenuRePerm = false">取 消</el-button>
              <el-button type="primary" @click="saveMenuRePermForm">确 定</el-button>
            </template>
          </base-dialog>
        </base-title-card>
      </el-col>
    </el-row>
    <edit-menu ref="edit" @handleSucc="getMenuTree" />
  </base-wraper>
</template>
<script>
import EditMenu from './edit.vue'
export default {
  components: { EditMenu },
  data() {
    return {
      currentClickMenu: null,
      treeData: [],
      permDataList: [],
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      dialogVisibleForMenuRePerm: false,
      dialogStatusForMenuRePerm: '',
      textMapForMenuRePerm: {
        update: '编辑',
        create: '添加',
      },
      menuRePermForm: {
        id: undefined,
        name: '',
        menuId: undefined,
        btnPerm: '',
        urlPerm: '',
      },
    }
  },
  computed: {},
  mounted() {
    this.getMenuTree()
  },
  methods: {
    async getMenuTree() {
      let res = await this.$api.sys_menu.menuTree()
      this.treeData = res.data
      this.currentClickMenu = null
    },
    handleAddMenu() {
      this.$refs.edit.open(1)
    },
    handleNodeClick(data) {
      this.currentClickMenu = data
      this.refreshTableDataRePerm()
    },
    addNextMenu() {
      if (!this.currentClickMenu) {
        this.submitFail('请先选中你需要添加下级菜单的父级')
        return
      }
      this.$refs.edit.open(2, this.currentClickMenu)
    },
    handleEdit() {
      if (!this.currentClickMenu) {
        this.submitFail('请先选中你需要添加下级菜单的父级')
        return
      }
      this.$refs.edit.open(3, this.currentClickMenu)
    },
    async handleDelete() {
      if (!this.currentClickMenu) {
        this.submitFail('请先选中你需要删除的菜单')
        return
      }
      let res = await this.$api.sys_menu.delete(this.currentClickMenu.menuId)
      this.submitOk(res.msg)
      this.getMenuTree()
    },
    async refreshTableDataRePerm() {
      let res = await this.$api.sys_menu.getPermListByMenuId(this.currentClickMenu.menuId)
      this.permDataList = res.data
    },
    async deleteMenuRePerm(id) {
      let res = await this.$api.sys_menu.deleteMenuReBtnPerm(id)
      this.submitOk(res.msg)
      this.refreshTableDataRePerm()
    },
    async saveMenuRePermForm() {
      this.menuRePermForm.menuId = this.currentClickMenu.menuId
      let res = await this.$api.sys_menu[this.menuRePermForm.id ? 'updateMenuReBtnPerm' : 'addMenuReBtnPerm'](this.menuRePermForm)
      this.submitOk(res.msg)
      this.refreshTableDataRePerm()
      this.dialogVisibleForMenuRePerm = false
    },
    updateForMenuRePerm(row) {
      this.menuRePermForm = Object.assign({}, row)
      this.dialogVisibleForMenuRePerm = true
      this.dialogStatusForMenuRePerm = 'update'
    },
    addForMenuRePerm() {
      this.dialogVisibleForMenuRePerm = true
      this.dialogStatusForMenuRePerm = 'create'
      this.menuRePermForm = {}
    },
  },
}
</script>
<style lang="scss" scoped></style>

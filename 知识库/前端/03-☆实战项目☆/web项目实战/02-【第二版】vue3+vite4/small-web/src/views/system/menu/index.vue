<template>
  <base-wrapper class="flex-start-start">
    <base-card title="菜单" class="p-x-10" style="width: 200px">
      <el-button type="warning" @click="handleAddMenu">新增一级菜单</el-button>
      <!--菜单树-->
      <el-tree
        v-if="treeData.length > 0"
        class="m-t-10"
        :data="treeData"
        :props="{
          children: 'children',
          label: 'title',
        }"
        highlight-current
        default-expand-all
        @node-click="handleNodeClick" />
    </base-card>

    <div class="flex-1 h-full">
      <base-no-data v-if="!currentClickMenu">请先选择左侧菜单</base-no-data>

      <div v-else class="flex h-full">
        <base-card title="菜单详情" class="p-x-10" style="width: 400px">
          <div>
            <el-button type="danger" @click="handleDelete">删除</el-button>
            <el-button type="primary" @click="handleEdit">编辑</el-button>
            <el-button type="primary" @click="addNextMenu">添加下级菜单</el-button>
          </div>
          <base-cell label-width="100px">
            <base-cell-item label="菜单ID">{{ currentClickMenu.menuId }}</base-cell-item>
            <base-cell-item v-if="currentClickMenu.parentName" label="上级菜单">{{ currentClickMenu.parentName }}</base-cell-item>
            <base-cell-item label="菜单标题">{{ currentClickMenu.title }}</base-cell-item>
            <base-cell-item label="菜单路径">{{ currentClickMenu.path }}</base-cell-item>
            <base-cell-item label="组件">
              <span class="text-overflow-1">{{ currentClickMenu.component }}</span>
            </base-cell-item>
            <base-cell-item label="菜单图标">
              <el-icon size="20">
                <component :is="currentClickMenu.icon" v-if="currentClickMenu.icon" />
              </el-icon>
            </base-cell-item>
            <base-cell-item label="显示顺序">{{ currentClickMenu.sort }}</base-cell-item>
            <base-cell-item label="重定向路径">{{ currentClickMenu.redirect }}</base-cell-item>
            <base-cell-item label="是否显示">{{ currentClickMenu.isShow ? '是' : '否' }}</base-cell-item>
            <base-cell-item label="是否显示面包屑">{{ currentClickMenu.isShowBreadcrumb ? '显示' : '隐藏' }}</base-cell-item>
          </base-cell>
        </base-card>

        <base-card class="flex-1 p-x-10" title="页面按钮权限">
          <base-header>
            <template #right>
              <el-button type="primary" @click="refreshTableDataRePerm">刷新</el-button>
              <el-button type="primary" @click="addForMenuRePerm">添加</el-button>
            </template>
          </base-header>
          <base-table-p :data="permDataList" :is-page="false">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="name" label="权限名称" width="150" show-overflow-tooltip />
            <el-table-column prop="btnPerm" label="按钮权限标识" show-overflow-tooltip />
            <el-table-column prop="urlPerm" label="URL权限标识" show-overflow-tooltip />
            <el-table-column label="操作" align="center" width="100">
              <template #default="scope">
                <el-button link @click="updateForMenuRePerm(scope.row)">编辑</el-button>
                <base-delete-btn @ok="deleteMenuRePerm(scope.row.id)" />
              </template>
            </el-table-column>
          </base-table-p>
          <base-dialog v-model="dialogVisibleForMenuRePerm" :title="dialogTitleObj[dialogStatusForMenuRePerm]" width="50%">
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
        </base-card>
      </div>
    </div>

    <edit-menu ref="editRef" @handle-succ="getMenuTree" />
  </base-wrapper>
</template>
<script setup>
import EditMenu from './edit.vue';
const { proxy } = getCurrentInstance();

let currentClickMenu = $ref(null);
let treeData = $ref([]);
let permDataList = $ref([]);
let dialogVisibleForMenuRePerm = $ref(false);
let dialogStatusForMenuRePerm = $ref(null);
let menuRePermForm = $ref({});

onMounted(() => {
  getMenuTree();
});

async function getMenuTree() {
  let res = await proxy.$api.sys_menu.menuTree();
  treeData = res.data;
  currentClickMenu = null;
}
function handleAddMenu() {
  proxy.$refs.editRef.open(1);
}
function handleNodeClick(data) {
  currentClickMenu = data;
  refreshTableDataRePerm();
}
function addNextMenu() {
  if (!currentClickMenu) {
    proxy.submitFail('请先选择你需要添加下级菜单的父级');
    return;
  }
  proxy.$refs.editRef.open(2, currentClickMenu);
}
function handleEdit() {
  if (!currentClickMenu) {
    proxy.submitFail('请先选择你需要添加下级菜单的父级');
    return;
  }
  proxy.$refs.editRef.open(3, currentClickMenu);
}
async function handleDelete() {
  if (!currentClickMenu) {
    proxy.submitFail('请先选择你需要删除的菜单');
    return;
  }
  let res = await proxy.$api.sys_menu.delete(currentClickMenu.menuId);
  proxy.submitOk(res.msg);
  getMenuTree();
}
async function refreshTableDataRePerm() {
  let res = await proxy.$api.sys_menu.getPermListByMenuId(currentClickMenu.menuId);
  permDataList = res.data;
}
async function deleteMenuRePerm(id) {
  let res = await proxy.$api.sys_menu.deleteMenuReBtnPerm(id);
  proxy.submitOk(res.msg);
  refreshTableDataRePerm();
}
async function saveMenuRePermForm() {
  menuRePermForm.menuId = currentClickMenu.menuId;
  let res = await proxy.$api.sys_menu[menuRePermForm.id ? 'updateMenuReBtnPerm' : 'addMenuReBtnPerm'](menuRePermForm);
  proxy.submitOk(res.msg);
  refreshTableDataRePerm();
  dialogVisibleForMenuRePerm = false;
}
function updateForMenuRePerm(row) {
  menuRePermForm = Object.assign({}, row);
  dialogVisibleForMenuRePerm = true;
  dialogStatusForMenuRePerm = 'update';
}
function addForMenuRePerm() {
  dialogVisibleForMenuRePerm = true;
  dialogStatusForMenuRePerm = 'add';
  menuRePermForm = {};
}
</script>
<style lang="scss" scoped></style>

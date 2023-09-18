<template>
  <base-wrapper>
    <base-card title="角色信息">
      <base-cell label-width="100px">
        <base-cell-item label="角色名：">{{ roleForm.name }}</base-cell-item>
        <base-cell-item label="角色编码：">{{ roleForm.code }}</base-cell-item>
      </base-cell>
    </base-card>
    <base-card title="权限信息" class="m-t-10">
      <div class="flex-between-center">
        <el-tree
          v-show="menuTree.length > 0"
          ref="menuTreeRef"
          class="overflow-y-auto overflow-x-hidden"
          :data="menuTree"
          :props="{
            children: 'children',
            label: 'title',
          }"
          show-checkbox
          default-expand-all
          check-strictly
          :default-checked-keys="defaultCheckedKeys"
          node-key="menuId"
          highlight-current
          @node-click="menuNodeClick"
          @check-change="changeCheckMenu" />
        <div class="flex-1">
          <base-no-data v-if="!currentSelectedMenu">tips:点击左侧菜单可查看按钮权限</base-no-data>
          <base-no-data v-else-if="currentSelectedMenu.permList.length === 0">该菜单暂未分配按钮权限</base-no-data>
          <el-card v-else>
            <template #header>
              <div class="flex-between-center">
                <h3>编辑页面按钮权限</h3>
                <el-button link @click="savePermIds">保存</el-button>
              </div>
            </template>
            <el-checkbox v-model="isCheckAllPerm" @change="changeCheckBoxPerm">全选</el-checkbox>
            <el-checkbox-group v-model="currentSelectedPermIdList" @change="changeCheckedPerm">
              <el-checkbox v-for="(item, index) in currentSelectedMenu.permList" :key="index" :label="item.id">{{ item.name }} </el-checkbox>
            </el-checkbox-group>
          </el-card>
        </div>
      </div>
    </base-card>

    <div class="m-t-10">
      <router-link to="/system/role">
        <el-button>返回</el-button>
      </router-link>
      <el-button type="primary" class="m-l-20" @click="savePerm">保存</el-button>
    </div>
  </base-wrapper>
</template>
<script setup>
import { onMounted } from 'vue';

const { proxy } = getCurrentInstance();
let roleId = $ref(null);
let roleForm = $ref({}); // 角色基本信息
let menuTree = $ref([]); // 菜单树
let currentSelectedMenu = $ref(null); // 当前选中的菜单
let currentSelectedPermIdList = $ref([]); // 当前选中的按钮/url权限
let isCheckAllPerm = $ref(false); //  是否选中所有权限
let defaultCheckedKeys = $ref([]); //  树菜单默认选中的数据

onMounted(() => {
  roleId = proxy.$route.query.id;
  if (!roleId) {
    proxy.$router.push('/system/role');
    return;
  }
  initData();
});

async function initData() {
  let res = await proxy.$api.sys_role.detail(roleId);
  roleForm = res.data;
  menuTree = res.data.menuTree;
  defaultCheckedKeys = getCheckedKeys([], menuTree);
}

// 拿到选中的菜单ids
function getCheckedKeys(checkedKeys, menuTree) {
  menuTree.forEach((item) => {
    if (item.isHasPerm) {
      checkedKeys.push(item.menuId);
    }
    if (item.children.length > 0) {
      getCheckedKeys(checkedKeys, item.children);
    }
  });
  return checkedKeys;
}
// 点击菜单
function menuNodeClick(data) {
  currentSelectedMenu = data;
  let selectedPerm = currentSelectedMenu.permList.filter((e) => e.isHasPerm);
  isCheckAllPerm = currentSelectedMenu.permList.length === selectedPerm.length;
  currentSelectedPermIdList = selectedPerm.map((item) => item.id);
}
/**
 * 监听菜单选中
 * @param nodeData 节点数据
 * @param isChecked 是否被选中
 */
function changeCheckMenu(nodeData, isChecked) {
  nodeData.isHasPerm = isChecked;
  console.log('111', nodeData, isChecked);
}
// 监听按钮权限 -- 全选
function changeCheckBoxPerm(isAllCheck) {
  currentSelectedPermIdList = isAllCheck ? currentSelectedMenu.permList.map((item) => item.id) : [];
  currentSelectedMenu.permList.forEach((item) => {
    // 按钮权限
    item.isHasPerm = isAllCheck;
  });
}
// 监听按钮权限 -- 改变
function changeCheckedPerm(selectedData) {
  isCheckAllPerm = selectedData.length === currentSelectedMenu.permList.length;
  currentSelectedMenu.permList.forEach((item) => {
    // 按钮权限
    item.isHasPerm = selectedData.includes(item.id);
  });
}
// 保存按钮权限
async function savePermIds() {
  let res = await proxy.$api.sys_perm.saveRoleRePermIds({
    roleId: roleId,
    menuId: currentSelectedMenu.menuId,
    permissionIdList: currentSelectedPermIdList,
  });
  proxy.submitOk(res.msg);
}
// 保存角色关联的所有权限数据
async function savePerm() {
  let res = await proxy.$api.sys_perm.saveRoleRePerm({
    roleId: roleId,
    menuTree: menuTree,
  });
  proxy.submitOk(res.msg);
  // proxy.$router.push('/system/role');
}
</script>
<style lang="scss" scoped></style>

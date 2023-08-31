<template>
  <base-wraper>
    <el-form :model="roleForm" label-width="100px">
      <base-title-card title="角色信息">
        <base-table-cell>
          <el-row :gutter="10">
            <el-col :span="12">
              <base-cell-item label="角色名：">{{ roleForm.name }}</base-cell-item>
            </el-col>
            <el-col :span="12">
              <base-cell-item label="角色编码：">{{ roleForm.code }}</base-cell-item>
            </el-col>
          </el-row>
        </base-table-cell>
      </base-title-card>
      <base-title-card title="权限信息">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-tree
              ref="menuTree"
              :data="menuTree"
              :props="{
                children: 'children',
                label: 'title',
              }"
              show-checkbox
              node-key="menuId"
              @node-click="menuNodeClick"
              @check-change="changeCheckMenu"
            />
          </el-col>
          <el-col :span="12">
            <el-card v-if="currentSelectedMenu && currentSelectedMenu.permList.length > 0 && showPerm">
              <template #header>
                <div>
                  <span>编辑页面按钮权限</span>
                  <el-button style="float: right; padding: 3px 0" link @click="savePermIds">保存</el-button>
                </div>
              </template>
              <el-checkbox v-model="isCheckAllPerm" :indeterminate="isIndeterminate" style="margin-bottom: 10px" @change="changeCheckBoxPerm"
                >全选</el-checkbox
              >
              <el-checkbox-group v-model="currentSelectedPermIdList" @change="changeCheckedPerm">
                <el-checkbox v-for="(item, index) in currentSelectedMenu.permList" :key="index" :label="item.id">{{ item.name }} </el-checkbox>
              </el-checkbox-group>
            </el-card>
            <base-no-data v-else>该菜单暂未分配按钮权限</base-no-data>
          </el-col>
        </el-row>
      </base-title-card>
    </el-form>
    <div>
      <el-button type="primary" @click="savePerm">保存</el-button>
      <router-link to="/system/role">
        <el-button type="warning">返回</el-button>
      </router-link>
    </div>
  </base-wraper>
</template>
<script>
export default {
  data() {
    return {
      roleId: this.$route.query.id,
      roleForm: {}, // 角色基本信息
      menuTree: [], // 菜单树
      currentSelectedMenu: null, // 当前选中的菜单
      showPerm: false, // 是否显示权限
      currentSelectedPermIdList: [], // 当前选中的按钮/url权限
      isCheckAllPerm: false, //  是否选中所有权限
      isIndeterminate: true, // 是否全选的勾勾
    }
  },
  computed: {
    // 是否有编辑按钮的权限
    isHasEditPerm() {
      const hasChildren = this.currentSelectedMenu && this.currentSelectedMenu.children.length === 0
      return hasChildren
    },
  },
  mounted() {
    if (!this.roleId) {
      this.$router.push('/system/role')
      return
    }
    this.initData()
  },
  methods: {
    async initData() {
      let res = await this.$api.sys_role.detail(this.roleId)
      this.roleForm = res.data
      this.menuTree = res.data.menuTree
      this.$refs.menuTree.setCheckedKeys(this.getCheckedKeys([], this.menuTree))
    },
    // 拿到选中的菜单ids
    getCheckedKeys(checkedKeys, menuTree) {
      menuTree.forEach((item) => {
        if (item.isHasPerm) {
          checkedKeys.push(item.menuId)
        }
        if (item.children != null) {
          this.getCheckedKeys(checkedKeys, item.children)
        }
      })
      return checkedKeys
    },
    // 点击菜单
    menuNodeClick(data) {
      this.currentSelectedMenu = data
      if (this.isHasEditPerm) {
        this.showPerm = true
        this.currentSelectedMenu.permList.forEach((item) => {
          if (item.isHasPerm) {
            this.currentSelectedPermIdList.push(item.id)
          }
        })
        this.isCheckAllPerm = this.currentSelectedPermIdList.length === this.currentSelectedMenu.permList.length
        this.isIndeterminate = !this.isCheckAllPerm
      } else {
        this.showPerm = false
      }
    },
    /**
     * 监听菜单选中
     * @param nodeData 节点数据
     * @param isChecked 是否被选中
     */
    changeCheckMenu(nodeData, isChecked) {
      // console.log(nodeData.title, isChecked)
      nodeData.isHasPerm = isChecked
    },
    // 监听全选
    changeCheckBoxPerm(isAllCheck) {
      this.currentSelectedPermIdList = isAllCheck ? this.currentSelectedMenu.permList.map((item) => item.id) : []
      this.isIndeterminate = false

      // 按钮权限
      this.currentSelectedMenu.permList.forEach((item) => {
        item.isHasPerm = isAllCheck
      })
    },
    // 监听按钮权限改变
    changeCheckedPerm(selectedData) {
      console.log(selectedData)
      const selectedCount = selectedData.length
      this.isCheckAllPerm = selectedCount === this.currentSelectedMenu.permList.length
      this.isIndeterminate = selectedCount > 0 && selectedCount < this.currentSelectedMenu.permList.length
      // this.isIndeterminate = false

      // 按钮权限
      this.currentSelectedMenu.permList.forEach((item) => {
        item.isHasPerm = selectedData.includes(item.id)
      })
    },
    // 保存按钮权限
    async savePermIds() {
      let res = await this.$api.sys_perm.saveRoleRePermIds({
        roleId: this.roleId,
        menuId: this.currentSelectedMenu.menuId,
        permissionIdList: this.currentSelectedPermIdList,
      })
      this.submitOk(res.msg)
    },
    // 保存角色关联的所有权限数据
    async savePerm() {
      // 获取选中的菜单
      // let selectedMenuIdList = this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())
      // this.roleForm.menuTree = this.$refs.menuTree.getCheckedNodes(false, true)

      let res = await this.$api.sys_perm.saveRoleRePerm({
        roleId: this.roleId,
        menuTree: this.menuTree,
      })
      this.submitOk(res.msg)
      this.$router.push('/system/role')
    },
  },
}
</script>
<style lang="scss" scoped></style>

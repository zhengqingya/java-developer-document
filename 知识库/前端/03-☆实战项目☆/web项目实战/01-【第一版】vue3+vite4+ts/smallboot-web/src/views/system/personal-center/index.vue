<template>
  <base-wraper>
    <el-row :gutter="1">
      <el-col :span="11">
        <base-title-card title="个人信息">
          <template #append>
            <el-button type="warning" @click="dialogVisible = true">修改</el-button>
          </template>
          <base-table-cell label-width="100px">
            <base-cell-item label="头像">
              <el-image :src="avatarUrl" style="width: 100px; height: 100px" />
            </base-cell-item>
            <base-cell-item label="账号">{{ form.username }}</base-cell-item>
            <base-cell-item label="名称">{{ form.nickname }}</base-cell-item>
            <base-cell-item label="性别">{{ form.sexName || '未知' }}</base-cell-item>
            <base-cell-item label="手机号码">{{ form.phone }}</base-cell-item>
            <base-cell-item label="邮箱">{{ form.email }}</base-cell-item>
            <base-cell-item label="创建时间">{{ form.createTime }}</base-cell-item>
          </base-table-cell>
        </base-title-card>
      </el-col>
      <el-col :span="11">
        <base-title-card title="第三方帐号绑定">
          <base-table-p ref="baseTable" api="sys_oauth.getOauthDataList" :params="tableOauthDataListQuery" :index-code="true" :is-page="false">
            <el-table-column label="绑定帐号信息" align="center">
              <template v-slot="scope">
                <span>{{ scope.row.oauthTypeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="是否绑定" align="center">
              <template v-slot="scope">
                <span v-if="scope.row.ifBind" style="font-weight: bold; background-color: #00ffff">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template v-slot="scope">
                <el-button v-if="scope.row.ifBind" type="danger" @click="handleOauthBind(scope.row)">解绑</el-button>
                <el-button v-else type="primary" @click="handleOauthBind(scope.row)"
                  ><a :href="oauthUrl + scope.row.oauthTypeBindName"> 绑定 </a></el-button
                >
              </template>
            </el-table-column>
          </base-table-p>
        </base-title-card>
      </el-col>
    </el-row>

    <base-dialog v-model="dialogVisible" title="修改个人信息" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="头像:" prop="avatar">
          <base-upload :url="avatarUrl" @saveSucc="handleAvatar" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </base-dialog>
  </base-wraper>
</template>

<script>
import useStore from '@/store'

export default {
  name: 'UserInfo',
  data() {
    return {
      dialogVisible: false,
      avatarUrl: useStore().user.avatarUrl,
      userId: useStore().user.userId,
      form: {},
      sexList: [
        { key: 0, display_name: '未知' },
        { key: 1, display_name: '男' },
        { key: 2, display_name: '女' },
      ],
      tableOauthDataListQuery: { userId: useStore().user.userId },
      oauthUrl: import.meta.env.VITE_APP_SERVICE_API + '/system/web/api/oauth/',
      // oauthType: this.$route.query.oauthType,
      // openId: this.$route.query.openId,
    }
  },
  created() {
    this.getUserInfoById()
    // if (this.oauthType && this.openId) {
    //   this.submitOauthInfo();
    // }
  },
  methods: {
    async getUserInfoById() {
      let res = await this.$api.sys_user.getUserInfoById(this.userId)
      this.form = res.data
    },
    handleAvatar(avatarUrl) {
      this.form.avatarUrl = avatarUrl
      this.avatarUrl = avatarUrl
    },
    async refreshTableData() {
      this.$refs.baseTable.refresh()
    },
    async handleOauthBind(row) {
      let ifBind = row.ifBind
      if (ifBind === 1) {
        // 如果为绑定则解除绑定
        let res = await this.$api.sys_oauth.removeBind({
          userReOauthId: row.userReOauthId,
        })
        this.submitOk(res.msg)
        this.refreshTableData()
      } else {
        await this.$api.sys_oauth.thirdpartOauth(row.oauthTypeName)
      }
    },
    async submitOauthInfo() {
      let oauthForm = {
        userId: this.userId,
        oauthType: this.oauthType,
        openId: this.openId,
      }
      let res = await this.$api.sys_oauth.bindThirdPart(oauthForm)
      this.submitOk(res.msg)
      this.refreshTableData()
      this.$router.replace('/system/personal-center')
    },
    async submitForm() {
      await this.$api.sys_user.update(this.form)
      this.submitOk('保存成功')
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="scss" scoped></style>

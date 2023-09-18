<template>
  <base-wrapper>
    <base-card title="个人信息" style="width: 400px">
      <template #append>
        <el-button type="warning" @click="updateUser">修改</el-button>
      </template>
      <base-cell label-width="80px">
        <base-cell-item label="头像">
          <el-image :src="userObj.avatarUrl" style="width: 100px; height: 100px" />
        </base-cell-item>
        <base-cell-item label="账号">{{ userObj.username }}</base-cell-item>
        <base-cell-item label="名称">{{ userObj.nickname }}</base-cell-item>
        <base-cell-item label="性别">{{ $filters.sexName(userObj.sex) }}</base-cell-item>
        <base-cell-item label="手机号码">{{ userObj.phone }}</base-cell-item>
        <base-cell-item label="邮箱">{{ userObj.email }}</base-cell-item>
        <base-cell-item label="创建时间">{{ userObj.createTime }}</base-cell-item>
      </base-cell>
    </base-card>

    <!-- <el-col :span="11">
        <base-card title="第三方帐号绑定">
          <base-table-p ref="baseTableRef" api="sys_oauth.getOauthDataList" :params="tableOauthDataListQuery" :index-code="true" :is-page="false">
            <el-table-column label="绑定帐号信息" align="center">
              <template #default="scope">
                <span>{{ scope.row.oauthTypeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="是否绑定" align="center">
              <template #default="scope">
                <span v-if="scope.row.ifBind" style="font-weight: bold; background-color: #00ffff">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button v-if="scope.row.ifBind" type="danger" @click="handleOauthBind(scope.row)">解绑</el-button>
                <el-button v-else type="primary" @click="handleOauthBind(scope.row)"><a :href="import.meta.env.VITE_APP_SERVICE_API + '/system/web/api/oauth/' + scope.row.oauthTypeBindName"> 绑定 </a></el-button>
              </template>
            </el-table-column>
          </base-table-p>
        </base-card>
      </el-col> -->

    <base-dialog v-model="dialogVisible" title="修改个人信息" width="50%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="头像:" prop="avatar">
          <base-upload-single v-model="userObj.avatarUrl" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </base-dialog>
  </base-wrapper>
</template>

<script setup>
const { proxy } = getCurrentInstance();
let useUserStore = proxy.$store.user.useUserStore();
let { userObj } = toRefs(useUserStore);

let dialogVisible = $ref(false);
let form = $ref({});

function updateUser() {
  dialogVisible = true;
  form = userObj.value;
}

async function submitForm() {
  await proxy.$api.sys_user.update(form);
  proxy.submitOk('保存成功');
  dialogVisible = false;
}

// async function refreshTableData() {
//   proxy.$refs.baseTableRef.refresh();
// }

// async function handleOauthBind(row) {
//   let ifBind = row.ifBind;
//   if (ifBind === 1) {
//     // 如果为绑定则解除绑定
//     let res = await proxy.$api.sys_oauth.removeBind({
//       userReOauthId: row.userReOauthId,
//     });
//     proxy.submitOk(res.msg);
//     refreshTableData();
//   } else {
//     await proxy.$api.sys_oauth.thirdpartOauth(row.oauthTypeName);
//   }
// }
</script>

<style lang="scss" scoped></style>

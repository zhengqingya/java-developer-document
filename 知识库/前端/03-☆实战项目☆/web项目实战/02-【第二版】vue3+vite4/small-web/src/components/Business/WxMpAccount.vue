<template>
  <div v-if="isShow" class="">
    <div class="box b-rd-4">
      <!-- <p>{{ $route.path }}</p> -->
      <span class="m-l-10">请选择公众号：</span>
      <el-select v-model="appId" placeholder="请选择账号" @change="changeData">
        <el-option v-for="item in list" :key="item.appId" :label="item.name" :value="item.appId" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { localStorage } from '@/utils/storage';
const { proxy } = getCurrentInstance();
let { isLogin } = toRefs(proxy.$store.user.useUserStore());
let appId = $ref(localStorage.get('appId'));
let list = $ref([]);

// 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。
onUpdated(() => {
  init();
});

const isShow = computed(() => {
  return proxy.$route.path.indexOf('/wx/mp') === 0 && !proxy.$route.path.includes('/wx/mp/account');
});

async function init() {
  if (!isLogin.value) {
    return;
  }
  let res = await proxy.$api.wx_mp_account.list();
  list = res.data;
  if (list.length == 0) {
    alert('请先去添加账号！');
    proxy.$router.push('/wx/mp/account');
    return;
  }
  if (appId == null) {
    appId = list[0].appId;
  }
  changeData();
}

function changeData() {
  localStorage.set('appId', appId);
}
</script>
<style lang="scss" scoped>
.box {
  background: #08c0ee8c;

  ::v-deep(.el-input__inner) {
    width: 150px;
    color: red;
    font-size: 20px;
  }
  ::v-deep(.el-input__wrapper) {
    background-color: #08c0ee8c;
  }
}
</style>

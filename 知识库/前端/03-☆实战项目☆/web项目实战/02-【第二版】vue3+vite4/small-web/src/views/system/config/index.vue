<template>
  <base-wrapper class="flex-center-center">
    <div v-if="list" class="flex-c-center-center">
      <!-- {{ list }} -->

      <div v-for="item in list" :key="item.key">
        <div class="flex">
          <h3 class="flex-center-center" style="width: 200px">{{ item.remark }}：</h3>
          <el-input v-model="item.value" />
        </div>
      </div>

      <div class="m-t-20">
        <el-button type="primary" @click="saveBatch">确 定</el-button>
      </div>
    </div>
  </base-wrapper>
</template>
<script setup>
const { proxy } = getCurrentInstance();
let list = $ref();
onMounted(() => {
  init();
});

async function init() {
  let res = await proxy.$api.sys_config.list({ keyList: 'lbs_qq_key,lbs_qq_key2' });
  list = res.data;
}

async function saveBatch() {
  let res = await proxy.$api.sys_config.saveBatch(list);
  proxy.submitOk(res.msg);
  init();
}
</script>
<style lang="scss" scoped></style>

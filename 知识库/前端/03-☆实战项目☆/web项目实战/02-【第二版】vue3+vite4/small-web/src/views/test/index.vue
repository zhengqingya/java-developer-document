<template>
  <div class="bg-color-primary h100">
    <h1>{{ sexList }}</h1>
    <button @click="handleClick">click</button>

    <h1>{{ $filters.sexName(1) }}</h1>

    <el-button v-has-perm="'sys:user:add'" type="primary">添加</el-button>
    <el-button v-has-perm="['sys:user:add', 'sys:user:edit']" type="primary">编辑</el-button>

    <el-button v-has-role="'super_admin'" type="primary">添加</el-button>
    <el-button v-has-role="['super_admin', 'test']" type="primary">编辑</el-button>

    <p class="font-size-100 p-10 m-10">123456789123456789123456789</p>
    <p v-for="index in 10" :key="index">{{ index }}</p>
    <!-- <p v-for="index in 10" :key="index">{{ index }}</p> -->
  </div>
</template>

<script setup>
import { getCurrentInstance, toRefs } from 'vue';
const { proxy } = getCurrentInstance();

let useUserStore = proxy.$store.user.useUserStore();
let { login } = useUserStore;
let { userObj } = toRefs(useUserStore);

async function handleClick() {
  proxy.submitOk('保存成功');
  proxy.submitFail('操作失败');
}
</script>

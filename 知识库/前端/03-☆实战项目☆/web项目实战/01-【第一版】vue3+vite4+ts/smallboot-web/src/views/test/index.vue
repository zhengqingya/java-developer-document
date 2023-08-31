<template>
  <el-button link>按钮</el-button>
  <el-icon class="is-loading">
    <Loading />
  </el-icon>
  <div>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </div>
  <p>store: {{ name }}</p>
  <p>store: {{ app.name }}</p>
  <p>store: {{ $store.app.name }}</p>
  <el-button @click="changeStore('666')">change store</el-button>

  <hr />

  <base-wraper :fullHeight="true">Hello</base-wraper>
</template>

<script lang="ts" setup>
import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'

import { getCurrentInstance } from 'vue'

import { storeToRefs } from 'pinia'
import useStore from '@/store'

const { app } = useStore()
// const name = ref(app.name)
// 响应式
const { name: name } = storeToRefs(app)

function changeStore(value: string) {
  app.setName(value)
}

// 组件实例
const { proxy }: any = getCurrentInstance()
// 获取验证码
async function handleCaptcha() {
  const res = await proxy.$api.sys_login.getCaptcha()
  console.log('res:', res)
}

handleCaptcha()
</script>

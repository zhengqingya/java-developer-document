<script setup lang="ts">
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div style="height: 100vh; width: 100vh; background-color: aqua">
    <el-avatar :size="300" :src="circleUrl" />
  </div>
</template>

<template>
  <div
    class="flex-c-start-center"
    style="
      width: 100%;
      height: 120px;
      padding: 20px 20px;
      background-color: rebeccapurple;
      border-radius: 10px;
    "
  >
    <h1 style="color: #87ceeb">程序员郑清</h1>
    <el-form
      style="margin-top: 10px; width: 100%; height: 100vh"
      label-position="left"
      :model="config"
      label-width="40px"
    >
      <el-form-item label="设备">
        <el-select v-model="config.deviceId" placeholder="请选择摄像头">
          <el-option
            v-for="item in config.cameraList"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let { config } = toRefs(proxy.$store.settings.useSettingsStore())

onMounted(() => {
  getCameraList()
})

// 获取摄像头列表
async function getCameraList() {
  // 1.获取系统的所有音频设备
  const deviceList = await navigator.mediaDevices.enumerateDevices()
  // console.log('deviceList:', deviceList)

  // 2.从音频设备中过滤出摄像头
  config.value.cameraList = deviceList.filter((d) => d.kind.includes('video'))
  // console.log('cameraList:', config.value.cameraList)
}
</script>

<style lang="scss" scoped></style>

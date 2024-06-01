<template>
  <div style="background-color: rgba(0, 0, 0, 0)" @contextmenu="quit">
    <base-camera v-if="$store.settings.useSettingsStore().config.isCamera" />
    <base-set v-else />

    <div class="close-btn no-drag flex-center-center">
      <el-icon :size="28" color="white" @click="exit"><Close /></el-icon>
    </div>

    <div class="set-btn no-drag flex-center-center">
      <el-icon :size="28" color="white" @click="changeConfig"><Setting /></el-icon>
      <span style="width: 10px"></span>
      <el-icon
        v-if="$store.settings.useSettingsStore().config.isCamera"
        :size="28"
        color="white"
        @click="changeRound"
        ><View
      /></el-icon>
    </div>
  </div>
</template>

<script setup>
import BaseCamera from './components/base-camera.vue'
import BaseSet from './components/base-set.vue'
import { toRefs, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let { changeRound, changeConfig } = proxy.$store.settings.useSettingsStore()
let { config } = toRefs(proxy.$store.settings.useSettingsStore())

// 右键退出
const quit = () => {
  window.api.quit()
}

// 点击退出icon
function exit() {
  window.api.exit()
}
</script>

<style lang="scss" scoped>
.close-btn {
  width: 100%;
  position: absolute;
  top: 10px;
  z-index: 1000;
  opacity: 0.8;
}

.set-btn {
  width: 100%;
  position: absolute;
  bottom: 10px;
  z-index: 1000;
  opacity: 0.8;
}
</style>

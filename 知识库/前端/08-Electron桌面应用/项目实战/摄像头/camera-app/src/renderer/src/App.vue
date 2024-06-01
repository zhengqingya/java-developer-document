<template>
  <div @contextmenu="quit">
    <base-camera v-if="$store.settings.useSettingsStore().config.isCamera" />
    <base-set v-else />

    <div class="close-btn flex-center-center">
      <el-icon :size="28" color="white" @click="exit"><Close /></el-icon>
    </div>

    <div class="set-btn flex-center-center">
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
import { ref, toRefs, getCurrentInstance, onMounted } from 'vue'
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

// 拖拽
handleMousedown()
let isDown = ref(true)
function handleMousedown() {
  document.querySelector('body').addEventListener('mousedown', (e) => {
    isDown.value = true
    let baseX = e.x
    let baseY = e.y
    let width = parseInt(window.outerWidth)
    let height = parseInt(window.outerHeight)
    document.onmousemove = (ev) => {
      if (isDown.value) {
        const x = parseInt(ev.screenX - baseX)
        const y = parseInt(ev.screenY - baseY)
        // 给主进程传入坐标
        let position = {
          posX: x,
          posY: y,
          width,
          height
        }
        window.api.drag(position)
      }
    }
    document.onmouseup = (ev) => {
      isDown.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.close-btn {
  width: 100%;
  position: absolute;
  top: 10px;
  z-index: 1000;
  opacity: 0.8;
  cursor: pointer;
}

.set-btn {
  width: 100%;
  position: absolute;
  bottom: 10px;
  z-index: 1000;
  opacity: 0.8;
  cursor: pointer;
}
</style>

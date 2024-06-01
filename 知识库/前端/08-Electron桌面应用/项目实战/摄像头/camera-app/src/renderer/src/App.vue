<template>
  <div style="width: 100%; height: 100%" @contextmenu="quit">
    <base-camera v-if="$store.settings.useSettingsStore().config.isCamera" />
    <base-set v-else />

    <div class="opt-btn close-btn" style="top: 10px">
      <el-icon :size="28" color="white" @click="exit"><Close /></el-icon>
    </div>

    <div class="opt-btn set-btn" style="bottom: 10px">
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
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
let { changeRound, changeConfig } = proxy.$store.settings.useSettingsStore()
// 右键退出
const quit = () => {
  window.api.quit()
}

// 点击退出icon
function exit() {
  window.api.exit()
}

onMounted(() => {
  // 拖拽
  handleMousedown()

  // 显示隐藏操作按钮
  handleShowOpt()
})

let isDown = ref(true)
function handleMousedown() {
  // 鼠标按下
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
    // 鼠标弹起
    document.onmouseup = (ev) => {
      isDown.value = false
    }
  })
}

function handleShowOpt() {
  // 鼠标移入
  document.querySelector('body').addEventListener('mouseenter', () => {
    document.querySelector('.close-btn').style.display = 'flex'
    document.querySelector('.set-btn').style.display = 'flex'
  })

  // 鼠标移出
  document.querySelector('body').addEventListener('mouseleave', () => {
    document.querySelector('.close-btn').style.display = 'none'
    document.querySelector('.set-btn').style.display = 'none'
  })
}
</script>

<style lang="scss" scoped>
.opt-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  position: absolute;
  z-index: 1000;
  opacity: 0.8;
  cursor: pointer;
  display: none;
}
</style>

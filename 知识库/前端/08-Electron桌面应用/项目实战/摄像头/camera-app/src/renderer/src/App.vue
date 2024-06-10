<template>
  <div class="flex-column" style="width: 100%; height: 100vh" @contextmenu="quit">
    <!-- 设置 -->
    <div
      v-if="config.isOpenSetting"
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
          <el-select v-model="config.deviceId" placeholder="请选择摄像头" @change="changeDevice">
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

    <!-- 摄像头 -->
    <div :style="{ 'border-radius': config.isRound ? '50%' : '10px' }" class="camera-box">
      <video style="width: 100%; height: 100%; border-radius: 10px; object-fit: cover" />

      <div class="opt-btn set-btn">
        <el-icon :size="28" color="white" style="margin-right: 10px" @click="changeConfig"
          ><Setting
        /></el-icon>
        <el-icon :size="28" color="white" @click="exit"><Close /></el-icon>
      </div>

      <div class="opt-btn view-btn">
        <el-icon :size="28" color="white" @click="handleChangeRound"><View /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
// import BaseCamera from './components/base-camera.vue'
// import BaseSet from './components/base-set.vue'
import { ref, getCurrentInstance, onMounted, toRefs } from 'vue'
const { proxy } = getCurrentInstance()

let { changeConfig, setWinSize } = proxy.$store.settings.useSettingsStore()
let { config } = toRefs(proxy.$store.settings.useSettingsStore())

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

  show()

  getCameraList()
})

// 改变圆角
function handleChangeRound() {
  config.value.isRound = !config.value.isRound
  setWinSize()
}

// 切换设备
function changeDevice(deviceId) {
  console.log('切换设备:', deviceId)
  show()
}

// 获取摄像头列表
async function getCameraList() {
  // 1.获取系统的所有音频设备
  const deviceList = await navigator.mediaDevices.enumerateDevices()
  // console.log('deviceList:', deviceList)

  // 2.从音频设备中过滤出摄像头
  config.value.cameraList = deviceList.filter((d) => d.kind.includes('video'))
  // console.log('cameraList:', config.value.cameraList)
}

// 打开摄像头
function show() {
  setWinSize()
  let video = document.querySelector('video')
  // 拿到指定媒体设备 https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
  navigator.mediaDevices
    .getUserMedia({
      audio: false, // 设置这个摄像头不捕获声音
      video: {
        deviceId: config.value.deviceId, // 设置摄像头设备ID
        width: 1920,
        height: 1080 // config.value.isRound ? 1920 : 1080
      }
    })
    .then(function (stream) {
      video.srcObject = stream
      // video.play() // 播放
      // video.pause() // 暂停
      video.onloadedmetadata = function (e) {
        video.play()
      }
    })
    .catch(function (err) {
      console.log('调用摄像头失败:' + err.name + ': ' + err.message)
    })
}

// 控制鼠标移入时的操作按钮显示、隐藏
let isDown = ref(true)
function handleMousedown() {
  // 双击事件监听器
  document.querySelector('body').addEventListener('dblclick', function () {
    window.api.fullScreen()
  })

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
    document.querySelector('.set-btn').style.display = 'flex'
    document.querySelector('.view-btn').style.display = 'flex'
  })

  // 鼠标移出
  document.querySelector('body').addEventListener('mouseleave', () => {
    document.querySelector('.set-btn').style.display = 'none'
    document.querySelector('.view-btn').style.display = 'none'
  })
}
</script>

<style lang="scss" scoped>
.camera-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

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

.set-btn {
  top: 10px;
}

.view-btn {
  bottom: 10px;
}
</style>

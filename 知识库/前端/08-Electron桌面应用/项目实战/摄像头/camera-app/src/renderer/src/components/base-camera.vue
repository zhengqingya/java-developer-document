<template>
  <div
    :style="{ 'border-radius': config.isRound ? '50%' : '10px' }"
    style="width: 100%; height: 100%; overflow: hidden"
  >
    <video style="width: 100%; height: 100%; border-radius: 10px" />
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
let { setWinSize } = proxy.$store.settings.useSettingsStore()
let { config } = toRefs(proxy.$store.settings.useSettingsStore())

onMounted(() => {
  show()
})

watch(
  () => config.value.isRound,
  (newValue, oldValue) => {
    // console.log('监听器执行了... ', newValue, oldValue)
    // show()
  }
)

// 打开摄像头

function show() {
  let video = document.querySelector('video')
  // 拿到指定媒体设备 https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
  navigator.mediaDevices
    .getUserMedia({
      audio: false, // 设置这个摄像头不捕获声音
      video: {
        deviceId: config.value.deviceId, // 设置摄像头设备ID
        width: 1920,
        height: config.value.isRound ? 1920 : 1080
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

  setWinSize()
}
</script>

<style lang="scss" scoped></style>

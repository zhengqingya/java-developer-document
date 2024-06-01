import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useSettingsStore = defineStore('settings', () => {
  let config = ref({ cameraList: [], isRound: true, isCamera: true })

  function changeRound() {
    config.value.isRound = !config.value.isRound
    setWinSize()
    // ElMessage({ message: '切换：' + config.value.isRound, type: 'success', duration: 500 })
  }

  function changeConfig() {
    config.value.isCamera = !config.value.isCamera
    // ElMessage({ message: '显示：' + config.value.isCamera, type: 'success', duration: 500 })
  }

  function setWinSize() {
    if (config.value.isRound) {
      // 如果是圆角 设置窗口为1/1缩放
      window.api.setWindowSize({ AspectRatio: 1, width: 500, height: 500 })
    } else {
      // 如果不是圆角 设置窗口为16/9缩放
      window.api.setWindowSize({ AspectRatio: 16 / 9, width: 500, height: 330 })
    }
  }

  return { config, changeRound, changeConfig, setWinSize }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useSettingsStore = defineStore('settings', () => {
  let config = ref({ cameraList: [], isRound: true, isOpenSetting: false })

  function changeRound() {
    config.value.isRound = !config.value.isRound
    setWinSize()
    // ElMessage({ message: '切换：' + config.value.isRound, type: 'success', duration: 500 })
  }

  function changeConfig() {
    config.value.isOpenSetting = !config.value.isOpenSetting
    // ElMessage({ message: '显示：' + config.value.isOpenSetting, type: 'success', duration: 500 })
  }

  function setWinSize() {
    if (config.value.isRound) {
      // 如果是圆角 设置窗口为1/1缩放
      window.api.setWindowSize({ AspectRatio: 1, width: 400, height: 400 })
      // ElMessage({ message: '圆角显示', type: 'success', duration: 500 })
    } else {
      // 如果不是圆角 设置窗口为16/9缩放
      window.api.setWindowSize({ AspectRatio: 16 / 9, width: 500, height: 300 })
      // ElMessage({ message: '方框显示', type: 'success', duration: 500 })
    }
  }

  return { config, changeRound, changeConfig, setWinSize }
})

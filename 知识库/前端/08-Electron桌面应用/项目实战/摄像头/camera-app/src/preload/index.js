import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // 点击exit退出
  exit: () => {
    // 向主进程发送退出事件
    ipcRenderer.send('exit')
  },
  // 右键退出
  quit: () => {
    // 向主进程发送退出事件
    ipcRenderer.send('quit')
  },
  // 设置窗口尺寸事件
  setWindowSize: (opt) => {
    ipcRenderer.send('setWindowSize', opt)
  },

  // 拖拽
  drag: (opt) => {
    ipcRenderer.invoke('drag', opt)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

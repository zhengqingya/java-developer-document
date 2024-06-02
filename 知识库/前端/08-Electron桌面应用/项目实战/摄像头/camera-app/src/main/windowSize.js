import { BrowserWindow, ipcMain } from 'electron'

// 定义获取win对象的方法
const getWin = (event) => {
  return BrowserWindow.fromWebContents(event.sender)
}

// 主进程监听设置窗口尺寸事件
ipcMain.on('setWindowSize', (event, opt) => {
  //  1.获取win对象
  const win = getWin(event)

  // 2.改变win缩放比例 https://www.electronjs.org/zh/docs/latest/api/browser-window
  win.setAspectRatio(opt.AspectRatio)

  // 3.设置win宽高
  win.setBounds({ width: opt.width, height: opt.height })

  // console.log(opt, 'opt')
})

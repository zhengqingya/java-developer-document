import { ipcMain } from 'electron'

export default (win) => {
  // 主进程main.js接受渲染进程的事件，设置窗口的坐标和大小，win是定义好的窗口
  ipcMain.handle('drag', (_event, pos) => {
    // tips：主进程设置窗口的坐标时，一定不能使用setPosition()，只设置窗口坐标，不设置大小会出现问题，当系统屏幕缩放在175%或者150%时，拖拽窗口，窗口就会无限的放大
    // 可以使用setbounds限制大小解决
    // win.setPosition()
    win && win.setBounds({ x: pos.posX, y: pos.posY, width: pos.width, height: pos.height })
  })
}

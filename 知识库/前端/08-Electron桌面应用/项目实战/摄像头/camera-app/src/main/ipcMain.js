import { app, ipcMain, Menu } from 'electron'

// 主进程监听渲染进程发送的quit事件
ipcMain.on('quit', () => {
  // 1.设置菜单模板
  const template = [
    {
      label: '退出',
      click: () => {
        // 4.调用app的quit事件
        app.quit()
      }
    }
  ]

  // 2.通过模板创建菜单
  const menu = Menu.buildFromTemplate(template)

  // 3.弹出菜单
  menu.popup()
})

// 监听exit 点击icon退出
ipcMain.on('exit', () => {
  app.quit()
})

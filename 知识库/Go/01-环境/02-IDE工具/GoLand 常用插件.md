# Go学习笔记

## GoLand插件

File -> Settings... -> Plugins

| 插件名称                       | 插件介绍                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| File Watchers             | 格式化代码               |
| Save Actions             | 自动删除一些不用的导入               |
| Vue.js             | vue文件样式               |

---

### 自动格式化代码配置 - File Watchers

File -> Settings... -> Tools -> File Watchers -> 右边加号 -> 选择`go fmt` -> 默认内容即可，OK保存

![File Watchers.png](images/File%20Watchers.png)

之后`Ctrl+S`就会自动格式化代码了...

### Other

快捷键：
forr + tab :实现For循环
err + tab :实现自动加载err判断代码
alt + enter :当选导入的包名时会自动同步更新包下来，当选择的是一个结构体实例化时会自动加入结构格式。

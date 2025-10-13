### windows 卸载 idea

#### 1、bin 目录下直接卸载

`Uninstall.exe`

#### 2、手动删除残留文件

> tips: 如果有其它 IDE，进入JetBrains目录，指定 ide 目录删除。

```shell
# 存储本地缓存和日志文件
rd /s /q "C:\Users\zhengqingya\AppData\Local\JetBrains\IntelliJIdea2025.2"
# 存储全局配置和插件
rd /s /q "C:\Users\zhengqingya\AppData\Roaming\JetBrains\IntelliJIdea2025.2"
```

#### 3、删除注册表

1. win+r 输入 `regedit` 打开注册表
2. 删除注册表项：

- 计算机\HKEY_CURRENT_USER\SOFTWARE\JavaSoft\Prefs\jetbrains -> 删除整个
- 计算机\HKEY_CURRENT_USER\Environment -> 删除`IntelliJ IDEA`

> tips: 可以使用编辑器的查找功能（Ctrl + F），搜索“IntelliJ”或“JetBrains”，清理其他可能残留的键值。

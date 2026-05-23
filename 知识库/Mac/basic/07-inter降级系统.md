# mac inter版本 降级系统

1. 关机
2. 开机 -> 按住 shift+option+command+r -> 连接wifi等待一会儿 -> 进入macOS实用工具

进恢复模式后菜单栏打开 实用工具 → 终端：

```shell
diskutil list
```

找到内置磁盘，一般是 disk0，然后谨慎执行：

```shell
diskutil eraseDisk APFS "Macintosh HD" GPT /dev/disk0

# 提示：Finished erase on disk0
# 说明抹掉已经成功完成了。现在内置磁盘 disk0 应该已经被重新格式化了。
```

接下来这样做：

1. 关闭“终端”
2. 回到 macOS 恢复界面
3. 选择 重新安装 macOS
4. 安装目标选择刚刚创建的 Macintosh HD


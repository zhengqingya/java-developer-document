# journalctl

journalctl：管理系统的事件日志记录，可以查看所有的系统日志文件。

```shell
# 查看日志占用的磁盘空间
journalctl --disk-usage
# Archived and active journals take up 4.0G on disk.

# 查看指定时间之后的日志
journalctl --since="2023-02-15 09:00:00"

# 查看指定时间段的日志
journalctl --since="2023-02-15 09:00:00" --until="2023-02-15 20:00:00"
```

### 清理日志数据

```shell
# 如果直接删除文件，可能造成相关服务崩溃...
# 所以可以按 日期、允许保留的容量 进行删除
journalctl --vacuum-time=2d # 只保留近2天的日志
# Vacuuming done, freed 3.9G of archived journals on disk.
journalctl --vacuum-size=500M # 指定日志的总体体积最大500M
```
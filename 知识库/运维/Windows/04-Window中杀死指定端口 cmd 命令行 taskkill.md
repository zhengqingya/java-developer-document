# Window 中杀死指定端口 cmd 命令行 taskkill

```shell
# 查询端口占用
netstat -aon|findstr "2375"
# 强行杀死进程
taskkill -pid 4724 -t -f

# 查看是被哪个程序占用了 这里ex:`svchost.exe`
tasklist|findstr "pid"

# 结束该进程
taskkill /f /t /im svchost.exe
```

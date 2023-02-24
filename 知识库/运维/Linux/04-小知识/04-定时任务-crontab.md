# 定时任务 `cron` / `crontab`

```shell
# 查看crontab服务状态
service crond status
# 启动服务
service crond start
# 关闭服务 
service crond stop
# 重启服务
service crond restart
# 重新载入配置
service crond reload
```

```shell
# list列出指定用户的计划任务列表
crontab -l
# edit编辑指定用户的计划任务列表
crontab -e
# user指定用户名，如果不指定，默认当前用户   
crontab -u
# remove 删除指定用户的计划任务列表 
crontab -r
```


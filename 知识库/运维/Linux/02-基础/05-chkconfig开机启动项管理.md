# chkconfig开机启动项管理

```shell
# 列出开机启动列表  0-6：表示启动模式
chkconfig --list  
# 删除开机启动启动管理服务
chkconfig --del 服务名
# 添加开启启动管理服务
chkconfig --add 服务名
# 设置服务在某些模式下开机启动
chkconfig --level 连在一起的启动模式 服务名 on
# 设置服务在3，5模式下开机不启动
chkconfig --level 35 服务名 off
```
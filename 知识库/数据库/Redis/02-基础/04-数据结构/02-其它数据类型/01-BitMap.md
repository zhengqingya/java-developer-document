# Redis - 其他数据类型

## BitMap：位图，本质是string

使用场景：用户在线状态、统计活跃用户、用户周活跃、用户签到

```shell
# 设置zq第1天 签到->1
setbit zq 0 1
# 设置zq第2天 签到->1
setbit zq 1 1
# 设置zq第3天 签到->1
setbit zq 2 1
# 设置zq第9天 未签到->0
setbit zq 8 0
# 设置zq第15天 签到->1
setbit zq 16 1
# 查询第9天是否签到
getbit zq 8
# 查看zq总签到天数
bitcount zq
```

![redis-BitMap.png](../../images/redis-BitMap.png)
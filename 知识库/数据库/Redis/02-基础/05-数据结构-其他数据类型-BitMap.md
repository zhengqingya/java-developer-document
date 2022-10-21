# Redis - 其他数据类型

## BitMap：位图，本质是string

使用场景：用户在线状态、统计活跃用户、用户周活跃、用户签到

```shell
# 设置zq第1天 在线->1
setbit zq 0 1
# 设置zq第9天 不在线->0
setbit zq 10 0
# 返回设置值0
getbit zq 10
# 查看zq总在线天数
bitcount zq
```


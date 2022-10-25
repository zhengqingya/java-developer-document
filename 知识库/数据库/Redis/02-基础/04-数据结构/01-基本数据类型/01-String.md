# Redis - 基本数据类型

## 字符串(String)

使用场景：存储用户信息、点赞计数等

```shell
# 设置值
set key value
# 获取值
get key
# 删除指
del key
# 设置值和过期时间
setex key seconds value
# 查询过期时间 -1：永不过期 -2：已过期-即key不存在
ttl key
#  批量设置值
mset name zq age 18
# 批量获取值
mget name age
# 将key中储存的数字值增1(key不存在,则初始化为0,再加1)，并返回结果值
incr key
# 将key中储存的数字值减1(key不存在,则初始化为0,再减1)，并返回结果值
decr key
# 指定自增多少
incrby key 10
# 指定自减多少
decrby key 10
```
# Redis - 基本数据类型

## 哈希(Hash) - 键值对结构

使用场景：购物车redis存储设计

1. key -> 租户ID+用户ID
2. field -> 商品规格属性SKU-ID
3. value -> 商品信息

```shell
# 添加一个name=>value键值对到key这个hash类型    hset userinfo name zq age 18
hset key name value
# 批量添加name=>value键值对到key这个hash类型   hmset userinfo name zq age 18
hmset key name1 key1 name2 key2
# 获取hash类型的name键对应的值
hget key name
# 批量获取hash类型的键对应的值
hmget key name1 name2
del userinfo
# 返回哈希表 key 中，所有的键和值
hgetall userinfo
# 返回哈希表 key 中的所有键
hkeys
# 返回哈希表 key 中的所有值
hvals
```

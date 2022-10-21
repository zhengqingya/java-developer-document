# Redis - 基本数据类型

## 有序集合(Zset) - 降序排列

使用场景：排行榜

```shell
zadd myscoreset 100 zq 90 qq
# 查看所有元素
zrange myscoreset 0 -1
# 查看指定元素
zscore myscoreset zq
```


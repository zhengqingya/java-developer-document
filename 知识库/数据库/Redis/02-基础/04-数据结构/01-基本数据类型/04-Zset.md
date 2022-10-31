# Redis - 基本数据类型

## 有序集合(Zset)

使用场景：排行榜

```shell
# 添加元素到集合
zadd myscore_set 100 aa 90 bb 80 cc 70 dd 60 ee 50 ff
# 查看指定元素
zscore myscore_set aa
# 查看所有元素 - 根据score正序排序，withscores：score值一起输出
zrange myscore_set 0 -1
zrange myscore_set 0 -1 withscores
# 查看前3个元素 - 根据score倒序排序
zrevrange myscore_set 0 2
zrevrange myscore_set 0 2 withscores

# 根据score查询100-0之间的数据，偏移量为0(即从100-0之间数据的第一个元素开始查)，每页查询3条数据
zrevrangebyscore myscore_set 100 0 withscores limit 0 3
```

![redis-Zset.png](../../images/redis-Zset.png)

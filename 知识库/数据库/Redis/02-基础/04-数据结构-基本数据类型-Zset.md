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
zrevrange myscore_set 0 3
zrevrange myscore_set 0 3 withscores
```

![redis-Zset.png](images/redis-Zset.png)

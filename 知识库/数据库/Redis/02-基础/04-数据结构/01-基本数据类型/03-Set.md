# Redis - 基本数据类型

## 集合(Set) - 无序，不重复

使用场景：文章关联用户点赞、浏览信息

```shell
# 添加元素到集合
sadd my_set_a 1 2 3 4 five
# 查看集合元素  => ex: 查看关注/点赞列表
smembers my_set_a
# 判断集合是否包含指定value 包含返回1 不包含返回0
sismember my_set_a five
# 移除集合key中的元素
srem my_set_a 3
# 查看元素个数
scard my_set_a

sadd my_set_b 2 3 6
# 求2个集合的差集
sdiff my_set_a my_set_b
# 求2个集合的交集  => ex: 共同关注
sinter my_set_a my_set_b
```

![redis-set.png](../../images/redis-set.png)
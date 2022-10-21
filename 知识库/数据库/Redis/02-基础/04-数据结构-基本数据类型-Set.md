# Redis - 基本数据类型

## 集合(Set) - 无序，不重复

使用场景：文章关联用户点赞、浏览信息

```shell
sadd myset 1 2 3 4 five
# 查看集合元素
smembers myset
# 判断集合是否包含指定value 包含返回1 不包含返回0
sismember myset 1
# 移除集合key中的元素
srem myset 3
```

# Redis - 基本数据类型

## 列表(List) - 链表，有序，可重复

使用场景：数据字典

1. key -> 字典code
2. value -> 字典值

```shell
# 将值插入到key的表头(最左边)
lpush mylist 1 2 3 4 five
# 将值插入到key的表尾(最右边)
rpush mylist 6 7 8
# 查看元素
lrange mylist 0 -1
# 移除头(最左边)元素
lpop mylist
# 移除尾(最右边)元素
rpop mylist
#  根据count值移除列表key中与参数 value 相等的元素
#           count > 0 : 从表头开始向表尾搜索，移除与 value 相等的元素，数量为 count 。
#           count < 0 : 从表尾开始向表头搜索，移除与 value 相等的元素，数量为 count 的绝对值。
#           count = 0 : 移除表中所有与 value 相等的值。
lrem key count value
# 返回列表 key 中，下标为 index 的元素
lindex key index
# 对一个列表进行截取数据，保留下标从start到stop间的数据
ltrim key start stop
```
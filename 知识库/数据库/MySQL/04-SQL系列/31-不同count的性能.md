# 不同count的性能

统计数据表中行（records）的数量

- count(字段)：指定列中非空值进行计数
- count(1)：统计所有行(不会忽略列值为null的)行数
- count(*)：统计所有行(不会忽略列值为null的)行数。

MySQL对count(*)做了优化，会选择最优索引

执行效率，`count(字段)` < `count(主键)` < `count(1)`/`count(*)`


# select一张表的字段数据insert到另一张表&同时传入自定义数据

```shell
# 从库1的表1中查出数据，插入库2的表2中
insert into 库2.表2(
id,
tenant_id,
name
)
select 
id,
'固定值',
name
from 库1.表1;
```

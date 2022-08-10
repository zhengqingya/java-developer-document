# 查询json字段里面的值


现有字段`data_json`，里面的数据为： [{"id":2,"name":"张三"},{"id":3,"name":"李四"}]


想查出data_json里面id=3匹配的值

例：

```
SELECT * FROM table_name WHERE JSON_CONTAINS( data_json, JSON_OBJECT( 'id', 3 ))
```

> 注：mysql需5.7以上的版本，字段类型需为json

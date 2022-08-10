# 使用AVG聚合函数时保留两位小数

```shell
SELECT 
  CAST( AVG(i.cost_unit) AS DECIMAL(10,2) ) costUnit
FROM t_cost_info i
```

# 含有GROUP BY子句的查询中显示COUNT()为0的结果 - 即where条件过滤后无法显示为空的分组数据

原因：在SELECT语句中WHERE子句先于GROUP BY执行，因此在执行GROUP BY子句时，表中的记录已经被过滤.

解决方案: 构造含有所有PID的结果集与其上述语句所得结果集进行左连接，并利用IFNULL()替换函数（如SQL SERVER中的ISNULL（）、ORACLE中的NVL（））将NULL替换为0。

```shell
SELECT 
  DISTINCT a.id, a.name, IFNULL( b.value, 0 ) value
FROM t_user AS a
LEFT JOIN (
    SELECT
        t.id,
        t.name,
        count(t.id) value
    FROM t_user t
    WHERE  t.id = 1
    GROUP BY t.id
) AS b ON a.id = b.id
```

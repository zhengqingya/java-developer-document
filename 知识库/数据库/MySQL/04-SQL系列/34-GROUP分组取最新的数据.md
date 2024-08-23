# GROUP分组取最新的数据

1. 子查询 (t2)：首先，子查询找出每个 group_column 下的最大 id。
2. 外部查询 (t1)：然后，外部查询通过 JOIN 将原始表与子查询的结果连接起来，从而获取每个分组下 id 最大的记录

```mysql
SELECT t1.*
FROM your_table t1 JOIN (
    SELECT md5_content, MAX(id) AS max_id
    FROM your_table
    WHERE group_column in ('xxx')
    GROUP BY group_column
) t2 ON t1.group_column = t2.group_column AND t1.id = t2.max_id
WHERE t1.create_time >= DATE_SUB(NOW(), INTERVAL 7 DAY); -- 7天内的数据
```

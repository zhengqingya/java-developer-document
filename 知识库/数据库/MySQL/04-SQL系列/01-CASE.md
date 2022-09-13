# CASE 流程控制函数

```
SELECT
    t.name 姓名,
    (
        CASE t.sex
        WHEN 1 THEN
            '男'
        WHEN 2 THEN
            '女'
        ELSE
            '未知'
        END
    ) 性别
FROM
    t_user t
```

```
SELECT t.name,
       (
           CASE
               WHEN t.sex = 1 THEN
                   '男'
               WHEN t.sex = 2 THEN
                   '女'
               ELSE
                   '未知'
               END
           ) 性别
FROM t_user t
```

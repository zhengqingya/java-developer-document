### 三元运算

#### 法一： CASE

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

或

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

#### 法二： IF

```
-- 条件的结果为true返回第一个值，否则返回第二个值
IF(condition, value_if_true, value_if_false)


SELECT IF(500<1000, 5, 10);
```


#### 法三：字符串的集合操作ELT()


ELT(N,str1,str2,str3,...)   ->  如果 N = 1，返回 str1，如果N = 2，返回 str2，等等。如果 N 小于 1 或大于参数的数量，返回 NULL。

```mysql
SELECT t.name,
       ELT(
               t.level,
               '超级VIP',
               'VIP',
               '普通'
           ) 用户类型
FROM t_user t
```

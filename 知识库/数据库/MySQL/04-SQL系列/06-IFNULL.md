# IFNULL

判断第一个表达式是否为 NULL，如果为 NULL 则返回第二个参数的值，如果不为 NULL 则返回第一个参数的值。

```shell
IFNULL(expression, alt_value)
```

```shell
SELECT IFNULL(null, 5);
```

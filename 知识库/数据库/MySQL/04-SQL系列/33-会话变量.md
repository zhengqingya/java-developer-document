# 会话变量

提取公共变量来执行sql

> 作用范围是当前会话

```mysql
-- 声明会话变量
SET @id_val := '666';

-- 使用
select * from t_user where id = @id_val;
select * from t_test where id = @id_val;
```

# 会话变量

提取公共变量来执行sql

> 作用范围是当前会话

```mysql
-- 声明会话变量
SET @id_val := '666';
SET @user_ids := ( select GROUP_CONCAT(id) from t_user ); -- 1,2,3

-- 使用
select * from t_user where id = @id_val;
select * from t_test where FIND_IN_SET(user_id, @user_ids) > 0; -- 类似效果 user_id in (1,2,3)
```

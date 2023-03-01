# 时间差

```
-- 30天前
SELECT DATE_SUB( now(), INTERVAL 30 DAY );
-- 30天后
SELECT DATE_ADD( now(), INTERVAL 30 DAY );

-- 1小时后
SELECT DATE_ADD( now(), INTERVAL 1 HOUR );
```

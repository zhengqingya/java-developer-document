# SUM

求和

```shell
SELECT
	SUM( CASE WHEN 字段名=2 THEN 1 ELSE 0 END ) offlineNum,
	SUM( CASE WHEN 字段名=1 THEN 1 ELSE 0 END ) onlineNum 
FROM
	表名
```

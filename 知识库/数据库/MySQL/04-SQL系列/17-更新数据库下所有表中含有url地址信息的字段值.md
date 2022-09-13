# 更新数据库下所有表中含有url地址信息的字段值

```shell
SELECT
	CONCAT( 'update ', TABLE_NAME, ' set ', column_name, '=( substring(', column_name, ', 从左到右需要截掉的长度 ,LENGTH(substring(', column_name, ',1)) )) where LENGTH(substring(', column_name, ',1))>0 and locate(''指定内容'' , ', column_name, ');' ) 
FROM
	information_schema.COLUMNS 
WHERE
	TABLE_SCHEMA = '指定库'
```

ex:

```shell
SELECT CONCAT( 'update ', TABLE_NAME, ' set ', column_name, '=( substring(', column_name, ',28,LENGTH(substring(', column_name, ',1)) )) where LENGTH(substring(', column_name, ',1))>0 and locate(''https://'' , ', column_name, ');' ) FROM information_schema.COLUMNS  WHERE TABLE_SCHEMA = 'demo'
```

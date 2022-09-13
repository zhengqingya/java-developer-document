# truncate-清空表数据并设置自增id从1开始

### 单表操作

```
TRUNCATE TABLE 数据库名.表名;
```

### 库操作

```
# 先执行select语句生成所有truncate语句
SELECT CONCAT( 'TRUNCATE TABLE ', table_schema, '.', TABLE_NAME, ';' )
FROM INFORMATION_SCHEMA.TABLES
WHERE table_schema IN ('数据库1','数据库2');

# Navicat拷贝查询出来的sql语句全部执行即可
```

### 自动增长从1开始

```
# DELETE FROM 数据库名.表名; -- 清空表数据
ALTER TABLE 数据库名.表名 AUTO_INCREMENT = 1; -- 1: 想让id从几开始增长的数字
```

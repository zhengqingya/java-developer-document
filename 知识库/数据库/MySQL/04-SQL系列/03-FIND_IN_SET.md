### FIND_IN_SET - 查询条件中字段包含多个ID，并用逗号分开

```shell
# 查询字段名中包含1的数据   ex: '1,2,3,11' 中包含1将会被查询出来(不会查询出11)  多个包含可以用 or
SELECT * from 表名 where FIND_IN_SET('1',字段名);
```

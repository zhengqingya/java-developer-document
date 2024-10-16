1. JSON_EXTRACT(data, '$[*].code'):
    - JSON_EXTRACT 从 data 字段中提取所有对象的 code 字段值，形成一个新的 JSON 数组。
    - $[*].code 表示提取所有对象的 code 字段。
2. JSON_CONTAINS(..., '"dict"', '$'):
    - JSON_CONTAINS 检查提取出的 JSON 数组中是否包含 "dict"。
    - 第二个参数 "dict" 是要查找的具体值。
    - 第三个参数 '$' 表示从根路径开始查找。

### JSON_CONTAINS -- 普通json

```
-- 返回json字段`menu_id_list`中包含'666'的行数据
select * from t_sys_tenant_package where JSON_CONTAINS(menu_id_list, '666');

SELECT JSON_CONTAINS('[1,2,3]', '3'); -- 如果包含返回1，不包含返回0
```

### JSON_EXTRACT -- json对象数组

```sql
-- 创建表并插入示例数据
CREATE TABLE my_table
(
    id   INT PRIMARY KEY,
    data JSON
);

INSERT INTO my_table (id, data)
VALUES (1, '[{"code": "abc"}, {"code": "def"}]'),
       (2, '[{"code": "ghi"}, {"code": "dict"}]'),
       (3, '[{"code": "jkl"}, {"code": "mno"}]');

-- 查询 `code` 字段包含 "dict" 的行
SELECT *
FROM my_table
WHERE JSON_CONTAINS(
              JSON_EXTRACT(data, '$[*].code'),
              '"dict"',
              '$'
      );
```

结果

```
+----+----------------------------------+
| id | data                             |
+----+----------------------------------+
| 2  | [{"code": "ghi"}, {"code": "dict"}] |
+----+----------------------------------+
```
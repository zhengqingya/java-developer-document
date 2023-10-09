# JSON_CONTAINS

```
-- 返回json字段`menu_id_list`中包含'666'的行数据
select * from t_sys_tenant_package where JSON_CONTAINS(menu_id_list, '666');

SELECT JSON_CONTAINS('[1,2,3]', '3'); -- 如果包含返回1，不包含返回0
```
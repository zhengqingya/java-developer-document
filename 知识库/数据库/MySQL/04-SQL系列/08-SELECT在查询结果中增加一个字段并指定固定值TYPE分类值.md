# select在查询结果中增加一个字段并指定固定值type分类值

```shell
SELECT * FROM
(
    SELECT
        u.USER_ID userId,
        u.USER_NAME name,
        1 as type
    FROM T_SYS_USER u
    UNION ALL
    SELECT
        t.ID userId,
        t.TYPE name,
        2 as type
    FROM T_EM_CMD_TEAM t
)
```

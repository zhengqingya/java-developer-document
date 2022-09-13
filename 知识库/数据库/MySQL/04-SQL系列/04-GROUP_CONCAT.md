# GROUP_CONCAT

将group by 根据某字段分组查询出来的结果拼接显示，默认以逗号分隔数据

```shell
SELECT
    t.sex,
    GROUP_CONCAT( t.id ),
    GROUP_CONCAT( t.name )
FROM t_user t
GROUP BY t.sex
```

将上面的id号从大到小排序，且用'_'作为分隔符：

```shell
SELECT
    t.sex,
    GROUP_CONCAT( t.id ORDER BY t.id DESC SEPARATOR '_' ),
    GROUP_CONCAT( t.name )
FROM t_user t
GROUP BY t.sex
```

---

注： group_concat连接字段有长度限制！默认1024
                若已经设置了最大长度，则结果被截至这个最大长度。

### 修改默认字符大小

###### 法1: 在MySQL配置文件中加上

```
group_concat_max_len = 102400 # 你要的最大长度
group_concat_max_len = -1     # -1为最大值或填入你要的最大长度
```

###### 法2: 可以简单一点，执行语句,可以设置作用范围

```shell
SET GLOBAL group_concat_max_len=102400;
SET SESSION group_concat_max_len=102400;
```

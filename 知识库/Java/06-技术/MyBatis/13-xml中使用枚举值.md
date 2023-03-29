```
@Getter
@AllArgsConstructor
public enum IsDeletedEnum {
    /**
     * 删除
     */
    YES(1, "删除"),
    /**
     * 未删除
     */
    NO(0, "未删除");
    
    /**
     * 值
     */
    private final Integer value;
    /**
     * 描述
     */
    private final String desc;
}
```

```
SELECT id, username
FROM t_demo
WHERE is_deleted = ${@com.zhengqing.common.db.enums.IsDeletedEnum@NO.getValue()}
```
### 返回List集合

原本响应结构

```json
[
  {
    "name": "test",
    "code": "persion"
  },
  {
    "name": "test",
    "code": "admin"
  }
]
```

期待返回结构

```json
[
  {
    "name": "test",
    "codeList": [
      "persion",
      "admin"
    ]
  }
]
```

使用collection嵌套list对象的时候，其它字段(ex:name)都要做映射才有值！

```java
public class SysRoleRePermListVO {
    @ApiModelProperty(value = "名称")
    private String name;

    @ApiModelProperty(value = "list")
    private List<String> codeList;
}
```

```
<resultMap id="listRoleRePerm" type="com.zhengqing.system.model.vo.SysRoleRePermListVO">
    <result property="name" column="name" jdbcType="VARCHAR"/>
    <collection property="codeList" ofType="String" javaType="list">
        <result column="code"/>
    </collection>
</resultMap>

<select id="listRoleRePerm" resultMap="listRoleRePerm">
    SELECT sp.id,
           sp.name,
           r.code
    FROM t_sys_permission sp
    LEFT JOIN t_sys_role_permission srp ON sp.id = srp.permission_id
    LEFT JOIN t_sys_role r ON srp.role_id = r.role_id
</select>
```

---

### 返回list对象集合

原本响应结构

```json
[
  {
    "id": 1,
    "name": "test",
    "code": "persion"
  },
  {
    "id": 2,
    "name": "test",
    "code": "admin"
  }
]
```

期待返回结构

```json
[
  {
    "name": "test",
    "codeList": [
      {
        "id": 1,
        "code": "persion"
      },
      {
        "id": 2,
        "code": "admin"
      }
    ]
  }
]
```

使用collection嵌套list对象的时候，其它字段(ex:name)都要做映射才有值！

```java
public class SysRoleRePermListVO {
    @ApiModelProperty(value = "名称")
    private String name;

    @ApiModelProperty(value = "list")
    private List<RoleObj> codeList;

    @Data
    static class RoleObj {
        @ApiModelProperty("id")
        private Integer id;

        @ApiModelProperty("编码")
        private String code;
    }
}
```

```
<resultMap id="resultMap" type="com.zhengqing.system.model.vo.SysRoleRePermListVO">
    <id column="id" property="id"/>
    <result column="name" property="name"/>
    <collection property="codeList"
                ofType="com.zhengqing.system.model.vo.SysRoleRePermListVO$RoleObj">
        <id property="id" column="id"/>
        <result column="code" property="code"/>
    </collection>
</resultMap>

<select id="selectDataList" resultMap="resultMap">
    SELECT sp.id,
           sp.name,
           r.code
    FROM t_sys_permission sp
    LEFT JOIN t_sys_role_permission srp ON sp.id = srp.permission_id
    LEFT JOIN t_sys_role r ON srp.role_id = r.role_id
</select>
```

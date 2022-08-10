
```xml
<resultMap id="selectDataListBySpuIdList" type="com.zhengqing.mall.common.model.bo.PmsSkuBO">
    <result column="spec_list"
            property="specList"
            typeHandler="com.zhengqing.mall.config.mybatis.handler.MallListSpecTypeHandler"></result>
</resultMap>

<select id="selectDataListBySpuIdList" resultMap="selectDataListBySpuIdList">
    SELECT
    id,
    spec_list
    FROM pms_sku
</select>
```

---

使用collection嵌套list对象的时候，其它字段(ex:name)都要做映射才有值！

```xml
<resultMap id="listRoleRePerm" type="com.zhengqing.system.model.vo.SysRoleRePermListVO">
    <result property="name" column="name" jdbcType="VARCHAR"/>
    <collection property="roleCodeList" ofType="String" javaType="list">
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

```json
[
    {
      "name": "查询用户",
      "roleCodeList": [
        "persion",
        "super_admin"
      ]
    }
]
```
# sql片段标签

```
<sql id="CONDITION_COMMON_ORDER">
    <where>
        <if test="filter.startTime!=null and filter.startTime!=''">
            AND create_time >= #{filter.startTime}
        </if>
        <if test="filter.endTime!=null and filter.endTime!=''">
            AND create_time &lt;= #{filter.endTime}
        </if>
        <if test="filter.shopIdList!=null and filter.shopIdList.size>0">
            AND shop_id IN
            <foreach collection="filter.shopIdList" separator="," open="(" close=")" item="shopId">
                #{shopId}
            </foreach>
        </if>
    </where>
</sql>

<select id="selectTabCondition" resultType="com.zhengqingya.common.model.vo.TpsTabConditionListVO">
    SELECT
    order_status value,
    COUNT( id ) num
    FROM t_order
    <include refid="CONDITION_COMMON_ORDER"/>
    GROUP BY order_status
</select>
```

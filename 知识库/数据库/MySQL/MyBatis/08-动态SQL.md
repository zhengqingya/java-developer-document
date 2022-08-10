# 动态SQL

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zhengqingya.demo.mapper.JmsOrderMapper">

    <sql id="CONDITION_COMMON_ORDER">
        <where>
            <!-- 数组 -->
            <if test="filter.arr != null and filter.arr.length > 0">
            </if>
            <!-- 集合 -->
            <if test="filter.orderNoList != null and filter.orderNoList.size() > 0">
                AND order_no IN
                <foreach collection="filter.orderNoList" separator="," open="(" close=")" item="orderNo">
                    #{orderNo}
                </foreach>
            </if>
            <if test="filter.payStartTime!=null">
                AND jo.pay_time >= #{filter.payStartTime}
            </if>
            <if test="filter.payEndTime!=null">
                AND jo.pay_time &lt;= #{filter.payEndTime}
            </if>
            <choose>
                <when test="xx">

                </when>
                <!-- 数字类型 用 ==  -->
                <when test="filter.dataType == 1">

                </when>
                <!-- 数字类型 -->
                <when test="filter.userId!=null">
                    AND jo.user_id = #{filter.userId}
                </when>
                <!-- 字符串类型 -->
                <when test="filter.username!=null and filter.username!=''">
                    AND jc.username LIKE CONCAT( #{filter.username} , '%' )
                </when>
                <otherwise>

                </otherwise>
            </choose>
        </where>
    </sql>
    
    <select id="selectTabConditionByWeb" resultType="com.zhengqingya.demo.model.vo.JmsTabConditionListVO">
        SELECT
        t.order_status value,
        COUNT( t.order_no ) num
        FROM (
            SELECT
            jo.order_status,
            jo.order_no
            <include refid="CONDITION_COMMON_ORDER"/>
            GROUP BY jo.order_no
        ) t
        GROUP BY t.order_status
    </select>
    
</mapper>
```

# mybatis结合oracle实战

### oracle批量插入

```
/**
 * 批量保存
 * @param list
 */
void insertBatch(@Param("list") List<DataShare> list);

<insert id="insertBatch" >
    INSERT INTO 表名(NAME,URL,字段名)
    SELECT A.*
    FROM(
        <foreach collection="list" item="item" index="index" separator="UNION ALL" >
            SELECT
                #{item.name},#{item.url},#{item中的字段名}
            FROM DUAL
        </foreach>
    ) A
</insert>

ex: 

<insert id="insertBatch" >
    insert into T_DS_DATA_SHARE(NAME,URL,REQUEST_PARAMS,RESPONSE_PARAMS)
    SELECT A.*
    FROM(
        <foreach collection="list" item="item" index="index" separator="UNION ALL" >
            select
            #{item.name},#{item.url},#{item.requestParams},#{item.responseParams}
            from dual
        </foreach>
    ) A
</insert>
```

### oracle日期时间与java日期时间对比

```
oracle 查询时间：    update_date：TIMESTAMP格式
yyyy-MM-dd HH24:mm:ss
to_char(update_date,'yyyy-MM-dd HH24:mi:ss')


对应java  要为Date类型
SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date objDate = formatter.parse(strTime);

-----------------------------------------------------------------------------
【注：】也可直接比较 ex:
<if test="filter.startTime!=null">
    AND <![CDATA[ADD_DATE >= #{filter.startTime}]]>
</if>
```
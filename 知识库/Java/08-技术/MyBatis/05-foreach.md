# foreach

```
List<OrderPageVO> selectPageList(@Param("orderIdList") List<String> orderIdList);
```

```
SELECT
    operator_name,
    operator_phone
FROM order
<where>
    <if test="orderIdList!=null and orderIdList.size>0">
        AND order_id IN
        <foreach collection="orderIdList" separator="," open="(" close=")" item="orderId">
            #{orderId}
        </foreach>
    </if>
    -- orderIdList 中包含字符串 1   tips: byte类型不适用！
    <if test='orderIdList!=null and orderIdList.size>0 and orderIdList.contains("1")'>
        AND order_id IN (1,2)
    </if>
     -- orderIdList 中包含数字 1   tips: byte类型不适用！
    <if test="orderIdList!=null and orderIdList.size>0 and orderIdList.contains(1)">
        AND order_id IN (1,2)
    </if>
</where>
```

###### foreach元素的属性主要有item，index，collection，open，separator，close。

1. item：集合中元素迭代时的别名，
2. index：集合中元素迭代时的索引
3. open：常用语where语句中，表示以什么开始，比如以'('开始
4. separator：表示在每次进行迭代时的分隔符，
5. close 常用语where语句中，表示以什么结束，

在使用foreach的时候最关键的也是最容易出错的就是collection属性，该属性是必须指定的，但是在不同情况下，该属性的值是不一样的，主要有一下3种情况：

1. 如果传入的是单参数且参数类型是一个List的时候，collection属性值为list .
2. 如果传入的是单参数且参数类型是一个array数组的时候，collection的属性值为array .
3. 如果传入的参数是多个的时候，我们就需要把它们封装成一个Map了，当然单参数也可以封装成map，实际上如果你在传入参数的时候，在MyBatis里面也是会把它封装成一个Map的，map的key就是参数名，所以这个时候collection属性值就是传入的List或array对象在自己封装的map里面的key.

> 针对最后一条，我们来看一下官方说法： 
> 注意 你可以将一个 List 实例或者数组作为参数对象传给 MyBatis，
> 当你这么做的时候，MyBatis 会自动将它包装在一个 Map 中并以名称为键。
> List 实例将会以“list”作为键，而数组实例的键将是“array”。
> 所以，不管是多参数还是单参数的list,array类型，都可以封装为map进行传递。
> 如果传递的是一个List，则mybatis会封装为一个list为key，list值为object的map，
> 如果是array，则封装成一个array为key，array的值为object的map，
> 如果自己封装呢，则colloection里放的是自己封装的map里的key值

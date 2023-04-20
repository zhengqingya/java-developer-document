### choose (when, otherwise)标签

choose标签是按顺序判断其内部when标签中的test条件出否成立，如果有一个成立，则 choose 结束。
当 choose 中所有 when 的条件都不满则时，则执行 otherwise 中的sql。
类似于Java 的 switch 语句，choose 为 switch，when 为 case，otherwise 则为 default。
例如下面例子，同样把所有可以限制的条件都写上，方面使用。
choose会从上到下选择一个when标签的test为true的sql执行。安全考虑，我们使用where将choose包起来，放置关键字多于错误。


```xml
<where>
    <choose>
        <when test="xx">
        
        </when>
        <!-- 数字类型 用 ==  -->
        <when test="filter.dataType == 1">

        </when>
        <!-- 数字类型 -->
        <when test="sex != null">
            
        </when>
        <!-- 字符串类型 -->
        <when test="username != null and username != ''">
    
        </when>
        <otherwise>
        
        </otherwise>
    </choose>
</where>
```

### 自定义 TypeHandler 类型处理器

> tips: 可以直接使用 {@link com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler}

数据库为json字符串，映射给java为list对象

```java
public class PmsSkuBO {
    @ApiModelProperty("ID")
    private String id;

    @ApiModelProperty("list")
    private List<PmsSkuSpecBO> specList;
}
```

```
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

```java
import cn.hutool.core.lang.Assert;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.handlers.AbstractJsonTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

/**
 * <p> 自定义 TypeHandler 类型处理器 </p>
 *
 * @author zhengqingya
 * @description json类型转对象
 * @date 2022/6/6 11:25
 */
@MappedJdbcTypes(JdbcType.VARCHAR)
@MappedTypes({Object.class})
public class DbJsonTypeHandler extends AbstractJsonTypeHandler<Object> {

    private final Class<?> clazz;

    public DbJsonTypeHandler(Class<?> type, Class<?> innerType) {
        Assert.notNull(type, "Type argument cannot be null ...");
        this.clazz = innerType;
    }

    @Override
    protected Object parse(String json) {
        if (JSONUtil.isJsonArray(json)) {
            return JSONUtil.toList(JSONUtil.parseArray(json), this.clazz);
        } else {
            return JSONUtil.toBean(json, this.clazz);
        }
    }

    @Override
    protected String toJson(Object obj) {
        return JSONUtil.toJsonStr(obj);
    }

}
```

```java

import com.zhengqing.common.db.config.mybatis.handler.DbJsonTypeHandler;
import com.zhengqing.mall.common.model.bo.PmsSkuSpecBO;

/**
 * <p> 自定义类型处理器 </p>
 *
 * @author zhengqingya
 * @description 规格
 * @date 2022/6/6 11:26
 */
public class MallListSpecTypeHandler extends DbJsonTypeHandler {

    public MallListSpecTypeHandler(Class<?> type) {
        super(type, PmsSkuSpecBO.class);
    }

}
```

保存数据时，list会转为json存入数据库中。

```
@TableName(value = "pms_sku", autoResultMap = true)
public class PmsSku extends Model<PmsSku> {

    @TableField(typeHandler = MallListSpecTypeHandler.class)
    private List<PmsSkuSpecBO> specList;
    
}
```

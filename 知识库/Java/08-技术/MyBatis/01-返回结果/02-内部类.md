# mybatis resultType 内部类

1. resultType 后面内部类用 $ 连接
2. 内部类必须static修饰
3. 内部类必须有空的构造方法

```
<select id="selectDeliveryInfo" resultType="com.xx.OrderPageVO$OrderDeliveryVO">
    SELECT 
        operator_name,
        operator_phone
    FROM xx
</select>
```

```java

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("统一订单数据")
public class OrderPageVO {

    @ApiModelProperty("订单号")
    private String orderNo;

    @ApiModelProperty("订单配送信息")
    private OrderDeliveryVO delivery;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ApiModel("订单配送信息")
    public static class OrderDeliveryVO {
        @ApiModelProperty(value = "操作人姓名")
        private String operatorName;

        @ApiModelProperty(value = "操作人电话")
        private String operatorPhone;
    }

}
```

如果返回结果想要映射到结果中的某一个对象中，如下：

```
<select id="selectDeliveryInfo" resultType="com.xx.OrderPageVO">
    SELECT 
        order_no,
        operator_name `delivery.operatorName`,
        operator_phone `delivery.operatorPhone`
    FROM xx
</select>
```

如果在`resultMap`中则为`<result column="operator_name" property="delivery.operatorName"/>`

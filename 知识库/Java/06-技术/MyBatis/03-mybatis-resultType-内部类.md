# mybatis resultType 内部类

1. resultType 后面内部类用 $ 连接
2. 内部类必须static修饰
3. 内部类必须有空的构造方法

```
<select id="selectDeliveryInfo" resultType="com.xx.OrderPageVO$OrderDeliveryVO">
    SELECT operator_name
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

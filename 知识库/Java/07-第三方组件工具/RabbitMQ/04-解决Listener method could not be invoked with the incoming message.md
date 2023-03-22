### 问题

```shell
org.springframework.amqp.rabbit.support.ListenerExecutionFailedException: Listener method could not be invoked with the incoming message
Endpoint handler details:
Method [public void com.zhengqingya.demo.consumer.UmsUserSendCouponConsumer.receiveMessage(com.zhengqingya.demo.model.bo.UmsSendUserCouponBO)]


Caused by: org.springframework.messaging.converter.MessageConversionException: Cannot convert from [java.lang.String] to [com.zhengqingya.demo.model.bo.UmsSendUserCouponBO] for GenericMessage [payload={
	"tenantId": 1
}, headers={amqp_receivedDeliveryMode=NON_PERSISTENT, amqp_receivedRoutingKey=ums_send_coupon, amqp_deliveryTag=1, amqp_consumerQueue=ums_send_coupon, amqp_redelivered=true, id=1635ae71-fb8b-ddbd-c8bb-af8b9652a036, amqp_consumerTag=amq.ctag--aaEsyFHwZLxs8LkkNrVPg, amqp_lastInBatch=false, contentType=text/plain, timestamp=1679479633719}]
```

生产者发送消息和消费者接收消息的实体类没有对应

### 解决

消息转换

```
@Bean
public MessageConverter jsonMessageConverter() {
    return new Jackson2JsonMessageConverter();
}
```

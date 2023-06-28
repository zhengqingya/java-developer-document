# 消息确认机制

为了保证消息从队列可靠的达到消费者，RabbitMQ 提供了消息确认机制（Message Acknowledgement）。

1. 发送方确认
    - 生产者到交换机到确认（消息达到交换器）
    - 交换机到队列的确认（交换器绑定队列）
2. 接收方确认

### 一、生产方确认

`application.yml`中配置

```yml
spring:
  rabbitmq:
    publisher-confirm-type: correlated # 确认消息已发送到交换机(Exchange)
    publisher-returns: true # 确认消息已发送到队列(Queue)
```

> tips:
>
只能选择下面其中一种方式进行配置，否则会报错：`Only one ConfirmCallback/ReturnCallback is supported by each RabbitTemplate`

#### 方式1

```
@Bean
public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
    RabbitTemplate rabbitTemplate = new RabbitTemplate();
    rabbitTemplate.setConnectionFactory(connectionFactory);
    // 设置开启Mandatory,才能触发回调函数,无论消息推送结果怎么样都强制调用回调函数
    rabbitTemplate.setMandatory(true);

    // 确认消息送到交换机(Exchange)回调
    rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
        // do your business
        log.debug("\n[确认消息送到交换机(Exchange)回调] 是否成功:[{}] 数据：[{}] 异常：[{}]", ack, JSONUtil.toJsonStr(correlationData), cause);
    });

    // 确认消息送到队列(Queue)回调 -- 只有在出现错误时才回调
    rabbitTemplate.setReturnsCallback(returnedMessage -> {
        // do your business
        log.error("\n[确认消息送到队列(Queue)回调] 返回信息：[{}]", JSONUtil.toJsonStr(returnedMessage));
    });

    return rabbitTemplate;
}
```

#### 方式2

```java
package com.zhengqing.demo.util;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.lang.UUID;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ReturnedMessage;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MqUtil implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnsCallback {

    private RabbitTemplate rabbitTemplate;

    public void sendWithConfirm(String exchange, String routingKey, Object msgData) {
        log.info("[MQ生产者] 发送方确认模式 交换机:[{}] 路由key:[{}] 发送消息:[{}]", exchange, routingKey, JSONUtil.toJsonStr(msgData));
        this.rabbitTemplate.setMandatory(true);
        this.rabbitTemplate.setReturnsCallback(this);
        this.rabbitTemplate.setConfirmCallback(this);
        this.rabbitTemplate.convertAndSend(exchange, routingKey, msgData, new CorrelationData(UUID.randomUUID().toString()));
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        // do your business
        log.debug("\n[确认消息送到交换机(Exchange)回调] 是否成功:[{}] 数据：[{}] 异常：[{}]", ack, JSONUtil.toJsonStr(correlationData), cause);
    }

    @Override
    public void returnedMessage(ReturnedMessage returnedMessage) {
        // do your business
        log.error("\n[确认消息送到队列(Queue)回调] 返回信息：[{}]", JSONUtil.toJsonStr(returnedMessage));
    }

}
```

### 二、消费方确认

org.springframework.amqp.core.AcknowledgeMode（确认模式）: 用于定义如何确认消息的传递

- `NONE`: 自动不确认模式，RabbitMQ 不会等待应用程序显式地返回确认信息。
- `MANUAL`：手动确认模式，手动挡控制 确认消息 / 拒绝消息 / 重发消息(如果程序一直异常，会出现死循环，导致消息积压)
- `AUTO`: 自动确认模式，在消费消息的时候没有抛出异常，服务端MQ就会认为消息正常消费，从而删除队列中的消息；如果有异常（或服务宕机），则会进行补偿，自动重试。

开启手动ACK

> 手动ack会导致yml中配置的重试次数失效，如果需要重试次数能力，自行编写代码实现...

#### a:全局方式

`application.yml`中配置：`spring.rabbitmq.listener.simple.acknowledge-mode=manual`

然后进行测试

```java
package com.zhengqing.demo.controller;

import cn.hutool.core.date.DateTime;
import com.rabbitmq.client.Channel;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Slf4j
@Api(tags = "测试mq-ack")
@RestController
@RequestMapping("/mq")
public class AckController {

    @Resource
    private RabbitTemplate rabbitTemplate;

    @ApiOperation("手动ACK")
    @PostMapping("ack")
    public String ack() {
        String msgContent = "Hello World " + DateTime.now();
        log.info("{} [生产者] 发送消息: {}", DateTime.now(), msgContent);
        this.rabbitTemplate.convertAndSend("test_exchange", "test_ack_routing_key", msgContent);
        return "SUCCESS";
    }

    @RabbitHandler
    @RabbitListener(queues = {"test_ack_queue"})
    public void consumer(String msg, Message message, Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long tag) throws Exception {
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        try {
            log.info("----------------------------------------------");
            log.info("{} [消费者] deliveryTag:{} 接收消息: {}", DateTime.now(), deliveryTag, msg);
//            int num = 1 / 0;
            // 手动确认消息已被消费
//            channel.basicAck(deliveryTag, false);
        } catch (Exception e) {
            // 丢弃消息
            channel.basicReject(deliveryTag, false);
            // 重新入队再次消费
//            channel.basicReject(deliveryTag, true);
            e.printStackTrace();
        }
    }

}
```

#### b:指定单个消费者的ack模式

当全局为默认auto自动确认模式时，可以通过手动注册 SimpleMessageListenerContainer 容器实现指定单个消费的ack模式

```java
package com.zhengqing.demo.controller;

import cn.hutool.core.date.DateTime;
import com.rabbitmq.client.Channel;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Slf4j
@Api(tags = "测试mq-ack")
@RestController
@RequestMapping("/mq")
public class AckController {

    @Resource
    private RabbitTemplate rabbitTemplate;

    @ApiOperation("手动ACK（指定单个）")
    @PostMapping("ack2")
    public String ack2() {
        String msgContent = "Hello World " + DateTime.now();
        log.info("{} [生产者] 发送消息: {}", DateTime.now(), msgContent);
        this.rabbitTemplate.convertAndSend("test_exchange", "test_ack_manual_routing_key", msgContent);
        return "SUCCESS";
    }

    @Bean
    public SimpleMessageListenerContainer messageListenerContainer(ConnectionFactory connectionFactory) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames("test_ack_manual_queue");
        // 指定ack模式
        container.setAcknowledgeMode(AcknowledgeMode.MANUAL);
        container.setMessageListener((ChannelAwareMessageListener) (message, channel) -> {
            long deliveryTag = message.getMessageProperties().getDeliveryTag();
            log.info("----------------------------------------------");
            log.info("{} [消费者] deliveryTag:{} 接收消息: {}", DateTime.now(), deliveryTag, new String(message.getBody()));
            if (message.getMessageProperties().getHeaders().get("error") == null) {
                channel.basicAck(deliveryTag, false);
            } else {
                channel.basicReject(deliveryTag, false);
            }
        });
        return container;
    }

}
```

#### ACK参数说明

```
// ack正常确认
void basicAck(long deliveryTag, boolean multiple) throws IOException;

// 错误确认
//      basicReject: 只能否定一条消息
//      basicNack: 可以否定一条或者多条消息
void basicReject(long deliveryTag, boolean requeue) throws IOException;
void basicNack(long deliveryTag, boolean multiple, boolean requeue) throws IOException;

// 属性解释
//      deliveryTag：消息的唯一标识符
//      multiple：是否批量确认（如果设置为true，则表示确认所有小于等于deliveryTag的消息）
//      requeue： 是否重新将消息放回队列
//                true -- 允许消息重新排队 （业务中注意一直出现死循环处理，导致消息积压） 
//                false -- 拒绝重新排队消息，丢弃消息
```


# Java

### RedisTemplate

在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，Redis的客户端必须感知这种变化，及时更新连接信息。Spring的RedisTemplate底层利用lettuce实现了节点的感知和自动切换。

#### 1、`pom.xml`中引入依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

#### 2、`application.yml`配置

```yml
spring:
  redis:
    # redis连接密码
    password: 123456
    sentinel:
      master: mymaster
      nodes:
        - 127.0.0.1:26379
        - 127.0.0.1:26380
        - 127.0.0.1:26381
```

#### 3、配置读写分离

```
@Bean
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){
    return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```

这个bean中配置的就是读写策略，包括四种：

- `MASTER`：从主节点读取
- `MASTER_PREFERRED`：优先从master节点读取，master不可用才读取replica
- `REPLICA`：从slave（replica）节点读取
- `REPLICA_PREFERRED`：优先从slave（replica）节点读取，所有的slave都不可用才读取master



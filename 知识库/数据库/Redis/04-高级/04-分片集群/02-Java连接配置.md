# Java

### RedisTemplate访问分片集群

RedisTemplate底层基于lettuce实现了分片集群的支持

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
    # 分片集群配置
    cluster:
      nodes:
        - 127.0.0.1:6381
        - 127.0.0.1:6382
        - 127.0.0.1:6383
        - 127.0.0.1:6384
        - 127.0.0.1:6385
        - 127.0.0.1:6386
    # redis认证密码
    password: 123456
```

#### 3、配置读写分离

```
@Bean
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer() {
    return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```

这个bean中配置的就是读写策略，包括四种：

- `MASTER`：从主节点读取
- `MASTER_PREFERRED`：优先从master节点读取，master不可用才读取replica
- `REPLICA`：从slave（replica）节点读取
- `REPLICA_PREFERRED`：优先从slave（replica）节点读取，所有的slave都不可用才读取master

#### 4、测试类

> tips: 可查看相应日志来判断读写分离等

```java
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Slf4j
@RestController
@RequestMapping("")
@Api(tags = "测试-接口")
public class TestController {

    @Resource
    private StringRedisTemplate redisTemplate;

    @PostMapping("redis")
    @ApiOperation("redis-保存数据")
    public String saveData(String key) {
        this.redisTemplate.opsForValue().set(key, "hello world - reids");
        return "SUCCESS";
    }

    @GetMapping("redis")
    @ApiOperation("redis-获取数据")
    public String getData(String key) {
        String dataStr = this.redisTemplate.opsForValue().get(key);
        log.info("{}", dataStr);
        return dataStr;
    }

}
```
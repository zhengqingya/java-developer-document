# Spring Cloud获取本机IP地址

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-commons</artifactId>
</dependency>


eureka:
  instance:
    prefer-ip-address: true
    instance-id: ${spring.cloud.client.ip-address}:${server.port}

spring:
 cloud:
  nacos:
    discovery:
      service: ${spring.application.name}-${spring.profiles.active}-${spring.cloud.client.ip-address}
      server-addr: 192.168.0.88:10011
      inetutils:
        preferred-networks: 192.
```

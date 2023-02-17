# 动态读取`nacos`远程中的`logback-spring.xml`日志配置

### 1、远程nacos上添加如下配置

#### common.yml

```yml
logging:
  config: http://${spring.cloud.nacos.config.server-addr}/nacos/v1/cs/configs?group=COMMON&tenant=${spring.cloud.nacos.config.namespace}&username=${spring.cloud.nacos.username}&password=${spring.cloud.nacos.password}&dataId=logback-spring.xml
```

#### logback-spring.xml

写自己的配置即可

```xml

```

### 2、本地配置 `bootstrap.yaml`

主要是去加载远程的配置

```shell
spring:
  cloud:
    nacos:
      config:
        # 指定共享配置文件+自动刷新配置
        extension-configs:
          - data-id: common.yml
            group: COMMON
            refresh: true
```

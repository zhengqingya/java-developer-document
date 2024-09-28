# Spring Boot 排除指定配置类

```java
@SpringBootApplication
@ComponentScan(
        basePackages = {"com.zhengqing.common.util.**", "com.zhengqing.common.aspect.**"},
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                value = {MyBatisPlusConfig.class, SqlPrintInterceptor.class})
)
```

# @Configuration

相当于原来的声明了多个bean的xml配置文件，替代xml配置或者已有的Java配置类。

@Configuration提供了两个核心功能：

1. 定义Bean: 使用@Bean注解定义方法并将其标记为Spring Bean。
2. 组合@Bean: 通过依赖注入其他Java类中的@Bean实例来组合Bean。

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    @ConditionalOnMissingBean // 没有这个类型的bean时使用该配置的bean
    public MyBean myBean() {
        return new MyBean();
    }
}
```

默认情况下springboot只会扫描启动类所在的包路径下的配置，在微服务多模块情况下，往往需要扫描相关包
`@ComponentScan(basePackages = {"com.zhengqing"})` 或 使用`spring.factories`进行加载某一配置




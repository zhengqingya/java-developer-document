# spring.factories

作用: 允许开发者声明自己的自动化配置类并将它们注入到 Spring IoC 容器中。

该文件通常被放置在 classpath 下的 META-INF/spring.factories 文件夹中。
Spring Boot 在启动时会扫描这个文件，读取其中定义的自动化配置类，并将它们注入到容器中，以供其他组件使用。
spring.factories 中以 key=value 的形式来声明自动化配置类，
其中 key 表示配置类所实现的类型（通常是接口或抽象类），
value 则是对应的实现类的全限定名。

eg: `META-INF/spring.factories`

```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.zhengqing.config.SwaggerConfig
```

总之，spring.factories 为 Spring Boot 提供了一种强大的扩展机制，可以方便地向系统中添加新的自动化配置类，从而更加灵活和快速地构建出自己的应用程序。


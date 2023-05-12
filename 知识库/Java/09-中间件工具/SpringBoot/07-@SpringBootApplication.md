# @SpringBootApplication

@SpringBootApplication 是 Spring Boot 中的一个注解，它实际上是一个组合注解，包含了以下三个注解：

1. @SpringBootConfiguration：标记该类为配置类；
2. @EnableAutoConfiguration：启用自动配置，将主配置类所在包及其下面所有包的所有注解扫描；
3. @ComponentScan：配置需要扫描的包 / 排除不需要扫描某包

通过使用 @SpringBootApplication 注解，我们可以很方便地开发 Spring Boot 应用程序。

@SpringBootApplication 的作用如下：

1. 标记主类：@SpringBootApplication 通常用于 Spring Boot 应用程序的主类上，它告诉 Spring Boot 这是一个 Spring Boot 应用程序。
2. 开启自动配置：@EnableAutoConfiguration 实际上是一个非常强大的注解，它会根据项目中所引入的依赖来决定应该配置什么。此外，开启自动配置还能让我们少写很多配置代码。
3. 扫描组件：@ComponentScan 用于扫描当前包及其子包下的组件。
   在 Spring Boot 应用程序中，我们可以用 @Component、@Controller、@Service、@Repository 等注解来标记组件

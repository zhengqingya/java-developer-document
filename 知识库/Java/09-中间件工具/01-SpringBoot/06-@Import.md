# @Import

@Import 是 Spring Framework 中的注解之一，它可以用于在配置类中引入其他的配置类或者 Bean。

### 1、导入配置类

```
@Configuration
@Import({MyConfig1.class, MyConfig2.class})
public class AppConfig {
    // ...
}
```

在上面的例子中，@Import 注解被用于导入另外两个配置类 MyConfig1 和 MyConfig2，这样在 AppConfig 中就可以使用这两个配置类声明的
Bean 了。

### 2、导入普通的 Bean

```
@Configuration
public class AppConfig {
 
    @Bean
    public Foo foo() {
        return new Foo();
    }
 
    @Import(FooService.class)
    public static class FooServiceImporter {}
}
```

在上面的例子中，@Import 注解被用于导入一个普通的 Bean FooService，
这个 Bean 可以通过静态内部类 FooServiceImporter 来声明，并且 @Import 注解也要放在这个静态内部类上面。

### 3、导入 ImportSelector

```
@Configuration
@Import(MyImportSelector.class)
public class AppConfig {
    // ...
}
```

在上面的例子中，@Import 注解被用于导入一个实现了 ImportSelector 接口的类 MyImportSelector，
通过 ImportSelector 接口和 @Import 注解可以实现自定义的 Bean 导入逻辑。

---

总的来说，@Import 注解是一个非常灵活的注解，可以用于导入各种类型的配置类、Bean 和 ImportSelector 实现类。


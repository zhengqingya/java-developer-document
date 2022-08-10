# Spring 循环依赖 - 解决方案

1、在你注入bean时，在互相依赖的两个bean上加上@Lazy注解也可以

```java
@Lazy
@Autowired
private IDictTypeService dictTypeService;

@Lazy
@Autowired
private IDictService dictService;
```

2、构造器注入循环依赖实例

```java

@Component
public class CircularDependencyA {

    private CircularDependencyB circB;

    @Autowired
    public CircularDependencyA(CircularDependencyB circB) {
        this.circB = circB;
    }
}
```

3、...

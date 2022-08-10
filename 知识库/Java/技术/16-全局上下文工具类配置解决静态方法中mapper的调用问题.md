# Java - 全局上下文工具类配置 - 解决静态方法中mapper的调用问题

### 第一步： 引入工具类

```java
/**
 *  <p> 全局上下文工具类配置 </p>
 *
 * @description 解决静态方法中mapper的调用
 * @author zhengqing
 * @date 2019/10/17 14:44
 */
@Slf4j
public class ApplicationContextUtil {

    private static ApplicationContext applicationContext;

    public static void setApplicationContext(ApplicationContext ac)
            throws BeansException {
        applicationContext = ac;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    /**
     * 根据Class类型在IOC容器中获取对象
     * @param clazz Class类型
     * @return 对象
     */
    public static <T> List<T> getBeanByType(Class<T> clazz) {
        List<T> list = new ArrayList<T>();

        /* 获取接口的所有实例名 */
        String[] beanNames = applicationContext.getBeanNamesForType(clazz);

        log.debug("getBeanByType beanNames : " + beanNames == null ? "" : Arrays.toString(beanNames));

        if (beanNames == null || beanNames.length == 0) {
            return list;
        }

        T t = null;
        for (String beanName : beanNames) {
            t = (T) applicationContext.getBean(beanName);
            list.add(t);
        }

        return list;
    }

}
```

### 第二步： 在启动类中引入

` ApplicationContextUtil.setApplicationContext(app); `
如下：

```java

@SpringBootApplication
public class App {

    public static void main(String[] args) {
        ApplicationContext app = SpringApplication.run(App.class, args);
        ApplicationContextUtil.setApplicationContext(app);
    }

}
```

> 上面两步可替换为如下类去获取上下文

```java
/**
 * <p>
 * 全局上下文工具类配置
 * </p>
 *
 * @description 解决静态方法中mapper的调用
 * @author zhengqing
 * @date 2019/10/17 14:44
 */
@Slf4j
@Component
public class ApplicationContextUtil implements ApplicationContextAware {
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationContextUtil.applicationContext = applicationContext;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static Object getBean(String beanName) {
        return applicationContext.getBean(beanName);
    }
}
```

### 第三步： 使用

```java
List<Login> logins=ApplicationContextUtil.getApplicationContext().getBean(LoginMapper.class)
        .selectList(new EntityWrapper<Login>()
        .eq("SOURCE",EnumLoginSource.APP登录.getSource()));
```

---

### 解决方法2 - 将@Autowire加到构造方法上

```java

@Component
public class Test {

    private static UserService userService;

    @Autowired
    public Test(UserService userService) {
        Test.userService = userService;
    }

    public static void test() {
        userService.test();
    }
}
```

### 解决方法3 - 用@PostConstruct注解

```java

@Component
public class Test {

    private static UserService userService;

    @Autowired
    private UserService userService2;

    @PostConstruct
    public void beforeInit() {
        userService = userService2;
    }

    public static void test() {
        userService.test();
    }
}
```

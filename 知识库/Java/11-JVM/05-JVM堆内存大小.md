# JVM堆内存大小

> https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gc-ergonomics.html

- 堆内存初始容量为物理内存大小的1/64
- 最大内存不超过物理内存的1/4

```java
public class HelloWorld {

    @Test
    public void test() throws Exception {
        System.err.println(Runtime.getRuntime().totalMemory() / 1024 / 1024 + "MB"); // 366MB
        System.err.println(Runtime.getRuntime().maxMemory() / 1024 / 1024 + "MB"); // 5428MB
    }

}
```

JVM运行参数：`-Xmx100M -Xms100M -XX:+UseG1GC -XX:+PrintGCDetails`

> -XX:+PrintGCDetails =>  打印gc日志信息以进行性能调整和优化

再次运行程序你会发现2个值都为100MB


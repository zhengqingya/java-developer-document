# Caffeine

https://github.com/ben-manes/caffeine/wiki/Home-zh-CN

Caffeine是一个基于Java8开发的提供了近乎最佳命中率的高性能的缓存库。

> 进程本地缓存
>  - 优点：读取本地内存，没有网络开销，速度更快
>  - 缺点：存储容量有限、可靠性较低、无法共享
>  - 场景：性能要求较高，缓存数据量较小

### Caffeine提供了三种缓存驱逐策略：

#### 1、`基于容量`：设置缓存的数量上限

```
// 创建缓存对象
Cache<String, String> cache = Caffeine.newBuilder()
        // 设置缓存大小上限为1
        .maximumSize(1)
        .build();
```

#### 2、`基于时间`：设置缓存的有效时间

```
// 创建缓存对象
Cache<String, String> cache = Caffeine.newBuilder()
        // 设置缓存有效期为3秒，从最后一次写入开始计时
        .expireAfterWrite(Duration.ofSeconds(3))
        .build();
```

#### 3、`基于引用`：设置缓存为软引用或弱引用，利用GC来回收缓存数据。性能较差，不建议使用。

> `注意`：在默认情况下，当一个缓存元素过期的时候，Caffeine不会自动立即将其清理和驱逐。而是在一次读或写操作后，或者在空闲时间完成对失效数据的驱逐。

### 示例

#### 1、`pom.xml`中引用依赖

```xml
<!-- Caffeine是一个基于Java8开发的提供了近乎最佳命中率的高性能的缓存库。 -->
<!-- https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <version>2.9.3</version>
</dependency>
```

#### 2、测试类

```java
package com.zhengqing.demo;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * <p> Caffeine </p>
 *
 * @author zhengqingya
 * @description 文档见： https://github.com/ben-manes/caffeine/wiki/Population-zh-CN
 * @date 2022/10/28 14:02
 */
@Slf4j
public class Java8_Caffeine {

    @Test
    public void test01() throws Exception {
        // 构建cache对象
        Cache<String, Object> cache = Caffeine.newBuilder().build();

        // 存数据
        cache.put("name", "zhengqingya");

        // 取数据
        Object name = cache.getIfPresent("name");
        System.out.println(name);


        // 取数据，如果未命中则查询db
        Object age = cache.get("age", key -> {
            log.info("查db...");
            return 18;
        });
        System.out.println(age);
    }

    @Test
    public void test_maximumSize() throws Exception {
        // 创建缓存对象
        Cache<String, String> cache = Caffeine.newBuilder()
                // 设置缓存大小上限为1
                .maximumSize(1)
                .build();
        // 存数据
        cache.put("name", "zhengqingya");
        cache.put("age", "18");
        TimeUnit.SECONDS.sleep(1);
        // 取数据
        System.out.println(cache.getIfPresent("name"));
        System.out.println(cache.getIfPresent("age"));
    }

    @Test
    public void test_expireAfterWrite() throws Exception {
        // 创建缓存对象
        Cache<String, String> cache = Caffeine.newBuilder()
                // 设置缓存有效期为3秒，从最后一次写入开始计时
                .expireAfterWrite(Duration.ofSeconds(3))
                .build();
        // 存数据
        cache.put("name", "zhengqingya");
        TimeUnit.SECONDS.sleep(3);
        // 取数据
        Object name = cache.getIfPresent("name");
        System.out.println(name);
    }

}
```
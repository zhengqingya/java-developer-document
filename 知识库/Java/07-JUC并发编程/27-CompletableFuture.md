# CompletableFuture

CompletableFuture 是 Java 8 引入的一种用于异步编程和多线程操作的工具类。
其主要作用是简化了异步编程的复杂度，提供了易用、直观的 API 操作。

CompletableFuture 主要有以下几个功能：

1. 异步任务执行：CompletableFuture 可以以非阻塞方式执行一个异步任务，并在完成后返回计算结果。
2. 线程串联、并联：CompletableFuture 提供了一系列链式方法，如 thenApply()、thenAccept()、thenRun()、thenCombine()
   、thenCompose()、thenApplyAsync() 等，用于绑定前后两个异步操作之间的关系，实现流式调用和连接，使得代码可读性和可维护性更高。
3. 异常处理：CompletableFuture 提供了 whenComplete()、exceptionally() 和 handle() 等方法，用于接收异步任务在执行过程中产生的异常，进行异常处理或者恢复操作。
4. 阻塞等待：CompletableFuture 还提供了 get() 方法，用于获取异步任务执行的结果。在等待完成时可以指定超时时间，还可以使用
   join() 方法等待任务执行完成。

总的来说，CompletableFuture 是 Java 并发编程中的优秀实践，为我们提供了一整套优良的 API 操作。
它能够让我们以更加自然、清晰的方式表达异步编程，避免了手写线程池和 Future 代码的繁琐操作，使得多线程编程更加简单、易用、高效。

### 一、初识

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import org.junit.Test;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class TestCompletableFuture1_use {

    @Test // 无返回值
    public void test01() throws Exception {
        CompletableFuture<Void> task = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName()); // ForkJoinPool.commonPool-worker-9
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
        System.out.println(task.get()); // null
    }

    @Test // 指定线程池
    public void test02() throws Exception {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture<Void> task = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName()); // pool-1-thread-1
        }, threadPool);
        System.out.println(task.get()); // null
        threadPool.shutdown();
    }

    @Test // 有返回值
    public void test03() throws Exception {
        CompletableFuture<String> task = CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName()); // ForkJoinPool.commonPool-worker-9
            return "OK";
        });
        // get: 运行时要求抛出异常； join: 不需要
        System.out.println(task.get()); // OK
        System.out.println(task.join()); // OK
    }

    @Test // 异步回调 -- 默认线程池
    public void test04() throws Exception {
        CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return "OK";
        }).whenComplete((result, e) -> {
            if (e == null) {
                System.out.println("正常： " + result); // CompletableFuture默认线程池为守护线程，主线程完后，这里就完了，所以没有正常输出，因此需要等待执行完，或使用自定义线程池
            }
        }).exceptionally(e -> {
            System.out.println("异常： " + e);
            return null;
        });
//        TimeUnit.SECONDS.sleep(3);
    }

    @Test // 异步回调 -- 自定义线程池
    public void test05() throws Exception {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName());
            int a = 1 / 0;
            return "OK";
        }, threadPool).whenComplete((result, e) -> {
            if (e == null) {
                System.out.println("正常： " + result);
            }
        }).exceptionally(e -> {
            System.out.println("异常： " + e);
            return null;
        });
        threadPool.shutdown();
    }

}
```

### 二、使用案例

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.google.common.collect.Lists;
import org.junit.Test;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

public class TestCompletableFuture2_demo {

    @Test // 案例 -- 查询每个平台的xx数据 -- 普通版
    public void test01() throws Exception {
        long start = System.currentTimeMillis();
        List<String> platformList = Lists.newArrayList("天猫", "淘宝", "抖音", "京东", "拼多多");
        List<Integer> result = platformList.stream().map(e -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
            // 模拟返回每个平台的数据
            int value = RandomUtil.randomInt(100);
            System.out.println(StrUtil.format("[{}] go语言书籍： {}元", e, value));
            return value;
        }).collect(Collectors.toList());
        System.out.println(result);
        System.out.println("耗时：" + (System.currentTimeMillis() - start) + "毫秒");
    }

    @Test // 案例 -- 查询每个平台的xx数据 -- 使用CompletableFuture版
    public void test02() throws Exception {
        long start = System.currentTimeMillis();
        List<String> platformList = Lists.newArrayList("天猫", "淘宝", "抖音", "京东", "拼多多");
        List<Integer> result = platformList.stream()
                .map(e -> CompletableFuture.supplyAsync(() -> {
                    try {
                        TimeUnit.SECONDS.sleep(1);
                    } catch (InterruptedException ex) {
                        throw new RuntimeException(ex);
                    }
                    // 模拟返回每个平台的数据
                    int value = RandomUtil.randomInt(100);
                    System.out.println(StrUtil.format("[{}] go语言书籍： {}元", e, value));
                    return value;
                })).collect(Collectors.toList()) // 这一步会得到  List<CompletableFuture<Integer>> collect
                .stream().map(CompletableFuture::join).collect(Collectors.toList());
        System.out.println(result);
        System.out.println("耗时：" + (System.currentTimeMillis() - start) + "毫秒");
    }

}
```

### 三、常用方法

#### 1、获取结果

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import org.junit.Test;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class TestCompletableFuture3_get {

    @Test // CompletableFuture常用方法 -- 拿到结果
    public void test() throws Exception {
        CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return "OK";
        });
//        System.out.println(completableFuture.get()); // 等待拿到结果
//        System.out.println(completableFuture.get(1, TimeUnit.SECONDS)); // 最多等一秒
//        System.out.println(completableFuture.join()); // get: 运行时要求抛出异常； join: 不需要

        TimeUnit.SECONDS.sleep(2);
        System.out.println(completableFuture.getNow("如果没有计算完，就用这里的替代结果..."));
        System.out.println(completableFuture.complete("是否使用替代值，是：返回true 否：false") + "\t" + completableFuture.join());
    }

}
```

#### 2、对计算结果进行处理

##### thenApply：如果有异常会中断任务 & 拿不到计算结果

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestCompletableFuture4_thenApply {

    public static void main(String[] args) {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture.supplyAsync(() -> {
            System.out.println("执行业务1...");
            return 1;
        }, threadPool).thenApply(result -> {
            System.out.println("执行业务2...");
            int a = 1 / 0; // thenApply：如果有异常，任务会中断
            return result + 2;
        }).thenApply(result -> {
            System.out.println("执行业务3...");
            return result + 3;
        }).whenComplete((result, e) -> {
            if (e == null) {
                System.out.println("执行业务最终结果：" + result);
            }
        }).exceptionally(e -> {
            System.out.println("执行业务异常：" + e);
            return null;
        });

        System.out.println(Thread.currentThread().getName() + " 主线程执行完...");
        threadPool.shutdown();
    }

}
```

##### handle：如果有异常也会继续任务 & 拿不到计算结果

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class TestCompletableFuture4_handle {

    public static void main(String[] args) throws Exception {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture.supplyAsync(() -> {
            System.out.println("执行业务1...");
            return 1;
        }, threadPool).handle((result, e) -> {
            System.out.println("执行业务2...");
            int a = 1 / 0; // handle：如果有异常，任务继续
            return result + 2;
        }).handle((result, e) -> {
            System.out.println("执行业务3...");
            return result + 3;
        }).whenComplete((result, e) -> {
            if (e == null) {
                System.out.println("执行业务最终结果：" + result);
            }
        }).exceptionally(e -> {
            System.out.println("执行业务异常：" + e);
            return null;
        });

        System.out.println(Thread.currentThread().getName() + " 主线程执行完...");
        threadPool.shutdown();
    }

}
```

##### 小结

- exceptionally ==> try/catch
- whenComplete & handle ==> try/finally

#### 3、对计算结果进行消费

##### thenAccept、thenRun、thenApply

1. thenRun： 任务A执行完后执行B & B不需要A的结果
2. thenAccept：任务A执行完执行B & B需要A的结果 & 无返回值
3. thenApply： 任务A执行完执行B & B需要A的结果 & 带有返回值

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import org.junit.Test;

import java.util.concurrent.CompletableFuture;

public class TestCompletableFuture5_thenRun_thenAccept_thenApply {

    @Test
    public void test01() throws Exception {
        System.out.println(
                CompletableFuture.supplyAsync(() -> {
                            System.out.println("执行业务...");
                            return 1;
                        }).thenRun(() -> {
                            System.out.println("thenRun...");
                        })
                        .join() // null
        );
    }

    @Test
    public void test02() throws Exception {
        System.out.println(
                CompletableFuture.supplyAsync(() -> {
                            System.out.println("执行业务...");
                            return 1;
                        }).thenAccept(result -> {
                            System.out.println(result); // 1
                        })
                        .join() // null
        );
    }

    @Test
    public void test03() throws Exception {
        System.out.println(
                CompletableFuture.supplyAsync(() -> {
                            System.out.println("执行业务...");
                            return 1;
                        }).thenApply(result -> {
                            System.out.println("thenApply...");
                            return result + " xxx";
                        })
                        .join() // 1 xxx
        );
    }

}
```

#### 4、线程池运行选择

1. 如果没有传入自定义线程池，使用默认线程池 ForkJoinPool.commonPool()
2. 传入自定义线程池
    - 如果执行第一个任务时，传入一个自定义线程池：
        - 调用 thenRun 执行第二个任务时，后面的任务和第一个任务共用共一个线程池
        - 调用 thenRunAsync 执行第二个任务时，第一个任务使用自定义线程池，后面的任务使用 ForkJoinPool 线程池
3. 程序处理太快，系统优化切换原则，直接使用 main 线程处理。eg: 将下面的sleep睡眠去掉，可查看效果

```java
package com.zhengqing.demo.daily.juc.completablefuture;

import lombok.SneakyThrows;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class TestCompletableFuture6_threadPool {

    @SneakyThrows
    public static void main(String[] args) {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("任务1：" + Thread.currentThread().getName()); // pool-1-thread-1
            return 1;
        }, threadPool).thenRun(() -> {
            System.out.println("任务2：" + Thread.currentThread().getName()); // pool-1-thread-1
        }).thenRun(() -> {
            System.out.println("任务3：" + Thread.currentThread().getName()); // pool-1-thread-1
        }).thenRunAsync(() -> {
            System.out.println("任务4：" + Thread.currentThread().getName()); // ForkJoinPool.commonPool-worker-9
        }).thenRun(() -> {
            System.out.println("任务5：" + Thread.currentThread().getName()); // ForkJoinPool.commonPool-worker-9
        });
        threadPool.shutdown();
    }

}
```


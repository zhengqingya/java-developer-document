# FutureTask

FutureTask 是 JDK1.5 引入的一种并发实用工具类，其作用是封装了一个任务的执行结果，并提供了一系列方法来控制任务的运行状态和获取运行结果。

具体来说，FutureTask 实现了 Java 中的 Future 接口和 Runnable 接口，因此既可以作为可运行的线程执行，又可以控制任务的运行状态。
在使用 FutureTask 执行任务时，可以将其作为 Callable 对象或者 Runnable 对象传递给 ExecutorService 线程池对象进行执行，也可以直接调用
run() 函数以线程方式执行。

在 FutureTask 的使用中，主要有以下几个功能：

1. 封装执行结果：FutureTask 可以通过 get() 方法获得正在执行或已完成的任务结果，从而让程序能够方便地异步等待任务的执行结果。
2. 控制任务状态：FutureTask 提供了一些方法如 isDone()、isCancelled()、cancel() 等，用于查询任务是否已经被执行、是否被取消执行等。
3. 缓存执行结果：当多个线程共同使用同一个 FutureTask 时，如果其中一个线程已经开始执行 FutureTask 的 calc()
   方法，其他线程就可以直接使用它的执行结果，而不用再次执行这个任务。

总的来说，FutureTask 为我们提供了一种便捷的异步执行任务的方式，能够充分发挥多线程的并发优势，优化程序性能。

```java
package com.zhengqing.demo.daily.juc;

import lombok.SneakyThrows;

import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

public class TestFutureTask {

    @SneakyThrows
    public static void main(String[] args) {
        FutureTask<String> task = new FutureTask<>(() -> {
            System.out.println("线程：" + Thread.currentThread().getName());
            TimeUnit.SECONDS.sleep(2);
            return "OK";
        });
        Thread t = new Thread(task, "a");
        t.start();
        System.out.println("主线程...");
//        System.out.println("线程执行结果: " + task.get());
//        System.out.println(task.get(1, TimeUnit.SECONDS)); // 等1秒没有拿到结果就抛出异常...
        while (true) {
            if (task.isDone()) {
                System.out.println("线程任务执行结果: " + task.get());
                break;
            } else {
                TimeUnit.MILLISECONDS.sleep(500);
                System.out.println("任务正在处理中，请稍后...");
            }
        }
    }

}
```

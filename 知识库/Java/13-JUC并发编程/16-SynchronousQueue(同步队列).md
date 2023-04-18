# SynchronousQueue(同步队列)

```java
package com.zhengqing.demo.daily.juc.queue;

import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.TimeUnit;

public class TestSynchronousQueue {
    public static void main(String[] args) throws InterruptedException {
        SynchronousQueue<Object> objects = new SynchronousQueue<>();
        new Thread(() -> {
            try {
                objects.put("a");
                System.out.println(Thread.currentThread().getName() + "put a");
                objects.put("b");
                System.out.println(Thread.currentThread().getName() + "put b");
                objects.put("c");
                System.out.println(Thread.currentThread().getName() + "put c");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "T1").start();

        new Thread(() -> {
            try {
                TimeUnit.SECONDS.sleep(3);
                System.out.println(Thread.currentThread().getName() + "->" + objects.take());
                TimeUnit.SECONDS.sleep(3);
                System.out.println(Thread.currentThread().getName() + "->" + objects.take());
                TimeUnit.SECONDS.sleep(3);
                System.out.println(Thread.currentThread().getName() + "->" + objects.take());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "T2").start();
    }
}
```
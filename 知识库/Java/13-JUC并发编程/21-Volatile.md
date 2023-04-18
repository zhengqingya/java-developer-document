# Volatile

volatile是java虚拟机提供的轻量级的同步机制

1. 保证可见性
2. 不保证原子性
3. 禁止指令重排

### 保证可见性

```java
package com.zhengqing.demo.daily.juc.jmm;

import java.util.concurrent.TimeUnit;

public class TestJMM {
    //加入volatile可以保证程序的可见性
    private static volatile boolean flag = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> { //该线程对主内存的变化是不可见的!
            while (flag) {

            }
        }).start();

        System.out.println("停顿!");
        TimeUnit.SECONDS.sleep(1);
        flag = false;
        System.out.println("修改完毕!");
        //这里直接循环卡死!
    }
}
```

### 不保证原子性

原子性:不可分割
线程A在执行任务的时候不能被打扰的,也不能被分割,要么一起成功要么一起失败

```java
package com.zhengqing.demo.daily.juc.jmm;

public class TestJMM02 {

    //volatile不保证原子性
    private volatile static int flag = 0;

    public static void add() {
        flag++;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    add();
                }
            }).start();
        }

        while (Thread.activeCount() > 2) {
            Thread.yield();
        }
        System.out.println(Thread.currentThread().getName() + ":" + flag);
    }
}
```

### 原子类保证原子性

```java
package com.zhengqing.demo.daily.juc.jmm;

import java.util.concurrent.atomic.AtomicInteger;

public class TestJMM03 {

    //volatile不保证原子性
    private volatile static AtomicInteger flag = new AtomicInteger();

    public static void add() {
        flag.getAndIncrement();//进行+1操作
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    add();
                }
            }).start();
        }

        while (Thread.activeCount() > 2) {
            Thread.yield();
        }
        System.out.println(Thread.currentThread().getName() + ":" + flag);
    }
}
```

### 指令重排

什么是指令重排：你写的程序计算机并不是按照你写的程序去执行的！

源代码->编译器优化的重排->指令并行也可能会重排->内存系统也会重排->执行

Volatile则可以避免指令重排

使其加入了内存屏障，作用:

1. 保证特定操作的执行顺序
2. 可以保证某些内存表变量的可见性(利用这些特性Volatile实现了可见性)

![img.png](images/Volatile.png)


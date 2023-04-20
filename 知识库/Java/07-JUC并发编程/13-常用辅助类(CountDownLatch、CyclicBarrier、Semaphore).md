# 常用辅助类(CountDownLatch、CyclicBarrier、Semaphore)

### CountDownLatch

```java
package com.zhengqing.demo.daily.juc;

import java.util.concurrent.CountDownLatch;

//计数器
public class TestCountDownLatch {
    public static void main(String[] args) throws InterruptedException {

        CountDownLatch countDownLatch = new CountDownLatch(6);  // 总数是6
        for (int i = 0; i < 6; i++) {
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "走了");
                countDownLatch.countDown();//表示数量-1
            }, String.valueOf(i)).start();
        }

        countDownLatch.await(); // 等待计数器归零在往下执行!

        System.out.println("关门!");
    }

}
```

原理:当每次有线程调用 countDown()方法则数量减一,假设数量变为0，await()方法就会被唤醒继续执行！

### CyclicBarrier

加法计数器

```java
package com.zhengqing.demo.daily.juc;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

/**
 * 集齐7颗龙珠召唤神龙
 */
public class CyclicBarrierDemo {
    public static void main(String[] args) {
        // 召唤龙珠的线程
        CyclicBarrier cyclicBarrier = new CyclicBarrier(7, () -> System.out.println("召唤神龙成功！"));
        for (int i = 1; i <= 7; i++) {
            final int temp = i;
            // lambda能操作到 i 吗
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "收集" + temp + "个龙珠");
                try {
                    cyclicBarrier.await(); // 等待
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (BrokenBarrierException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

### Semaphore

信号量

```java
package com.zhengqing.demo.daily.juc;

import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

public class TestSemaphore {
    public static void main(String[] args) {
        // 线程数量,停车位,限流的时候会用
        Semaphore semaphore = new Semaphore(3);
        for (int i = 0; i < 8; i++) {
            new Thread(() -> {
                try {
                    semaphore.acquire(); // 得到车位
                    System.out.println(Thread.currentThread().getName() + "得到车位!");
                    TimeUnit.SECONDS.sleep(2);
                    System.out.println(Thread.currentThread().getName() + "停车两秒后离开车位!");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    semaphore.release(); //  释放 离开车位
                }
            }).start();
        }
    }
}
```

原理:使用`acquire()方法获取一个资源,如果没有则等待,release()释放资源则资源+1`

作用:多个共享资源的互斥使用！并发限流,控制最大线程数！


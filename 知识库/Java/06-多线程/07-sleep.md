# sleep

使当前线程暂停执行指定的时间。

```java
package com.zhengqing.demo.daily.thread;

import java.util.concurrent.TimeUnit;

/**
 * <p> 线程sleep测试 </p>
 *
 * @author zhengqingya
 * @description sleep 方法是属于 Thread 类中的，
 * sleep 过程中线程不会释放锁，只会阻塞线程，让出cpu给其他线程，
 * 但是他的监控状态依然保持着，当指定的时间到了又会自动恢复运行状态，可中断，
 * sleep 给其他线程运行机会时不考虑线程的优先级，因此会给低优先级的线程以运行的机会
 * @date 2022/5/16 11:32
 */
public class ThreadSleepTest {

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + " start");
            try {
                TimeUnit.SECONDS.sleep(8);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + " end");
        }, "A").start();

        TimeUnit.SECONDS.sleep(1);

        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + " start");
            for (int i = 0; i < 10; i++) {
                try {
                    TimeUnit.SECONDS.sleep(1);
                    System.out.println(Thread.currentThread().getName() + " ... " + i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(Thread.currentThread().getName() + " end");
        }, "B").start();
    }

}
```
# join

用于暂停当前线程，直到目标线程完成其执行。
当调用该方法时，运行该代码的线程将等待目标线程完成。
如果目标线程已经完成了它的任务，那么join()方法会立即返回。
通常，join方法用于确保在主线程退出之前所有线程都已经完成了运行。

以下是Thread.join()的一些常见用途：

- 在多个线程中运行并需要在所有子线程执行完毕后继续执行其他操作时，将一个或多个线程加入主线程中。
- 当一个线程依赖于另一个线程的输出时，使用 join() 进行同步。
- 如果要添加超时功能以避免无限期阻塞该程序，则可以调用具有超时参数的join() 方法。

```java
package com.zhengqing.demo.daily.thread;

import java.util.concurrent.TimeUnit;

/**
 * <p> 线程join测试 </p>
 *
 * @author zhengqingya
 * @description 等待调用join方法的线程结束之后，程序再继续执行，
 * 一般用于等待异步线程执行完结果之后才能继续运行的场景。
 * join()执行后线程进入阻塞状态,例如在线程B中调用了A的join(),那么线程B会进入阻塞状态,直到线程A结束或者中断线程.
 * @date 2022/5/16 11:41
 */
public class ThreadJoinTest {

    public static void main(String[] args) throws InterruptedException {
        Thread a = new Thread(() -> {
            for (int i = 0; i < 20; i++) {
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                System.out.println(Thread.currentThread().getName() + " == " + i);
            }
        }, "A");
        a.start();


        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                try {
                    TimeUnit.SECONDS.sleep(1);
                    if (i == 3) {
                        a.join();
                    }
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                System.out.println(Thread.currentThread().getName() + " ========== " + i);
            }
        }, "B").start();
    }

}
```

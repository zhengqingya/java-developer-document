# yield

Thread.yield()方法是一个静态方法，它可以使当前线程从运行状态转换到就绪状态，让其他等待运行的线程获得执行的机会。
但是调用yield()并不能保证当前线程会立即从运行状态切换到就绪状态，这取决于线程调度器的实现。

通常情况下，使用yield()方法可以让线程让出一些执行时间，给其他线程更多的执行机会，可以在较为繁忙的系统环境中平衡线程的资源利用率。

```java
package com.zhengqing.demo.daily.thread;

import java.util.concurrent.TimeUnit;

/**
 * <p> yield测试 </p>
 *
 * @author zhengqingya
 * @description 和 sleep 一样都是 Thread 类的方法，
 * 都是暂停当前正在执行的线程对象，不会释放资源锁，
 * 和 sleep 不同的是 yield方法并不会让线程进入阻塞状态，而是让线程重回就绪状态，
 * 它只需要等待重新获取CPU执行时间，所以执行yield()的线程有可能在进入到可执行状态后马上又被执行。
 * 还有一点和 sleep 不同的是 yield 方法只能使同优先级或更高优先级的线程有执行的机会
 * @date 2022/5/16 11:38
 */
public class ThreadYieldTest {

    public static void main(String[] args) {
        new Thread(new MyThread(), "A").start();
        new Thread(new MyThread(), "B").start();
    }

    static class MyThread implements Runnable {
        @Override
        public void run() {
            for (int i = 0; i < 10; i++) {
                System.out.println(Thread.currentThread().getName() + " start " + i);
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                Thread.yield();
                System.out.println(Thread.currentThread().getName() + " end  " + i);
            }
        }
    }
}
```


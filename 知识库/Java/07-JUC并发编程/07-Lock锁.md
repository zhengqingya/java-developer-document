# Lock锁

- 公平锁: 十分公平，必须先来后到，有序执行
- 非公平锁: 十分不公平,可以插队(默认为非公平锁)

一般来说，如果想保证线程执行的公平性，可以使用公平锁；如果追求程序执行的效率，则可以使用非公平锁。

```
package com.zhengqing.demo.daily.juc;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 基本的卖票例子
 * 记住:线程就是一个单独的资源类,没用任何的附属操作！
 */
public class Demo {
    public static void main(String[] args) {
        //多线程操作
        Ticket ticket = new Ticket();

        new Thread(()-> { for (int i = 0; i < 60; i++) ticket.sale(); },"A").start();
        new Thread(()-> { for (int i = 0; i < 60; i++) ticket.sale(); },"B").start();
        new Thread(()-> { for (int i = 0; i < 60; i++) ticket.sale(); },"C").start();
        new Thread(()-> { for (int i = 0; i < 60; i++) ticket.sale(); },"D").start();
    }
}

//资源类
class Ticket {
    private static int number = 50;

    Lock lock = new ReentrantLock();

    //卖票方式
    public void sale() {
        //加锁
        this.lock.lock();
        try {
            if (number > 0) {
                System.out.println(Thread.currentThread().getName() + "购买了第" + (number--) + "张票,剩余票数为" + number);
            }
        } finally {
            //解锁
            this.lock.unlock();
        }
    }

}
```
# synchronized

```
package com.zhengqing.demo.daily.juc;

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

// 资源类
class Ticket {
    private static int number = 50;

    // 卖票方式
    public synchronized void sale() {
        if (number > 0) {
            System.out.println(Thread.currentThread().getName() + "购买了第" + (number--) + "张票,剩余票数为" + number);
        }
    }
}
```


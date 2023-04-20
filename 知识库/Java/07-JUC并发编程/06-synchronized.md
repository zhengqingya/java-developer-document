# synchronized

> https://www.bilibili.com/video/BV18Z4y1P7N4

### 锁的是什么?

锁方法

- 非静态方法 =》 对象锁
- 静态方法 =》 类锁

锁代码块: 锁传入的对象

--- 

### Demo

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

```java
package com.zhengqing.demo.daily.thread;

public class TestSynchronizedBlock {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();
        for (int i = 0; i < 20; i++) {
            new Thread(() -> ticket.sale()).start();
        }
    }

    static class Ticket {
        private static int number = 10;

        public void sale() {
//            Integer num = 1; // 线程安全
//            Integer num = 129; // 超过128 对象地址不一致 => 线程不安全
//            synchronized (num) {
            synchronized (this) { // this 当前调用的对象 ticket => 安全
                if (number > 0) {
                    System.out.println(Thread.currentThread().getName() + "购买了第" + (number--) + "张票,剩余票数为" + number);
                } else {
                    System.out.println(Thread.currentThread().getName() + "没票了...");
                }
            }
        }
    }
}
```

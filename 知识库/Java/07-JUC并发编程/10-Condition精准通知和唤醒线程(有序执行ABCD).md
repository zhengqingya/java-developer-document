# Condition精准通知和唤醒线程(有序执行ABCD)

Condition condition = new ReentrantLock().newCondition();

- condition.await(); 等待
- condition.signal(); 唤醒

> tips:
>   1. 和 `wait`、`notify` 一样需要放在锁内，否则会抛出异常`java.lang.IllegalMonitorStateException`
>   2. 先 `wait()` 再 `signal()`，否则锁死

可以定义多个监视器进行精准通知

```
package com.zhengqing.demo.daily.juc;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class B {
    public static void main(String[] args) {
        Data01 data01 = new Data01();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                data01.printA();
            }
        }, "A").start();

        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                data01.printB();
            }
        }, "B").start();

        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                data01.printC();
            }
        }, "C").start();


        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                data01.printD();
            }
        }, "D").start();
    }

}

class Data01 {
    //可重入锁
    private final Lock lock = new ReentrantLock();
    //监视器
    private final Condition condition1 = this.lock.newCondition();
    private final Condition condition2 = this.lock.newCondition();
    private final Condition condition3 = this.lock.newCondition();
    private final Condition condition4 = this.lock.newCondition();
    //物品数量
    private int count = 0;

    //生产
    public void printA() {
        this.lock.lock();
        try {
            while (this.count != 0) {
                //等待
                this.condition1.await();
            }
            this.count++;
            System.out.println(Thread.currentThread().getName() + "生产物品数量+1物品还剩" + this.count + "个,通知B消费");
            //唤醒B
            this.condition2.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            this.lock.unlock();
        }

    }

    //消费
    public void printB() {
        this.lock.lock();
        try {
            while (this.count <= 0) {
                this.condition2.await();
            }
            this.count--;
            System.out.println(Thread.currentThread().getName() + "消费物品数量-1物品还剩" + this.count + "个，通知C生产");
            //通知C
            this.condition3.signal();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.lock.unlock();
        }
    }

    //生产
    public void printC() {
        try {
            this.lock.lock();
            while (this.count != 0) {
                //等待
                this.condition3.await();
            }
            this.count++;
            System.out.println(Thread.currentThread().getName() + "生产物品数量+1物品还剩" + this.count + "个,通知D消费");
            //唤醒D
            this.condition4.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            this.lock.unlock();
        }
    }

    //消费
    public void printD() {
        this.lock.lock();
        try {
            while (this.count <= 0) {
                this.condition4.await();
            }
            this.count--;
            System.out.println(Thread.currentThread().getName() + "消费物品数量-1物品还剩" + this.count + "个，通知A生产");
            //通知A
            this.condition1.signal();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.lock.unlock();
        }
    }

}
```

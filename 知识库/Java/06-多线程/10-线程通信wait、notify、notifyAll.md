# 线程通信

Object obj = new Object();

- `wait()` 当前线程进入阻塞状态，直到其它线程通知，与sleep不同，会释放锁
- `notify()` 唤醒一个被wait处于等待状态的线程。如果有多个线程被wait，就唤醒优先级高的那个。
- `notifyAll()` 唤醒同一对象上所有被wait的线程，优先级高的线程优先调度

> tips:
>   1. synchronized 内使用
>   2. 先 `wait()` 再 `notify()`，否则锁死

```java
package com.zhengqing.demo.daily.thread;

/**
 * <p> 线程wait测试类 </p>
 *
 * @author zhengqingya
 * @description wait 方法是属于 Object 类中的
 * wait 过程中线程会释放对象锁，只有当其他线程调用 notify 才能唤醒此线程。wait 使用时必须先获取对象锁，
 * 即必须在 synchronized 修饰的代码块中使用，那么相应的 notify 方法同样必须在 synchronized 修饰的代码块中使用，
 * 如果没有在synchronized 修饰的代码块中使用时运行时会抛出异常`java.lang.IllegalMonitorStateException`
 * @date 2022/5/16 11:35
 */
public class ObjectWaitTest {
    private static final Object obj = new Object();

    public static void main(String[] args) {
        Thread t1 = new Thread(new MyThread1());
        Thread t2 = new Thread(new MyThread2());
        t1.start();
        t2.start();
    }

    static class MyThread1 implements Runnable {
        @Override
        public void run() {
            synchronized (obj) {
                System.out.println("thread1 start");
                try {
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("thread1 end");
            }
        }
    }

    static class MyThread2 implements Runnable {
        @Override
        public void run() {
            synchronized (obj) {
                System.out.println("thread2 start");
                obj.notify();
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("thread2 end");
            }
        }
    }
}
``` 


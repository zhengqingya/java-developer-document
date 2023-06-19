# LockSupport

LockSupport是用来创建锁和其他同步类的基本线程阻塞原语；
LockSupport类使用了一种名为Permit(许可)的概念来做到阻塞和唤醒线程的功能,每个线程都有一个许可(permit)
,permit只有两个值1和零,默认是零；
可以把许可看成是一种(0,1)信号量(Semaphore),但与Semaphore不同的是,许可的累加上限是1。

### 等待唤醒机制

#### eg1: Object类

Object obj = new Object();

- `obj.wait();` 等待
- `obj.notify();` 唤醒

> tips:
>   1. synchronized 内使用
>   2. 先 `wait()` 再 `notify()`，否则锁死

#### eg2： Condition接口

Condition condition = new ReentrantLock().newCondition();

- `condition.await();` 等待
- `condition.signal();` 唤醒

> tips:
>   1. 和 `wait`、`notify` 一样需要放在锁内，否则会抛出异常`java.lang.IllegalMonitorStateException`
>   2. 先 `wait()` 再 `signal()`，否则锁死

### LockSupport类使用

- `park()` 阻塞等待，eg: 进入停车场没有许可证
- `unpark(thread)` 唤醒，eg: 放发许可证，允许进入停车场

1. 不需要在锁块内
2. `park` 和 `unpark` 先后顺序不影响
    - 先`park`再`unpark`，相当于进入停车场时，无证，等到拿到证后再进入；
    - 先`unpark`再`park`，相当于先提前发放了一个许可证，进入停车场时，直接持证入场。
3. 许可证只有一个，不会累积，一证一车，多次调用park，会导致阻塞

```java
package com.zhengqing.demo.daily.thread;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.LockSupport;

public class TestLockSupport {
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + ": 进入");
            LockSupport.park();
//            LockSupport.park(); // 阻塞，因为许可证最多为1，上面调用了一次park已经消耗，所以这里没有许可证可用，导致阻塞...
            System.out.println(Thread.currentThread().getName() + ": 唤醒");
        }, "t1");
        t1.start();
        TimeUnit.SECONDS.sleep(1);
        new Thread(() -> {
            LockSupport.unpark(t1);
//            LockSupport.unpark(t1);
            System.out.println(Thread.currentThread().getName() + ": 通知");
        }, "t2").start();
    }
}
// 执行效果：
//    t2: 通知
//    t1: 进入
//    t1: 唤醒
```

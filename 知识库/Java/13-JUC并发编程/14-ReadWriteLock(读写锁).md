# ReadWriteLock(读写锁)

```java
package com.zhengqing.demo.daily.juc;

import java.util.HashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * 小结:
 * 独占锁(写锁):一次只能被一个线程占用
 * 共享锁(读锁):多线程可以同时占有
 * 读-读:可以共存!
 * 读-写:不能共存!
 * 写-写:不能共存!
 */
public class TestReadWriteLock {
    public static void main(String[] args) {
        MyCacheLock myCache = new MyCacheLock();
        //存写的线程
        for (int i = 0; i < 5; i++) {
            int temp = i;
            new Thread(() -> {
                myCache.put(String.valueOf(temp), temp);
            }, String.valueOf(i)).start();
        }

        //读写的线程
        for (int i = 0; i < 5; i++) {
            int temp = i;
            new Thread(() -> {
                myCache.get(String.valueOf(temp));
            }, String.valueOf(i)).start();
        }
    }
}

/**
 * 自定义缓存
 */
class MyCache {
    private volatile HashMap<String, Object> map = new HashMap<>();

    //存写
    public void put(String key, Object value) {
        System.out.println(Thread.currentThread().getName() + "正在写入" + key + ":" + value);
        this.map.put(key, value);
        System.out.println(Thread.currentThread().getName() + "写入完毕");
    }

    //读取
    public void get(String key) {
        System.out.println(Thread.currentThread().getName() + "正在读取" + key);
        Object o = this.map.get(key);
        System.out.println(Thread.currentThread().getName() + "读取完毕");
    }
}

/**
 * 加锁的自定义缓存
 */
class MyCacheLock {
    private volatile HashMap<String, Object> map = new HashMap<>();
    //读写锁,更加细腻度的控制
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    //存写 (存写的时候只希望有一个线程进行)
    public void put(String key, Object value) {
        //上一把写锁
        this.lock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + "正在写入" + key + ":" + value);
            this.map.put(key, value);
            System.out.println(Thread.currentThread().getName() + "写入完毕");
        } finally {
            this.lock.writeLock().unlock();
        }
    }

    //读取 (所有人都可以读)
    public void get(String key) {
        this.lock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + "正在读取" + key);
            Object o = this.map.get(key);
            System.out.println(Thread.currentThread().getName() + "读取完毕");
        } finally {
            this.lock.readLock().unlock();
        }
    }
}
```
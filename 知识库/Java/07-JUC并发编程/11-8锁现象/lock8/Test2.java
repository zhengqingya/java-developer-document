package com.zhengqing.demo.daily.juc.lock8;

import java.util.concurrent.TimeUnit;

/**
 * 2、在sendSms方法延迟了4秒后的情况下，两个线程是先发短信还是先打电话?
 * 先发短信，因为两个方法都是同一个对象所以代表着谁先拿到锁谁就先执行
 */
public class Test2 {
    public static void main(String[] args) throws InterruptedException {
        Phone phone = new Phone();
        new Thread(() -> {
            try {
                phone.sendSms();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "A").start();

        TimeUnit.SECONDS.sleep(1);

        new Thread(() -> phone.call(), "B").start();
    }

    static class Phone {
        //发短信
        public synchronized void sendSms() throws InterruptedException {
            TimeUnit.SECONDS.sleep(4);
            System.out.println("发短信中...");
        }

        //打电话
        public synchronized void call() {
            System.out.println("打电话中...");
        }
    }
}


package com.zhengqing.demo.daily.juc.lock8;

import java.util.concurrent.TimeUnit;

/**
 * 6、增加两个静态同步方法，两个个对象，先发短信还是先打电话?
 * 发短信,因为静态的方法从属于类则锁锁的就是类了,而sendSms短信是最先拿到锁的
 */
public class Test6 {
    public static void main(String[] args) throws InterruptedException {
        //两个对象
        Phone phone = new Phone();
        Phone phone02 = new Phone();

        new Thread(() -> {
            try {
                phone.sendSms();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "A").start();

        TimeUnit.SECONDS.sleep(1);

        new Thread(() -> phone02.call(), "B").start();
    }

    static class Phone {
        //发短信
        public static synchronized void sendSms() throws InterruptedException {
            TimeUnit.SECONDS.sleep(4);
            System.out.println("发短信中...");
        }

        //打电话
        public static synchronized void call() {
            System.out.println("打电话中...");
        }

    }
}


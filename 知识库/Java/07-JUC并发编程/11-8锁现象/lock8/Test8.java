package com.zhengqing.demo.daily.juc.lock8;

import java.util.concurrent.TimeUnit;

/**
 * 8、一个静态同步方法,一个非静态同步方法，两个对象，先发短信还是先打电话?
 * 打电话,因为一个锁的是class一个锁的是对象,但是发短信会延迟4秒而打电话只延迟一秒所以是打电话.
 */
public class Test8 {
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
        public synchronized void call() {
            System.out.println("打电话中...");
        }

    }
}


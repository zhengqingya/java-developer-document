package com.zhengqing.demo.daily.juc.lock8;

import java.util.concurrent.TimeUnit;

/**
 * 4、有两个对象先执行发短信还是打电话?
 * 打电话,因为这里有了两个对象将不在受锁的影响,而sendSms方法中又睡眠的4秒所以是先打电话
 */
public class Test4 {
    public static void main(String[] args) throws InterruptedException {
        //两个对象
        Phone phone = new Phone();
        Phone phone2 = new Phone();
        new Thread(() -> {
            try {
                phone.sendSms();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "A").start();

        TimeUnit.SECONDS.sleep(1);

        new Thread(() -> phone2.call(), "B").start();
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


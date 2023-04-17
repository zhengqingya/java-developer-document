package com.zhengqing.demo.daily.juc.lock8;

import java.util.concurrent.TimeUnit;

/**
 * 3、这里输出发短信还是hello?
 * hello 因为着hello这个方法并没有上锁，且发短信的方法以及拉到了锁但是需要睡眠4秒所以是hello
 */
public class Test3 {
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

        new Thread(() -> phone.hello(), "B").start();
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

        public void hello() {
            System.out.println("hello");
        }

    }
}


package com.zhengqing.demo.daily.juc.lock8;

import java.util.concurrent.TimeUnit;

/**
 * 1、在标准情况下，两个线程是先发短信还是先打电话?
 * 先发短信
 */
public class Test1 {
    public static void main(String[] args) throws InterruptedException {
        Phone phone = new Phone();
        new Thread(() -> phone.sendSms(), "A").start();

        TimeUnit.SECONDS.sleep(1);

        new Thread(() -> phone.call(), "B").start();
    }

    static class Phone {
        //发短信
        public synchronized void sendSms() {
            System.out.println("发短信中...");
        }

        //打电话
        public synchronized void call() {
            System.out.println("打电话中...");
        }
    }
}


# BlockingQueue(阻塞队列)

```java
package com.zhengqing.demo.daily.juc.queue;

import org.junit.Test;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;

public class TestBlockingQueue {


    @Test // 会抛出异常
    public void test1() {
        ArrayBlockingQueue<Object> objects = new ArrayBlockingQueue<>(3);
        System.out.println(objects.add("a"));
        System.out.println(objects.add("b"));
        System.out.println(objects.add("c"));
        //IllegalStateException: Queue full(队列已满异常!)
        //System.out.println(objects.add("d"));

        System.out.println("===================");

        System.out.println(objects.remove());
        System.out.println(objects.remove());
        System.out.println(objects.remove());
        //NoSuchElementException(队列为空异常!)
        //System.out.println(objects.remove());
    }

    @Test // 有返回值.不抛出异常
    public void test2() {
        ArrayBlockingQueue<Object> objects = new ArrayBlockingQueue<>(3);
        System.out.println(objects.offer("a"));
        System.out.println(objects.offer("b"));
        System.out.println(objects.offer("c"));
        System.out.println(objects.offer("d"));//false
        System.out.println("===================");
        System.out.println(objects.poll());
        System.out.println(objects.poll());
        System.out.println(objects.poll());
        System.out.println(objects.poll());//null
    }

    @Test // 等待,阻塞(一直阻塞)
    public void test3() throws Exception {
        ArrayBlockingQueue<Object> arrayBlockingQueue = new ArrayBlockingQueue<>(3);
        arrayBlockingQueue.put("a");
        arrayBlockingQueue.put("b");
        arrayBlockingQueue.put("c");
        //arrayBlockingQueue.put("d");//队列没有位置了则会等待

        System.out.println(arrayBlockingQueue.take());
        System.out.println(arrayBlockingQueue.take());
        System.out.println(arrayBlockingQueue.take());
        //System.out.println(arrayBlockingQueue.take()); //队列没有元素了则会等待
    }

    @Test //超时等待
    public void test4() throws Exception {
        ArrayBlockingQueue<Object> arrayBlockingQueue = new ArrayBlockingQueue<>(3);
        System.out.println(arrayBlockingQueue.offer("a"));
        System.out.println(arrayBlockingQueue.offer("b"));
        System.out.println(arrayBlockingQueue.offer("c"));
        System.out.println(arrayBlockingQueue.offer("d", 2, TimeUnit.SECONDS));//等待超过两秒就退出
        System.out.println("===================");
        System.out.println(arrayBlockingQueue.poll());
        System.out.println(arrayBlockingQueue.poll());
        System.out.println(arrayBlockingQueue.poll());
        System.out.println(arrayBlockingQueue.poll(2, TimeUnit.SECONDS));//等待超过两秒就退出
    }

}
```
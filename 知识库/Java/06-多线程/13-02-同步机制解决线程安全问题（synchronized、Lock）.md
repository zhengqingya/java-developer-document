# 同步机制 解决线程安全问题

### synchronized

锁方法

- 非静态方法 =》 对象锁
- 静态方法 =》 类锁

锁代码块: 锁传入的对象

#### synchronized 锁方法

synchronized修饰一个方法时，这个方法叫同步方法

```java
public class TestTicket implements Runnable {
    private int ticketNum = 10;

    @Override
    public synchronized void run() {
        while (true) {
            if (this.ticketNum <= 0) {
                break;
            }
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + " 获得 " + this.ticketNum--);
        }
    }

    public static void main(String[] args) {
        TestTicket ticket = new TestTicket();

        new Thread(ticket, "售票口A").start();
        new Thread(ticket, "售票口B").start();
        new Thread(ticket, "售票口C").start();
    }

}
```

#### synchronized 锁代码块

synchronized修饰一个代码块时，这个方法叫同步代码块

```java
public class TestArrayList {
    public static void main(String[] args) throws InterruptedException {
        List<String> list = new ArrayList<>();
        for (int i = 1; i <= 20000; i++) {
            new Thread(() -> {
                synchronized (list) {
                    list.add(Thread.currentThread().getName());
                }
            }).start();
        }

        TimeUnit.SECONDS.sleep(5);
        System.out.println(list.size());
    }
}
```

### Lock

```java
import java.util.concurrent.locks.ReentrantLock;

public class TestTicketLock implements Runnable {
    private int ticketNum = 10;

    private final ReentrantLock lock = new ReentrantLock();

    @Override
    public void run() {
        while (true) {
            this.lock.lock();
            try {
                if (this.ticketNum <= 0) {
                    break;
                }
                Thread.sleep(100);
                System.out.println(Thread.currentThread().getName() + " 获得 " + this.ticketNum--);
            } catch (Exception e) {
                throw new RuntimeException(e);
            } finally {
                this.lock.unlock();
            }
        }
    }

    public static void main(String[] args) {
        TestTicketLock ticket = new TestTicketLock();

        new Thread(ticket, "售票口A").start();
        new Thread(ticket, "售票口B").start();
        new Thread(ticket, "售票口C").start();
    }

}
```
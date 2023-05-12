### cpu过高

```shell
# 查看所有线程
thread

# 查看指定线程
thread 1
thread 1 | grep 'main('

# 查看cpu使用率高的前3个线程
thread -n 3
```

![thread.png](images/thread.png)

![thread.png](images/thread-id.png)

### 线程状态

1. `RUNNABLE` 运行中
2. `TIMED_WAITIN` 调用了以下方法的线程
    - Thread#sleep()
    - Object#wait () 并加了超时参数
    - Thread#join () 并加了超时参数
    - LockSupport#parkNanos()
    - LockSupport#parkUntil()
2. `WAITING` 当线程调用以下方法
    - Object#wait () 而且不加超时参数
    - Thread#join () 而且不加超时参数
    - LockSupport#park()
3. `BLOCKED` 阻塞，等待锁
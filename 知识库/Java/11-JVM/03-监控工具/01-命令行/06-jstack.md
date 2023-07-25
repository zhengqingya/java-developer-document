# jstack：打印 JVM 中线程快照

jstack（JVM Stack Trace）：用于生成虚拟机指定进程当前时刻的线程快照（虚拟机堆栈跟踪）。线程快照就是当前虚拟机内指定进程的每一条线程正在执行的方法堆栈的集合。

生成线程快照的作用：可用于定位线程出现长时间停顿的原因，如线程间死锁、死循环、请求外部资源导致的长时间等待等问题。这些都是导致线程长时间停顿的常见原因。当线程出现停顿时，就可以用
jstack 显示各个线程调用的堆栈情况。

官方帮助文档：https://docs.oracle.com/en/java/javase/11/tools/jstack.html

在 thread dump 中，要留意下面几种状态

- <mark>死锁，Deadlock（重点关注）</mark>
- <mark>等待资源，Waiting on condition（重点关注）</mark>
- <mark>等待获取监视器，Waiting on monitor entry（重点关注）</mark>
- <mark>阻塞，Blocked（重点关注）</mark>
- 执行中，Runnable
- 暂停，Suspended
- 对象等待中，Object.wait() 或 TIMED＿WAITING
- 停止，Parked

```shell
jstack [options] pid
```

| option 参数 | 作用                       |
|:----------|:-------------------------|
| -F        | 当正常输出的请求不被响应时，强制输出线程堆栈   |
| -l        | 除堆栈外，显示关于锁的附加信息          |
| -m        | 如果调用本地方法的话，可以显示 C/C++的堆栈 |

# wait和sleep区别

### 1、来自不同的类

- wait => Object
- sleep => Thread一般情况企业中使用休眠是：

```
TimeUnit.DAYS.sleep(1); //休眠1天
TimeUnit.SECONDS.sleep(1); //休眠1s
```

### 2、关于锁的释放

- wait 释放锁睡
- sleep 抱着锁睡

### 3、使用的范围是不同的

- wait 必须在同步代码块中
- sleep 可以在任何地方睡


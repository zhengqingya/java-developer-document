### trace

> 跟踪一级方法的调用链路。

```shell
# 当我们怀疑某一个方法有问题的时候，跟踪它的时间
# trace 全限定名 方法名
trace com.zhengqing.demo.api.TestController time

# 只跟踪执行耗时超过2000ms的结果
trace com.zhengqing.demo.api.TestController time '#cost>2000'
```

![trace.png](images/trace.png)

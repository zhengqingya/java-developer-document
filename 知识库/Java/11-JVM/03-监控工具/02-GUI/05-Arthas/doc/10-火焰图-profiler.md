### profiler

生成火焰图

```shell
# 查看profiler支持的events
profiler list

# 开始记录火焰图 -- tips: 默认情况下，生成的是 cpu 的火焰图，即 event 为cpu。可以用--event参数来指定。
profiler start

# 查看状态
profiler status

# 查看当前采样数
profiler getSamples

# 结束记录火焰图
profiler stop
```

![profiler.png](images/profiler.png)
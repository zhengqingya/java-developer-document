# JVM实战参数

```shell
-Xmx100M -Xms100M \  # ☆ 最小堆、最大堆 (2个设置相等即可) 如果出现频繁的full gc，则可以适当扩大该值，避免内存不足导致频繁的gc操作。
-XX:+UseG1GC \  # ☆ 使用G1垃圾回收器，它具有更好的分代收集策略和回收效率，适用于较大的堆内存环境下。
-XX:+HeapDumpOnOutOfMemoryError \  # ☆ jvm出现oom时dump出当前内存中的信息以支持后续的内存分析。也就是在线上环境蹦的时候自动导出堆dump文件 `dump.hprof`
-XX:HeapDumpPath=./dump.hprof \  # 导出堆dump文件路径，如果没有指定文件名，生成的文件格式为 `java_pid62696.hprof`，这里指定后为 `dump.hprof` （ tips: 需要保证目录文件夹存在，同一个pid程序的多次oom生成同一个文件 ）
-XX:MaxGCPauseMillis=200 \  # 控制每次gc操作的最大暂停时间（单位：毫秒），也就是在执行回收时，应该尽量控制一次gc暂停的时间不超过该值。这个值设置得越小，就越容易触发回收，也就意味着更频繁地进行gc操作；相反，如果将此值设置得太大，则可能会导致gc暂停时间变长，甚至会出现"stop the world"的情况。
-XX:+PrintGCDetails \  # 打印gc日志信息以进行性能调整和优化。
```

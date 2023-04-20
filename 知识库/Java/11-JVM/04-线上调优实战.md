# JVM线上调优实战

```shell script
# 查看当前程序启动时的jvm参数
java -XX:+PrintCommandLineFlags -version
# -XX:InitialHeapSize=523137920 -XX:MaxHeapSize=8370206720 -XX:+PrintCommandLineFlags -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseParallelGC 
# openjdk version "1.8.0_322"
# OpenJDK Runtime Environment (build 1.8.0_322-b06)
# OpenJDK 64-Bit Server VM (build 25.322-b06, mixed mode)

java -XX:+Print
# 查看jvm初始参数值
java -XX:+PrintFlagsInitial -version
# 查看jvm最终参数值
java -XX:+PrintFlagsFinal -version

# 查看这些参数一共有多少种
java -XX:+PrintFlagsInitial -version | wc -l
java -XX:+PrintFlagsFinal -version | wc -l
```

---

###### jvm参数设置

```shell script
java -Xms500M -Xmx500M \  # 最小堆、最大堆 (2个设置相等即可)
     -XX:+UseG1GC -XX:MaxGCPauseMillis=200 \  # 使用G1垃圾回收器
     -Xloggc:/opt/xxx/logs/xxx-xxx-gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCCause \  # 设置日志参数（5个20M文件，循环）
     -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/dump.hprof \  # 线上环境蹦的时候自动导出堆dump文件 `dump.hprof`
     -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=50001 \
     -jar \
     -Ddefault.client.encoding="UTF-8" -Dfile.encoding="UTF-8" -Duser.language="Zh" -Duser.region="CN" \
     app.jar \
     --spring.profiles.active=prod
```

---

## 模拟实战

```shell script
#   最小堆：30M 最大堆：30M  打印gc日志信息 
java -Xms30M -Xmx30M -XX:+PrintGC com.mashibing.jvm.gc.T15_FullGC_Problem01


# 查看当前所有java进程号pid
jps

# 实时显示系统中各个进程的资源占用状况，类似于Windows的任务管理器
top

# 显示指定进程信息
jinfo pid

# 显示堆内存信息
jstat -gc pid

# 动态显示 - 每1秒钟刷新一次
jstat -gc pid 1000

# 显示指定进程的所有线程  （一般用来查看是否存在死锁）
#                       ex: waiting on <0x0000000088ca3310> (a java.lang.Object)
#                            假如有一个进程中100个线程，很多线程都在waiting on <xx> ，一定要找到是哪个线程持有这把锁
#                            怎么找？搜索jstack dump的信息，找<xx> ，看哪个线程持有这把锁RUNNABLE
jstack pid    # 一次性全部显示
jstack pid | more  # 通过回车查看更多信息

# 查看指定进程前10行对象数据（内存分配的详细情况。例如实例个数，大小等）
jmap -histo pid | head -10
```

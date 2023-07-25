# jmap：导出内存映像文件&内存使用情况

jmap（JVM Memory Map）：作用一方面是获取 dump 文件（堆转储快照文件，二进制文件），它还可以获取目标 Java 进程的内存相关信息，包括
Java 堆各区域的使用情况、堆中对象的统计信息、类加载信息等。开发人员可以在控制台中输入命令“jmap -help”查阅 jmap
工具的具体使用方式和一些标准选项配置。

官方帮助文档：https://docs.oracle.com/en/java/javase/11/tools/jmap.html

基本使用语法为：

- `jmap [option] <pid>`
- `jmap [option] <executable <core>`
- `jmap [option] [server_id@] <remote server IP or hostname>`

| 选项             | 作用                                                                 |
|:---------------|:-------------------------------------------------------------------|
| -dump          | 生成 dump 文件（Java 堆转储快照），-dump:live 只保存堆中的存活对象                       |
| -heap          | 输出整个堆空间的详细信息，包括 GC 的使用、堆配置信息，以及内存的使用信息等                            |
| -histo         | 输出堆空间中对象的统计信息，包括类、实例数量和合计容量，-histo:live 只统计堆中的存活对象                 |
| -J <flag>      | 传递参数给 jmap 启动的 jvm                                                 |
| -finalizerinfo | 显示在 F-Queue 中等待 Finalizer 线程执行 finalize 方法的对象，仅 linux/solaris 平台有效 |
| -permstat      | 以 ClassLoader 为统计口径输出永久代的内存状态信息，仅 linux/solaris 平台有效               |
| -F             | 当虚拟机进程对-dump 选项没有任何响应时，强制执行生成 dump 文件，仅 linux/solaris 平台有效         |

说明：这些参数和 linux 下输入显示的命令多少会有不同，包括也受 jdk 版本的影响。

```shell
jmap -dump:format=b,file=<filename.hprof> <pid>> jmap -dump:live,format=b,file=<filename.hprof> <pid>
```

由于 jmap 将访问堆中的所有对象，为了保证在此过程中不被应用线程干扰，jmap 需要借助安全点机制，让所有线程停留在不改变堆中数据的状态。
也就是说，由 jmap 导出的堆快照必定是安全点位置的。这可能导致基于该堆快照的分析结果存在偏差。

举个例子，假设在编译生成的机器码中，某些对象的生命周期在两个安全点之间，那么:live 选项将无法探知到这些对象。

另外，如果某个线程长时间无法跑到安全点，jmap 将一直等下去。
与前面讲的 jstat 则不同，垃圾回收器会主动将 jstat 所需要的摘要数据保存至固定位置之中，而 jstat 只需直接读取即可。

---

```shell
# 查看java进程
jps -l
# 查看堆内存占用情况
jmap -heap pid
```

```shell
C:\Users\zhengqingya>jps -l
25460 finalshell.jar
68112 com.zhengqing.demo.daily.jvm.TestJmap

C:\Users\zhengqingya>jmap -heap 68112
Attaching to process ID 68112, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.291-b10

using thread-local object allocation.
Garbage-First (G1) GC with 13 thread(s)

Heap Configuration:
   MinHeapFreeRatio         = 40
   MaxHeapFreeRatio         = 70
   MaxHeapSize              = 10485760000 (10000.0MB)
   NewSize                  = 1363144 (1.2999954223632812MB)
   MaxNewSize               = 6291456000 (6000.0MB)
   OldSize                  = 5452592 (5.1999969482421875MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 4194304 (4.0MB)

Heap Usage:
G1 Heap:
   regions  = 2500
   capacity = 10485760000 (10000.0MB)
   used     = 60817424 (58.00001525878906MB)
   free     = 10424942576 (9941.999984741211MB)
   0.5800001525878906% used
G1 Young Generation:
Eden Space:
   regions  = 3
   capacity = 553648128 (528.0MB)
   used     = 12582912 (12.0MB)
   free     = 541065216 (516.0MB)
   2.272727272727273% used
Survivor Space:
   regions  = 0
   capacity = 0 (0.0MB)
   used     = 0 (0.0MB)
   free     = 0 (0.0MB)
   0.0% used
G1 Old Generation:
   regions  = 13
   capacity = 9932111872 (9472.0MB)
   used     = 48234512 (46.00001525878906MB)
   free     = 9883877360 (9425.999984741211MB)
   0.48564205298552643% used

2210 interned Strings occupying 204280 bytes.

C:\Users\zhengqingya>
```


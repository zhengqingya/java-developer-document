# jmap 命令行工具

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
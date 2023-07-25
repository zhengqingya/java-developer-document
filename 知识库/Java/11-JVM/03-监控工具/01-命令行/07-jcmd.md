# jcmd：多功能命令行

在 JDK 1.7 以后，新增了一个命令行工具 jcmd。它是一个多功能的工具，可以用来实现前面除了 jstat 之外所有命令的功能。
比如：用它来导出堆、内存使用、查看 Java 进程、导出线程信息、执行 GC、JVM 运行时间等。

官方帮助文档：https://docs.oracle.com/en/java/javase/11/tools/jcmd.html

jcmd 拥有 jmap 的大部分功能，并且在 Oracle 的官方网站上也推荐使用 jcmd 命令代 jmap 命令

```shell
# 列出所有的 JVM 进程
jcmd -l
# 针对指定的进程，列出支持的所有具体命令
jcmd 进程号 help
```

`jcmd 进程号 具体命令`：显示指定进程的指令命令的数据

- Thread.print 可以替换 jstack 指令
- GC.class_histogram 可以替换 jmap 中的-histo 操作
- GC.heap_dump 可以替换 jmap 中的-dump 操作
- GC.run 可以查看 GC 的执行情况
- VM.uptime 可以查看程序的总执行时间，可以替换 jstat 指令中的-t 操作
- VM.system_properties 可以替换 jinfo -sysprops 进程 id
- VM.flags 可以获取 JVM 的配置参数信息

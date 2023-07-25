# jhat：JDK 自带堆分析工具

jhat(JVM Heap Analysis Tool)：Sun JDK 提供的 jhat 命令与 jmap 命令搭配使用，用于分析 jmap 生成的 heap dump 文件（堆转储快照）。
jhat 内置了一个微型的 HTTP/HTML 服务器，生成 dump 文件的分析结果后，用户可以在浏览器中查看分析结果（分析虚拟机转储快照信息）。

使用了 jhat 命令，就启动了一个 http 服务，端口是 7000，即 http://localhost:7000 ，就可以在浏览器里分析。

说明：jhat 命令在 JDK9、JDK10 中已经被删除，官方建议用 VisualVM 代替。

基本适用语法：`jhat <option> <dumpfile>`

| option 参数              | 作用                               |
|:-----------------------|:---------------------------------|
| -stack false ｜ true    | 关闭｜打开对象分配调用栈跟踪                   |
| -refs false ｜ true     | 关闭｜打开对象引用跟踪                      |
| -port port-number      | 设置 jhat HTTP Server 的端口号，默认 7000 |
| -exclude exclude-file  | 执行对象查询时需要排除的数据成员                 |
| -baseline exclude-file | 指定一个基准堆转储                        |
| -debug int             | 设置 debug 级别                      |
| -version               | 启动后显示版本信息就退出                     |
| -J <flag>              | 传入启动参数，比如-J-Xmx512m              |

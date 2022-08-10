# JVM调优

```shell
# 查看当前所用的GC回收器,并根据自己需求选择使用合适的GC回收器
java -XX:+PrintCommandLineFlags -version

# 如果你不想用ParallelGC,你可以通过启动jar包时添加参数改变GC回收器类型:
# 使用SerialGC添加参数:       -XX:+UseSerialGC
# 使用ParallelGC添加参数:     -XX:+UseParallelGC 
# 使用CMSGC添加参数:          -XX:+UseConcMarkSweepGC
# 使用G1GC添加参数:           -XX:+UseG1GC
# ex： 
java -XX:+UseG1GC app.jar

# 开启GC日志,将GC日志导出到指定文件夹下,以便之后利用工具分析和参考
#上面的`/tmp`是我自己指定的路径,可以灵活指定,命名也是可以随便取的,只要后缀为.log即可
java -XX:+UseG1GC app.jar -Xloggc:/tmp/gc.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps

# 虚拟机参数:
# -XX:+PrintGC         每次触发GC的时候打印相关日志
# -XX:+PrintGCDetails  打印GC日志详情
# -Xms                 堆初始值
# -Xmx                 堆最大可用值
# -XX:+PrintGCTimeStamps  打印GC时间戳
# -Xloggc: ./gc.log：表示在当前目录下生成gc.log文件
 
 
 
# 最后,说一下最为简单粗暴的方式,如果你使用的是jdk1.8及以上版本,又不想花时间精力在Jvm调优上,又想得到比较好的性能表现,不妨将你项目的垃圾回收器换成GC1,只需要指定合理的暂停时间,(太苛刻的话会增加GC次数,降低cpu效率)剩下的交给Jvm自己去做就是了,官方建议:
# G1GC是后来才出现的垃圾回收器,出现的目的是为了代替CMSGC回收器,且已在JDK1.9中一统天下,于是我就想试试看G1GC的性能,把原来的ParalleGC切换成了G1GC,然后简单的设置了最大堆大小和最大暂停时间200毫秒:
java -jar -XX:+UseG1GC -XX:MaxGCPauseMillis=200 app.jar
java -jar -Xms256m -Xmx512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 app.jar
nohup java -jar -Xms256m -Xmx512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -Xloggc:/tmp/app-gc.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps  app.jar &
```


### jvm监控工具

> 两款均放在你jdk的安装目录下的bin文件夹里
1. jvisualvm （功能更强大）
2. Jconsole

```shell
jstack    查看jvm线程运行状态,是否有死锁现象等等信息
jmap      打印出某个java进程(使用pid) 内存内的所有'对象'的情况  如:产生那些对象,及其数量
jinfo     可以输出并修改运行时的java 进程的opts
jconsole  一个java GUI监视工具,可以以图表化的形式显示各种数据,并可通过远程连接监视远程的服务器VM 
jps       与unix上的ps类似,用来显示本地的java进程,可以查看本地运行着几个java程序,并显示他们的进程号 
jstat     一个极强的监视VM内存工具,可以用来监视VM内存内的各种堆和非堆的大小及其内存使用量 

# 详细：在使用这些工具前,先用JPS命令获取当前的每个JVM进程号,然后选择要查看的JVM 

# jstat 工具特别强大,有众多的可选项,详细查看堆内各个部分的使用量,以及加载类的数量, 使用时,需加上查看进程的进程id,和所选参数 以下详细介绍各个参数的意义 
jstat -class pid               显示加载class的数量,及所占空间等信息 
jstat -compiler pid            显示VM实时编译的数量等信息 
jstat -gc pid                  显示gc的信息,查看gc的次数,及时间, 其中最后五项,分别是young gc的次数,young gc的时间,full gc的次数,full gc的时间,gc的总时间 
jstat -gccapacity              显示,VM内存中三代（young,old,perm）对象的使用和占用大小,如：PGCMN显示的是最小perm的内存使用量,PGCMX显示的是perm的内存最大使用量,PGC是当前新生成的perm内存占用量,PC是但前perm内存占用量, 其他的可以根据这个类推, OC是old内纯的占用量 
jstat -gcnew pid               new对象的信息 
jstat -gcnewcapacity pid       new对象的信息及其占用量 
jstat -gcold pid               old对象的信息 
jstat -gcoldcapacity pid       old对象的信息及其占用量 
jstat -gcpermcapacity pid      perm对象的信息及其占用量 
jstat -util pid                统计gc信息统计 
jstat -printcompilation pid    当前VM执行的信息 

# 除了以上一个参数外,还可以同时加上 两个数字,如：jstat -printcompilation 3024 250 6是每250毫秒打印一次,一共打印6次,还可以加上-h3每三行显示一下标题 

# jmap是一个可以输出所有内存中对象的工具,甚至可以将VM 中的heap,以二进制输出成文本 
# 命令:
jmap -dump:format=b,file=heap.bin <pid>

# file：保存路径及文件名 
# pid：进程编号 
# jmap -histo:live  pid| less :堆中活动的对象以及大小 
# jmap -heap pid : 查看堆的使用状况信息 


jinfo:的用处比较简单,就是能输出并修改运行时的java进程的运行参数, 用法是jinfo -opt pid 如：查看2788的MaxPerm大小可以用 jinfo -flag MaxPermSize 2788 

jconsole是一个用java写的GUI程序,用来监控VM,并可监控远程的VM,非常易用,而且功能非常强, 使用方法：命令行里打 jconsole,选则进程就可以了 
JConsole中关于内存分区的说明 
Eden Space (heap)                  内存最初从这个线程池分配给大部分对象 
Survivor Space (heap)              用于保存在eden space内存池中经过垃圾回收后没有被回收的对象 
Tenured Generation (heap)          用于保持已经在 survivor space内存池中存在了一段时间的对象 
Permanent Generation (non-heap)    保存虚拟机自己的静态(refective)数据,例如类（class）和方法（method）对象, Java虚拟机共享这些类数据, 这个区域被分割为只读的和只写的, 
Code Cache (non-heap)              HotSpot Java虚拟机包括一个用于编译和保存本地代码（native code）的内存,叫做“代码缓存区”（code cache） 

# jstack ( 查看jvm线程运行状态,是否有死锁现象等等信息) : jstack pid : thread dump 
jstat -gcutil pid 1000 100 : 1000ms统计一次gc情况统计100次
```

如果需要连接监控你远程服务器上的java项目的话,可以在java启动时指定参数:
```shell
# 其中端口号你可以随意指定,然后jdk安装目录根据你自己服务器的安装目录作修改,修改后启动项目
java -Djava.rmi.server.hostname=192.168.174.128 -Dcom.sun.management.jmxremote.port=12345 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false  -Dcom.sun.management.jmxremote.access.file=/usr/local/java/jdk1.8.0_172/jre/lib/management/jmxremote.access -Dcom.sun.management.jmxremote.password.file=/usr/local/java/jdk1.8.0_172/jre/lib/management/jmxremote.password -jar server-0.0.1-SNAPSHOT.jar
```




### GC垃圾回收日志分析工具

1. [GCeasy](http://gceasy.io/)
2. [gcviewer](https://github.com/chewiebug/gcviewer/wiki)

不管是使用工具1还是工具2,都需要按其格式要求导出GC日志,否则无法识别,我直接给出一条万金油,两个工具都可以识别的日志输出命令:
```shell
nohup java -jar -Xloggc:/tmp/gc.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps  outp.jar &
#具体的存放目录`/tmp`你可以随意指定,你自己找得到就行,gc.log命名也可以随便取,后缀.log不要变
```

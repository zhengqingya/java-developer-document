# jinfo：实时查看和修改 JVM 配置参数

jinfo(Configuration Info for Java)：查看虚拟机配置参数信息，也可用于调整虚拟机的配置参数。
在很多情况卡，Java 应用程序不会指定所有的 Java 虚拟机参数。
而此时，开发人员可能不知道某一个具体的 Java 虚拟机参数的默认值。
在这种情况下，可能需要通过查找文档获取某个参数的默认值。这个查找过程可能是非常艰难的。
但有了 jinfo 工具，开发人员可以很方便地找到 Java 虚拟机参数的当前值。

基本使用语法为：`jinfo [options] pid`

| 选项               | 选项说明                                        |
|------------------|---------------------------------------------|
| no option        | 输出全部的参数和系统属性                                |
| -flag name       | 输出对应名称的参数                                   |
| -flag [+-]name   | 开启或者关闭对应名称的参数 只有被标记为 manageable 的参数才可以被动态修改 |
| -flag name=value | 设定对应名称的参数                                   |
| -flags           | 输出全部的参数                                     |
| -sysprops        | 输出系统属性                                      |

查看运行中可以动态修改的参数，注意：并不是所有参数都能在运行中动态修改

```shell
java -XX:+PrintFlagsFinal -version | grep manageable
```

命令示例：

```shell
jps -l
jinfo -sysprops
jinfo -flags 14976
jinfo -flag UseG1GC 14976
jinfo -flag +UseG1GC 14976
jinfo -flag UseG1GC 14976
jinfo -flag -PrintGCDetails 14976
jinfo -flag PrintGCDetails 14976
```

执行日志：

```shell
C:\Users\zhengqingya>jps -l
14976 com.zhengqing.demo.daily.jvm.gc.TestJvm
33188 finalshell.jar
34296 org.jetbrains.jps.cmdline.Launcher
40136 org/netbeans/Main
34764 sun.tools.jps.Jps
41708 org.jetbrains.jps.cmdline.Launcher
43164

C:\Users\zhengqingya>jinfo -sysprops
Usage:
    jinfo [option] <pid>
        (to connect to running process)
    jinfo [option] <executable <core>
        (to connect to a core file)
    jinfo [option] [server_id@]<remote server IP or hostname>
        (to connect to remote debug server)

where <option> is one of:
    -flag <name>         to print the value of the named VM flag
    -flag [+|-]<name>    to enable or disable the named VM flag
    -flag <name>=<value> to set the named VM flag to the given value
    -flags               to print VM flags
    -sysprops            to print Java system properties
    <no option>          to print both of the above
    -h | -help           to print this help message

C:\Users\zhengqingya>jinfo -flags 14976
Attaching to process ID 14976, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.291-b10
Non-default VM flags: -XX:CICompilerCount=12 -XX:InitialHeapSize=125829120 -XX:MaxHeapSize=125829120 -XX:MaxNewSize=41943040 -XX:MinHeapDeltaBytes=524288 -XX:NewRatio=2 -XX:NewSize=41943040 -XX:OldSize=83886080 -XX:SurvivorRatio=8 -XX:+UseAdaptiveSizePolicy -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseFastUnorderedTimeStamps -XX:-UseLargePagesIndividualAllocation -XX:+UseParallelGC
Command line:  -agentlib:jdwp=transport=dt_socket,address=127.0.0.1:64654,suspend=y,server=n -Xmx120M -Xms120M -XX:+UseAdaptiveSizePolicy -XX:SurvivorRatio=8 -XX:NewRatio=2 -javaagent:D:\zhengqingya\soft\soft-dev\IDE\ideaIU-2022.3.win\plugins\java\lib\rt\debugger-agent.jar -Dfile.encoding=UTF-8

C:\Users\zhengqingya>jinfo -flag UseG1GC 14976
-XX:-UseG1GC

C:\Users\zhengqingya>jinfo -flag +UseG1GC 14976
Exception in thread "main" com.sun.tools.attach.AttachOperationFailedException: flag 'UseG1GC' cannot be changed

        at sun.tools.attach.WindowsVirtualMachine.execute(WindowsVirtualMachine.java:117)
        at sun.tools.attach.HotSpotVirtualMachine.executeCommand(HotSpotVirtualMachine.java:261)
        at sun.tools.attach.HotSpotVirtualMachine.setFlag(HotSpotVirtualMachine.java:234)
        at sun.tools.jinfo.JInfo.flag(JInfo.java:140)
        at sun.tools.jinfo.JInfo.main(JInfo.java:81)

C:\Users\zhengqingya>jinfo -flag UseG1GC 14976
-XX:-UseG1GC

C:\Users\zhengqingya>jinfo -flag -PrintGCDetails 14976

C:\Users\zhengqingya>jinfo -flag PrintGCDetails 14976
-XX:-PrintGCDetails

C:\Users\zhengqingya>
```

拓展：

- `java -XX:+PrintFlagsInitial` 查看所有 JVM 参数启动的初始值
  ```shell
  [Global flags]
       intx ActiveProcessorCount                      = -1                                  {product}
      uintx AdaptiveSizeDecrementScaleFactor          = 4                                   {product}
      uintx AdaptiveSizeMajorGCDecayTimeScale         = 10                                  {product}
      uintx AdaptiveSizePausePolicy                   = 0                                   {product}
  ...
  ```
- `java -XX:+PrintFlagsFinal` 查看所有 JVM 参数的最终值 （`:=`标识是被修改过的）
  ```shell
  [Global flags]
       intx ActiveProcessorCount                      = -1                                  {product}
  ...
       intx CICompilerCount                          := 4                                   {product}
      uintx InitialHeapSize                          := 333447168                           {product}
      uintx MaxHeapSize                              := 1029701632                          {product}
      uintx MaxNewSize                               := 1774714880                          {product}
  ```
- `java -XX:+PrintCommandLineFlags` 查看哪些已经被用户或者 JVM 设置过的详细的 XX 参数的名称和值
  ```shell
  -XX:InitialHeapSize=125829120 -XX:MaxHeapSize=125829120 -XX:+PrintCommandLineFlags -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseG1GC -XX:-UseLargePagesIndividualAllocation
  ```

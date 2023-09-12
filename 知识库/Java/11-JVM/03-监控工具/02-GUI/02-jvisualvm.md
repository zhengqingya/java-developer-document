# jvisualvm 图形化工具

1. https://visualvm.github.io/index.html
2. https://visualvm.github.io/pluginscenters.html

Visual VM 是一个功能强大的多合一故障诊断和性能监控的可视化工具。
它集成了多个 JDK 命令行工具，使用 Visual VM 可用于显示虚拟机进程及进程的配置和环境信息（jps，jinfo），
监视应用程序的 CPU、GC、堆、方法区及线程的信息（jstat、jstack）等，甚至代替 JConsole。
在 JDK 6 Update 7 以后，Visual VM 便作为 JDK 的一部分发布（VisualVM 在 JDK/bin 目录下）即：它完全免费。

**主要功能：**

- 1.生成/读取堆内存/线程快照
- 2.查看 JVM 参数和系统属性
- 3.查看运行中的虚拟机进程
- 4.程序资源的实时监控
- 5.JMX 代理连接、远程环境监控、CPU 分析和内存分析

### 一、基础使用

`win + r` -> `jvisualvm`

选择进程查看
![](images/02-jvisualvm-1689753357270.png)
![](images/02-jvisualvm-1689753401251.png)
![](images/02-jvisualvm-1689753415011.png)

### 二、安装`Visual GC`插件 -- 可以查看GC回收

> jdk 1.8.0_291

根据jdk版本选择对应插件地址 http://visualvm.github.io/pluginscenters.html

![](images/02-jvisualvm_plugin_url_choose.png)

工具 -> 插件 -> 设置 -> 添加相应插件URL(ex: https://visualvm.github.io/uc/8u131/updates.xml.gz)

![](images/02-jvisualvm_set_plugin_url.png)

然后在 可用插件中勾选`Visual GC`安装 -> 重启`jvisualvm`

![](images/02-jvisualvm_visual_gc_install.png)

![](images/02-jvisualvm_visual_gc.png)

### 三、使用jvisualvm的jstatd方式远程监控Java程序

#### 1、客户端：Windows

打开%JAVA_HOME%/bin/jvisualvm.exe，在“远程”节点，右键，“添加远程主机”

#### 2、服务端：Linux

```shell
# 在$JAVA_HOME/bin/下新建策略文件
cd /usr/lib/jvm/java-1.8-openjdk/bin
cd /usr/lib/jvm/java-1.8-openjdk/jre/bin

echo 'grant codebase "file:/usr/java/default/lib/tools.jar" {   
    permission java.security.AllPermission;   
};' > jstatd.all.policy

# 启动jstatd
./jstatd -J-Djava.security.policy=./jstatd.all.policy
```

最后在客户端即可看到服务端上运行的所有Java程序了

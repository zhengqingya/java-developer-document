### 一、前言

本文将在mac上简单安装和配置jmeter`^_^`

### 二、安装

#### 1、JDK8

下载 [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html)

```shell
# 配置环境变量
open ~/.bash_profile


############################## ↓↓↓↓↓↓ set java environment ↓↓↓↓↓↓ #############################
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_271.jdk/Contents/Home
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/jre/lib/rt.jar
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME CLASSPATH PATH
###############################################################################################

# 使配置生效
source ~/.bash_profile

# 验证
java
javac
java -version
```

#### 2、JMeter

下载 [https://jmeter.apache.org/download_jmeter.cgi](https://jmeter.apache.org/download_jmeter.cgi)
![在这里插入图片描述](https://img-blog.csdnimg.cn/64c4d5bfedb24dedb789b5d66c906dfa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

运行

```shell
cd apache-jmeter-5.4.3/bin
sh jmeter
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c60e5a0e4054e27832be48728642847.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 三、配置环境变量快捷启动jmeter

```shell
# 配置环境变量
open ~/.bash_profile


############################## ↓↓↓↓↓↓ set jmeter environment ↓↓↓↓↓↓ #############################
JMETER_HOME=/Users/zhengqingya/IT_zhengqing/soft/soft-dev/apache-jmeter-5.4.3
CLASSPATH=.:$JMETER_HOME/lib/ext/ApacheJMeter_core.jar:$JMETER_HOME/lib/jorphan.jar
PATH=$PATH:$JMETER_HOME/bin
export JMETER_HOME CLASSPATH PATH
###############################################################################################


# 使配置生效
source ~/.bash_profile

# 验证 => 在任意地方执行jmeter即可运行程序
jmeter
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/fc8ddd6c225e4b5e80f97f318dfffcba.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)





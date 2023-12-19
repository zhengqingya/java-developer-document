### JDK8

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
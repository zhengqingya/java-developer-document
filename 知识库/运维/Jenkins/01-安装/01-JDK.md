# 安装 JDK

```shell
# 通过yum安装的默认路径为：`/usr/lib/jvm`
yum -y install java-1.8.0-openjdk*
```

### 配置环境变量

在文件最后加入以下内容：

```shell
cat>> /etc/profile <<EOF

############################## ↓↓↓↓↓↓ set java environment ↓↓↓↓↓↓ #############################
JAVA_HOME=/usr/lib/jvm/java
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/jre/lib/rt.jar
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME CLASSPATH PATH
###############################################################################################

EOF
```

使配置生效

```shell
. /etc/profile
```

查看java环境配置

```shell
echo $JAVA_HOME
echo $PATH
```

验证

```shell
java
javac
java -version
```

### 如何卸载JDK？？？

```shell
# 查看CentOS自带JDK是否已安装:
yum list installed | grep java
# 如果存在自带的jdk，删除自带的jdk
yum -y remove java-1.8.0-openjdk*
yum -y remove tzdata-java.noarch
```

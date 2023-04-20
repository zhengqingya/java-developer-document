# 使用jvisualvm的jstatd方式远程监控Java程序

# 一、客户端：Windows

打开%JAVA_HOME%/bin/jvisualvm.exe，在“远程”节点，右键，“添加远程主机”

# 二、服务端：Linux

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

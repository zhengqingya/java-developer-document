### Linux安装telnet

```shell
# 先检查是否安装了telnet
rpm -qa | grep telnet
# 看看有些什么
yum list | grep telnet
# 安装telnet
yum install -y telnet-server.x86_64
yum install -y telnet.x86_64

# 使用
telnet www.zhengqingya.com 6379
# 退出如下操作
ctrl + ] 
quit

# ex:
#$ telnet www.zhengqingya.com 6379
#Trying 42.193.20.232...
#Connected to www.zhengqingya.com.
#Escape character is '^]'.
#^]
#telnet> quit
#Connection closed.
```

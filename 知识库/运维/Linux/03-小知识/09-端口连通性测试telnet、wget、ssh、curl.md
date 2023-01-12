# linux端口连通性测试telnet、wget、ssh、curl

```shell
# 列出telnet相关的安装包
yum list telnet*
# 安装telnet服务
yum install telnet-server
# 安装telnet客户端
yum install telnet.*

# 测试、登录或控制远程主机
telnet[参数][主机]
telnet ip port


$ telnet www.zhengqingya.com 80
Trying 42.193.20.232...
Connected to www.zhengqingya.com.
Escape character is '^]'.
# ctrl+]    进入telnet交互命令行
# quit+回车 退出
```

> wget会自动下载内容

```shell
# 从网络上下载资源
wget [参数] [URL地址]
wget ip:port

wget www.zhengqingya.com 80
```

```shell
# 较可靠，专为远程登录会话和其他网络服务提供安全性的协议
ssh -v -p port username@ip
# -v 调试模式(会打印日志)
# -p 指定端口
# username:远程主机的登录用户
# ip:远程主机
ssh -p22 omd@www.zhengqingya.com
```

```shell
# 利用URL规则在命令行下工作的文件传输工具，一款很强大的http命令行工具
curl [参数] [URL地址]
curl ip:port

curl www.zhengqingya.com:80
```

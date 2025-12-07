# Hyper-v安装CentOS7.6

### 一、镜像下载

CentOS7.6镜像地址：https://mirrors.aliyun.com/centos-vault/7.6.1810/isos/x86_64/
![](./images/04-Hyper-v安装CentOS7.6-1765089603781.png)

1. 下载 https://mirrors.aliyun.com/centos-vault/7.6.1810/isos/x86_64/CentOS-7-x86_64-DVD-1810.torrent
2. 双击使用迅雷打开&下载

![](./images/04-Hyper-v安装CentOS7.6-1765089650006.png)

下载完成之后得到：
![](./images/04-Hyper-v安装CentOS7.6-1765089713934.png)

### 二、Hyper-v创建虚拟机

#### 法一：快速创建

![](./images/04-Hyper-v安装CentOS7.6-1765112703731.png)
![](./images/04-Hyper-v安装CentOS7.6-1765089741788.png)

#### 法二：新建虚拟机 -- 可自定义配置

![](./images/04-Hyper-v安装CentOS7.6-1765112729039.png)
![](./images/04-Hyper-v安装CentOS7.6-1765113182050.png)
![](./images/04-Hyper-v安装CentOS7.6-1765113266863.png)
![](./images/04-Hyper-v安装CentOS7.6-1765115483327.png)
![](./images/04-Hyper-v安装CentOS7.6-1765113380002.png)
![](./images/04-Hyper-v安装CentOS7.6-1765113392726.png)
![](./images/04-Hyper-v安装CentOS7.6-1765113657739.png)
![](./images/04-Hyper-v安装CentOS7.6-1765113775366.png)
![](./images/04-Hyper-v安装CentOS7.6-1765115536451.png)

### 三、启动虚拟机 & 安装

启动连接系统
![](./images/04-Hyper-v安装CentOS7.6-1765114133507.png)
![](./images/04-Hyper-v安装CentOS7.6-1765114186042.png)

开始安装
![](./images/04-Hyper-v安装CentOS7.6-1765115602083.png)
![](./images/04-Hyper-v安装CentOS7.6-1765114880441.png)
![](./images/04-Hyper-v安装CentOS7.6-1765115749432.png)

安装位置选择
![](./images/04-Hyper-v安装CentOS7.6-1765115773394.png)

![](./images/04-Hyper-v安装CentOS7.6-1765114964783.png)

设置ROOT密码
![](./images/04-Hyper-v安装CentOS7.6-1765115929365.png)
![](./images/04-Hyper-v安装CentOS7.6-1765116136010.png)

完成配置
![](./images/04-Hyper-v安装CentOS7.6-1765116169466.png)
![](./images/04-Hyper-v安装CentOS7.6-1765116208390.png)

重启进入系统
![](./images/04-Hyper-v安装CentOS7.6-1765116311265.png)

### 四、FinalShell 连接

```shell
# 默认eth0接口没有分配到IP地址，直接激活连接 -- 作用：使网卡eth0建立网络连接并获取IP地址。
nmcli connection up eth0
# 查看ip地址信息
ip addr
```

![](./images/04-Hyper-v安装CentOS7.6-1765117073771.png)
![](./images/04-Hyper-v安装CentOS7.6-1765117150788.png)

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

### 四、其它配置

```shell
# 修改密码
# echo "new_password" | passwd --stdin username
# 示例：修改root账号密码为centos
# echo "centos" | passwd --stdin root
```

#### 1、网络配置 -- 设置固定ip

> tips: 不要使用`nmcli connection up eth0`直接激活网卡获取ip地址，这种方式会导致系统重启后无法获取IP。

```shell
# 修改配置
cat> /etc/sysconfig/network-scripts/ifcfg-eth0 <<EOF

TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
# ip设置为静态：dhcp改成static
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="eth0"
UUID="ad5ab7ef-9f17-49c1-b205-d7a89651376b"
# 网卡名
DEVICE="eth0"
# no改成yes
ONBOOT="yes"
# 网关
GATEWAY="192.168.137.1"
# 设置ip地址 TODO
IPADDR="192.168.137.162"
# 子网掩码
NETMASK="255.255.255.0"
DNS1="114.114.114.114"
DNS2="8.8.8.8"
ZONE="public"
# 自动连接网络
NM_CONTROLLED=yes
AUTOCONNECT=yes

EOF
```

```shell
# 重启网络
# systemctl restart network
# 重启
reboot
# 查看ip
ip addr
```

![](./images/04-Hyper-v安装CentOS7.6-1765124599839.png)

##### FinalShell 连接

![](./images/04-Hyper-v安装CentOS7.6-1765124646876.png)
![](./images/04-Hyper-v安装CentOS7.6-1765124386947.png)

#### 2、关闭防火墙

```shell
# firewalld的基本使用
# 启动
systemctl start firewalld
# 关闭
systemctl stop firewalld
# 查看状态
systemctl status firewalld 
# 开机禁用
systemctl disable firewalld
# 开机启用
systemctl enable firewalld
```

#### 3、关闭SELinux

```shell
# 查看SELinux状态
getenforce

# 临时关闭SELinux
setenforce 0

# 永久关闭SELinux
vim /etc/selinux/config
# 将 `SELINUX=enforcing` 改成 `SELINUX=disabled`

# 重启
reboot
```

#### 4、更新yum源

> 解决yum安装依赖报错   `cannot find a valid baseurl for repo: base/7/x86_64`

```shell
cd /etc/yum.repos.d
mkdir repo_bak
# 备份配置
mv *.repo repo_bak/

# 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/
wget http://mirrors.aliyun.com/repo/Centos-7.repo

# 安装EPEL（Extra Packages for Enterprise Linux ）源  -- tips:如果这里安装不了，可尝试先清除缓存重新生成新的缓存
# yum clean all
# yum makecache
yum install -y epel-release

# 清除缓存
yum clean all
# 生成新的缓存
yum makecache

# 查看启用的yum源和所有的yum源
yum repolist enabled
yum repolist all

# 更新yum
yum -y update
```

#### 5、安装ifconfig

```shell
# 安装ifconfig命令
yum install net-tools.x86_64
# 查看ip
ifconfig
```

#### 6、其它

```shell
# 安装wget
yum install wget
# 安装git
yum install git
```

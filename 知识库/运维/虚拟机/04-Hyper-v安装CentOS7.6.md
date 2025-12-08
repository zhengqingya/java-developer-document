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
tips: 建议不要勾选动态内存，因为个人配置后，会出现内存占用大的问题。当然这个配置后期可再次修改。
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

#### 4、更新yum镜像源

> CentOS 7 官方源已停止维护（2024-06-30 后 EOL），需要切换至 Vault 源 或 国内镜像源（如阿里云、清华源）。

> 总结：核心思路是绕过网络下载，直接手动创建一个指向仍可访问的CentOS存档仓库（Vault）的配置文件，让YUM先“活过来”，装上wget，之后就可以更方便地配置任何镜像源了。

##### a: 使用 Vault 源

> tips: 官方归档源，已停止更新。

```shell
cd /etc/yum.repos.d
mkdir repo_bak
# 备份配置
mv *.repo repo_bak/

# 创建一个新的仓库配置文件
cat> /etc/yum.repos.d/CentOS-Base.repo <<EOF

[base]
name=CentOS-$releasever - Base
baseurl=https://vault.centos.org/7.9.2009/os/$basearch/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

[updates]
name=CentOS-$releasever - Updates
baseurl=https://vault.centos.org/7.9.2009/updates/$basearch/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

[extras]
name=CentOS-$releasever - Extras
baseurl=https://vault.centos.org/7.9.2009/extras/$basearch/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

EOF


# 清理YUM缓存并测试
yum clean all
yum makecache

# 安装您需要的软件（如wget）
yum install -y wget
```

##### b：使用国内镜像源

```shell
# 下载阿里云的repo文件
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
# 再次清理和重建缓存
yum clean all
yum makecache
```

##### c：配置 EPEL 源

```shell
# 启用EPEL（Extra Packages for Enterprise Linux）仓库，为CentOS/RHEL系统提供额外的软件包资源。 -- 配置完成后可以使用yum安装更多软件包。
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
yum install -y net-tools.x86_64
# 查看ip
ifconfig
```

#### 6、其它

```shell
# 安装wget
yum install -y wget
# 安装git
yum install -y git
# 安装htop
yum install -y htop
```

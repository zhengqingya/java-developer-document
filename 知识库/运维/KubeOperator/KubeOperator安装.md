@[TOC](文章目录)

### 一、前言

KubeOperator 是一个开源的轻量级 Kubernetes 发行版，专注于帮助企业规划、部署和运营生产级别的 Kubernetes 集群。

> 1. github [https://github.com/KubeOperator/KubeOperator](https://github.com/KubeOperator/KubeOperator)
> 2. 文档 [https://kubeoperator.io/docs](https://kubeoperator.io/docs)

本文将基于`CentOS Linux release 7.6.1810 (Core)`安装`KubeOperator`

### 二、安装KubeOperator

#### 1、准备

```shell
mkdir -p /home/soft/kubeoperator
cd /home/soft/kubeoperator
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ecafa301a4cc4481a2c8ef640a9619e3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

端口要求：防火墙必须放通 SSH（默认22）、80、8081-8083端口

```shell
# 查看防火墙状态
systemctl status firewalld 

# 法一：关闭防火墙
systemctl stop firewalld

# 法二：启动防火墙 & 开放端口
# 启动防火墙
systemctl start firewalld
# 开放端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=8081-8083/tcp --permanent
# 重新加载防火墙配置使生效
firewall-cmd --reload
# 查看开放的端口
firewall-cmd --list-ports
```

#### 2、在线安装

> 以root用户执行

```shell
# 安装
curl -sSL https://github.com/KubeOperator/KubeOperator/releases/latest/download/quick_start.sh -o quick_start.sh
sh quick_start.sh
# 检查服务状态
koctl status
# 若有异常，可重新启动
koctl restart
```

#### 3、离线安装

> 下载离线包 [https://community.fit2cloud.com/#/products/kubeoperator/downloads](https://community.fit2cloud.com/#/products/kubeoperator/downloads)

```shell
# 解压安装包
tar zxvf kubeoperator-release-v3.14.0-amd64.tar.gz
# 进入安装包目录
cd kubeoperator-release-v3.14.0
# 运行安装脚本
/bin/bash install.sh
# 等待安装脚本执行完成后，查看 KubeOperator 状态
koctl status
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2f0a00770d0a4aa0bf3f75ffe73a6987.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/68e757aec7124a2c8257afa70bfdc2a6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 4、登录访问

> URL:  http://$LOCAL_IP:80
> 用户名:  admin  
> 初始密码:  kubeoperator@admin123

![在这里插入图片描述](https://img-blog.csdnimg.cn/c1f21c581bbb4ad3b75d36615775d0c8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/798dee5f786547169e9563eb7b94bd4b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 三、升级 KubeOperator

#### 1、在线升级

```shell
# 升级到指定版本
koctl upgrade v3.14.0
# 升级到最新版本
koctl upgrade
# 查看 KubeOperator 状态
koctl status
```

#### 2、离线升级

```shell
# 离线升级需要提前下载离线安装包，并解压到 KubeOperator 部署机
tar zxvf kubeoperator-release-v3.14.0-amd64.tar.gz
# 进入升级包目录
cd kubeoperator-release-v3.14.0
# 运行安装脚本
koctl upgrade
# 查看 KubeOperator 状态
koctl status
```

### 四、卸载 KubeOperator

```shell
# 进入KubeOperator安装目录,默认/opt
cd /opt/kubeoperator
# 卸载
koctl uninstall
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/aa8fc2d9c63648af9c121432a4db25d9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

---

> 今日分享语句：
> 对的，坚持；错的，放弃！

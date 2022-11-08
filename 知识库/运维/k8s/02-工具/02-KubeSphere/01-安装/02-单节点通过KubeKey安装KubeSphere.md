@[TOC](文章目录)

### 一、前言

KubeSphere 是在 Kubernetes 之上构建的以应用为中心的多租户容器平台，提供全栈的 IT 自动化运维的能力，简化企业的 DevOps 工作流。
KubeSphere 提供了运维友好的向导式操作界面，帮助企业快速构建一个强大和功能丰富的容器云平台。

本文将基于`CentOS Linux release 7.6.1810 (Core)`以 `All-in-One` 模式安装`KubeSphere`

>
可参考 [https://kubesphere.io/zh/docs/quick-start/all-in-one-on-linux](https://kubesphere.io/zh/docs/quick-start/all-in-one-on-linux)

### 二、环境准备

```shell
# 配置yum源
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
# 安装Docker -- 指定版本安装
sudo yum install -y docker-ce-20.10.7 docker-ce-cli-20.10.7 containerd.io-1.4.6
# 设置开机自启 & 现在启动
sudo systemctl enable --now docker
# 查看运行情况
sudo systemctl status docker

# 配置主机名
hostnamectl set-hostname master
```

### 三、以 `All-in-One` 模式安装 `KubeSphere`

```shell
# 准备
mkdir -p /home/soft/kubesphere
cd /home/soft/kubesphere

# 安装相关依赖项
yum -y install socat conntrack conntrack-tools ebtables ipset ipvsadm

# 下载 KubeKey
export KKZONE=cn
curl -sfL https://get-kk.kubesphere.io | VERSION=v2.0.0 sh -
chmod +x kk

# 开始安装
# ./kk create cluster [--with-kubernetes version] [--with-kubesphere version]
./kk create cluster --with-kubernetes v1.21.5 --with-kubesphere v3.2.1
```

![img_7.png](images/kubesphere-on-one-01.png)
日志如下的时候：表示Kubernetes部署完成，等待部署KubeSphere，这里时间会有点久~

`Please wait for the installation to complete:   >>---> `
![img_8.png](images/kubesphere-on-one-02.png)
如下安装成功

> tips: 记录下控制台地址，账号密码
> Console: http://192.168.101.89:30880
> Account: admin
> Password: P@88w0rd

![img_9.png](images/kubesphere-on-one-03.png)

```shell
# 查看版本
kubectl version --short=true

# 验证安装结果
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f

# 检查 KubeSphere 相关组件的运行状况
kubectl get pod --all-namespaces
```

### 四、访问控制台

![img_10.png](images/kubesphere-on-one-04.png)
![img_11.png](images/kubesphere-on-one-05.png)
![img_12.png](images/kubesphere-on-one-06.png)
![img_13.png](images/kubesphere-on-one-07.png)
![img_14.png](images/kubesphere-on-one-08.png)

### 五、卸载

>
可参考 [https://kubesphere.io/zh/docs/installing-on-linux/uninstall-kubesphere-and-kubernetes](https://kubesphere.io/zh/docs/installing-on-linux/uninstall-kubesphere-and-kubernetes)

```shell
./kk delete cluster
```

![img_15.png](images/kubesphere-on-one-09.png)


--- 

> 今日分享语句：
> 永远成功的秘密,就是每天淘汰自己。

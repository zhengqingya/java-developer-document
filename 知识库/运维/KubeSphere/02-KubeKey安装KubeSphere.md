@[TOC](文章目录)

### 一、前言

KubeSphere 是在 Kubernetes 之上构建的以应用为中心的多租户容器平台，提供全栈的 IT 自动化运维的能力，简化企业的 DevOps 工作流。KubeSphere 提供了运维友好的向导式操作界面，帮助企业快速构建一个强大和功能丰富的容器云平台。

本文将基于`CentOS Linux release 7.6.1810 (Core)`以 `All-in-One` 模式安装`KubeSphere`

> 可参考 [https://kubesphere.io/zh/docs/quick-start/all-in-one-on-linux](https://kubesphere.io/zh/docs/quick-start/all-in-one-on-linux)

### 二、安装Docker

```shell
# 通过yum源安装docker
yum -y install docker
# 启动docker
systemctl start docker
# 开机自启
systemctl enable docker
# 查看运行情况
service docker status
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

![在这里插入图片描述](https://img-blog.csdnimg.cn/30fa07739bf347ca99cf4e4899ec3dee.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
日志如下的时候：表示Kubernetes部署完成，等待部署KubeSphere，这里时间会有点久~

`Please wait for the installation to complete:   >>---> `
![在这里插入图片描述](https://img-blog.csdnimg.cn/cd391ba5a2774e8da69de48a06b9463d.png)
如下安装成功

> tips: 记录下控制台地址，账号密码
> Console: http://192.168.101.89:30880
> Account: admin
> Password: P@88w0rd

![在这里插入图片描述](https://img-blog.csdnimg.cn/ebd995e9ed744f5d9c2e81c9398bc5d4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

```shell
# 查看版本
kubectl version --short=true

# 验证安装结果
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f

# 检查 KubeSphere 相关组件的运行状况
kubectl get pod --all-namespaces
```

### 四、访问控制台

![在这里插入图片描述](https://img-blog.csdnimg.cn/90d8a6b12f654e87aa857d3ce6606548.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc65c915e226410daa6966036beb0ce4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e08507a3834945e29feb91fdf1b170eb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/3c5e852d06fe49168a74d4c1dc3b2d42.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/d80808fefc184112b24fe6552480962a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


### 五、卸载

> 可参考 [https://kubesphere.io/zh/docs/installing-on-linux/uninstall-kubesphere-and-kubernetes](https://kubesphere.io/zh/docs/installing-on-linux/uninstall-kubesphere-and-kubernetes)

```shell
./kk delete cluster
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a651291754624856bf026fa365d6d597.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


--- 

> 今日分享语句：
> 永远成功的秘密,就是每天淘汰自己。

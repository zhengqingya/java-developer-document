# 单节点通过KubeKey安装KubeSphere(v4.2.0)

> 可参考：https://docs.kubesphere.com.cn/v4.2.0/03-installation-and-upgrade/02-install-kubesphere/01-online-install-kubernetes-and-kubesphere/

### 一、安装

#### 1、KubeKey安装k8s

[config-sample.yaml](./config/4.2.0/config-sample.yaml)

```shell
# 配置主机名
hostnamectl set-hostname master

# 准备
mkdir -p /home/soft/kubesphere
cd /home/soft/kubesphere

# 安装相关依赖项
yum -y install socat conntrack ebtables ipset

# 下载 KubeKey
export KKZONE=cn
curl -sfL https://get-kk.kubesphere.io | sh -
# curl -sfL https://get-kk.kubesphere.io | VERSION=v4.0.2 sh -
chmod +x kk

# 创建配置文件
./kk create config -f config-sample.yaml --with-kubernetes v1.33.3
# 编辑配置文件
vi config-sample.yaml
# 安装
./kk create cluster -f config-sample.yaml
```

#### 2、安装 kubesphere

```shell
chart=oci://hub.kubesphere.com.cn/kse/ks-core
version=1.2.3-20251118
helm upgrade --install -n kubesphere-system --create-namespace ks-core $chart --debug --wait --version $version --reset-values --set extension.imageRegistry=swr.cn-north-9.myhuaweicloud.com/ks
```

安装成功后，访问 kubesphere web 控制台
![](./images/02-单节点通过KubeKey安装KubeSphere(v4.2.0)-1765376822591.png)

- KubeSphere: http://IP:30880
- Jenkins: http://IP:30180
- Account: admin
- Password: P@88w0rd

```shell
NOTES:
Thank you for choosing KubeSphere Helm Chart.

Please be patient and wait for several seconds for the KubeSphere deployment to complete.

1. Wait for Deployment Completion

    Confirm that all KubeSphere components are running by executing the following command:

    kubectl get pods -n kubesphere-system
2. Access the KubeSphere Console

    Once the deployment is complete, you can access the KubeSphere console using the following URL:  

    http://172.31.80.66:30880

3. Login to KubeSphere Console

    Use the following credentials to log in:

    Account: admin
    Password: P@88w0rd

NOTE: It is highly recommended to change the default password immediately after the first login.
For additional information and details, please visit https://kubesphere.io.
```

> tips: 许可证需要下载邮箱附件中的激活码进行激活，注意最后2个空行也要，直接全部Ctrl+C ！！！
> ![](./images/02-单节点通过KubeKey安装KubeSphere(v4.2.0)-1765382867810.png)

### 二、卸载

```shell
export KKZONE=cn
./kk delete cluster -f config-sample.yaml
```



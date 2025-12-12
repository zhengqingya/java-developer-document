# 部署MySQL实战

### 1、创建配置

> /etc/mysql/my.cnf

![](images/kubesphere-deploy-mysql-01.png)

![](images/kubesphere-deploy-mysql-02.png)

![](images/kubesphere-deploy-mysql-03.png)

![](images/kubesphere-deploy-mysql-04.png)

### 2、创建存储卷 - mysql数据挂载卷

> tips: 建议在`工作负载` -> `存储卷设置` -> `添加存储卷模板` 中去创建关联存储卷。(不使用下面方式)

> /var/lib/mysql

![](images/kubesphere-deploy-mysql-05.png)

![](images/kubesphere-deploy-mysql-06.png)

![](images/kubesphere-deploy-mysql-07.png)

#### 配置动态供应的默认存储类`nfs-storage`

> tips: 如果`存储设置` -> `存储类型` 中只有local，可尝试如下操作

见 [搭建NFS动态PV存储](../../../01-基础/02-实战/07-存储抽象-PV&PVC-03-动态PV.md)

### 3、创建工作负载

![](images/kubesphere-deploy-mysql-08.png)

基本信息和容器组设置

![](images/kubesphere-deploy-mysql-09.png)

存储卷设置

![](images/kubesphere-deploy-mysql-10.png)

下一步创建即可

![](images/kubesphere-deploy-mysql-11.png)

![](images/kubesphere-deploy-mysql-12.png)

### 4、创建服务 - 配置外网访问

> 默认只能内部访问

![](images/kubesphere-deploy-mysql-13.png)

```shell
mysql -uroot -proot -h mysql-qhft.my-project
```

![](images/kubesphere-deploy-mysql-14.png)

现在来创建一个外部可访问的服务 `服务` -> `创建` -> `自定义服务` -> `指定工作负载`

![](images/kubesphere-deploy-mysql-15.png)

![](images/kubesphere-deploy-mysql-16.png)

创建完成

![](images/kubesphere-deploy-mysql-17.png)

然后可以测试通过集群任意节点的`30749`端口去连接访问了

![](images/kubesphere-deploy-mysql-18.png)

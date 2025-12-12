# NFS服务器搭建

##### a、所有节点

```shell
# 所有机器安装
yum install -y nfs-utils
```

##### b、主节点

```shell
# nfs主节点
echo "/nfs/data/ *(insecure,rw,sync,no_root_squash)" > /etc/exports
mkdir -p /nfs/data

# 设置开机自启 & 现在启动  -- 远程绑定服务
systemctl enable rpcbind --now

# nfs服务
systemctl enable nfs-server --now

# 配置生效
exportfs -r

# 查看
exportfs
```

![](images/k8s-actual-32.png)

##### c、从节点

```shell
# 查看远程机器有哪些目录可以同步 -- 使用master机器ip地址
showmount -e 192.168.101.20

# 执行以下命令挂载 nfs 服务器上的共享目录到本机路径
mkdir -p /nfs/data

# 同步远程机器数据
mount -t nfs 192.168.101.20:/nfs/data /nfs/data
```

![](images/k8s-actual-33.png)

测试

```shell
# 在任意机器写入一个测试文件
echo "hello nfs server" > /nfs/data/test.txt

# 在其它机器查看数据
cat /nfs/data/test.txt
```
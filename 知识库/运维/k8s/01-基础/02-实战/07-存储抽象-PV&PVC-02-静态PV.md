# 搭建NFS静态PV存储

> 以`NFS`作为存储层为例
> 节点之间互相同步数据

### 一、搭建NFS服务器

见 [NFS服务器搭建](07-存储抽象-PV&PVC-01-NFS服务器搭建.md)

### 二、原生方式数据挂载

> master机器执行

```shell
# 先创建共享目录
mkdir -p /nfs/data/nginx-pv

cat <<EOF | sudo tee ./nginx-nfs.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-pv-demo
  name: nginx-pv-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-pv-demo
  template:
    metadata:
      labels:
        app: nginx-pv-demo
    spec:
      containers:
      - image: nginx
        name: nginx
        volumeMounts:
        - name: html
          mountPath: /usr/share/nginx/html
      volumes:
        - name: html
          nfs:
            server: 192.168.101.20 # 使用master机器ip地址
            path: /nfs/data/nginx-pv
            
EOF


# 创建
kubectl apply -f nginx-nfs.yaml
# 删除
# kubectl delete -f nginx-nfs.yaml

# 写入数据，然后访问测试
echo "hello nfs" > /nfs/data/nginx-pv/index.html
```

> tips: 如果删除服务，挂载的数据是不会删除的！

```shell
# 删除
kubectl delete -f nginx-nfs.yaml

# 查看挂载数据
cat /nfs/data/nginx-pv/index.html
```

### 三、静态 PV&PVC -- 挂载目录

1. `PV`：持久卷（Persistent Volume），将应用需要持久化的数据保存到指定位置 eg: /nfs/data/nginx-pv
2. `PVC`：持久卷申明（Persistent Volume Claim），申明需要使用的持久卷规格 eg: 申请10MB

> eg: `pv01`给10MB `pv02`给1GB `pv03`给3GB；
> 1. 静态供应: 提前申请创建，而非要多大就动态创建多大。
> 2. 当一个pvc来申请10MB的时候，会给一个`pv01`的合适空间，而不是给`pv02`。
> 3. 如果删除pod和其下pvc时，关联`pv01`空间也会被回收。
> 4. 如果之后内容增长超过`pv0x`规定的空间大小将会报错。

##### a、创建pv池

> master机器执行

```shell
# nfs主节点创建3个文件夹
mkdir -p /nfs/data/01
mkdir -p /nfs/data/02
mkdir -p /nfs/data/03
```

创建PV

```shell
cat <<EOF | sudo tee ./pv.yaml

apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv01-10m   # 注：小写
spec:
  capacity:
    storage: 10M  # 给10M空间
  accessModes:
    - ReadWriteMany   # 多节点可读可写
  storageClassName: nfs
  nfs:
    path: /nfs/data/01
    server: 192.168.101.20 # 使用master机器ip地址
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv02-1gi
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/02
    server: 192.168.101.20
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv03-3gi
spec:
  capacity:
    storage: 3Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/03
    server: 192.168.101.20

EOF


# 创建
kubectl apply -f pv.yaml
# 删除
# kubectl delete -f pv.yaml

# 查看系统资源
kubectl get persistentvolume
```

![](images/k8s-actual-34.png)

##### b、PVC创建与绑定

> master机器执行

创建PVC

```shell
cat <<EOF | sudo tee ./pvc.yaml

kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: nginx-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 200Mi
  storageClassName: nfs

EOF


# 应用
kubectl apply -f pvc.yaml

# 查看pv -- `CLAIM`会选择一个合适的空间`pv02`进行绑定 `default/nginx-pvc`
kubectl get pv

# 删除再查看 会发现`STATUS`值为`Released` 即空间被释放
kubectl delete -f pvc.yaml && kubectl get pv

# 再次应用会重新绑定 由于之前的`pv02`未释放，将会绑定`pv03`
kubectl apply -f pvc.yaml && kubectl get pv
```

![](images/k8s-actual-35.png)

创建Pod绑定PVC

```shell
cat <<EOF | sudo tee ./pod-pvc.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deploy-pvc
  name: nginx-deploy-pvc
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-deploy-pvc
  template:
    metadata:
      labels:
        app: nginx-deploy-pvc
    spec:
      containers:
      - image: nginx
        name: nginx
        volumeMounts:
        - name: html
          mountPath: /usr/share/nginx/html
      volumes:
        - name: html
          persistentVolumeClaim:
            claimName: nginx-pvc

EOF


# 创建
kubectl apply -f pod-pvc.yaml
# 删除
# kubectl delete -f pod-pvc.yaml

# 查看pod正常启动
kubectl get pod

# 查看pvc,pv  --  `nginx-pvc`绑定挂载卷`pv03-3gi`
kubectl get pvc,pv

# 修改`pv03`查看内容是否变更
echo "hello 03" > /nfs/data/03/index.html
```

![](images/k8s-actual-36.png)
![](images/k8s-actual-37.png)

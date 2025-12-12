# ConfigMap -- 挂载配置文件

- PV&PVC：挂载文件|目录
- ConfigMap：挂载配置文件

> 抽取应用配置，并且可以自动更新。
> redis示例

##### 1、将配置文件创建为配置集

```shell
# 创建redis配置文件
cat <<EOF | sudo tee ./redis.conf
appendonly yes
EOF

# 创建配置集，redis保存到k8s的etcd
kubectl create cm redis-conf --from-file=redis.conf

# 删除配置，创建好配置集，就不需要了...
rm -rf redis.conf

# 查看
kubectl get cm
kubectl get cm redis-conf -oyaml
```

![](images/k8s-actual-38.png)

```yml
apiVersion: v1
data: # data是所有真正的数据
  redis.conf: |       # key：默认是文件名
    appendonly yes    # value：配置文件的内容
kind: ConfigMap
metadata:
  name: redis-conf
  namespace: default
```

##### 2、创建Pod

```shell
cat <<EOF | sudo tee ./pod-redis.yaml

apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis
    command:
      - redis-server
      - "/redis-master/redis.conf"   # 指redis容器内部的位置
    ports:
    - containerPort: 6379
    volumeMounts:
    - mountPath: /data
      name: data
    - mountPath: /redis-master
      name: config
  volumes:
    - name: data
      emptyDir: {}
    - name: config
      configMap:
        name: redis-conf   # 对应上一步创建的`redis-conf`配置集
        items:
        - key: redis.conf
          path: redis.conf
            
EOF


# 创建
kubectl apply -f pod-redis.yaml
# 删除
# kubectl delete -f pod-redis.yaml
```

![](images/k8s-actual-39.png)

##### 3、查看

```shell
kubectl exec -it redis -- /bin/bash
cat /redis-master/redis.conf
```

![](images/k8s-actual-40.png)

##### 4、修改ConfigMap

```shell
kubectl edit cm redis-conf
```

![](images/k8s-actual-41.png)

##### 5、检查配置是否更新

等一会儿查看配置，发现会自动将配置同步过来

```shell
kubectl exec -it redis -- /bin/bash
cat /redis-master/redis.conf

# 此配置需要redis重启之后才会生效 -- 原因：redis中间件自身无此配置热更新功能
redis-cli
127.0.0.1:6379> CONFIG GET appendonly
127.0.0.1:6379> CONFIG GET requirepass 
```

![](images/k8s-actual-42.png)
![](images/k8s-actual-43.png)

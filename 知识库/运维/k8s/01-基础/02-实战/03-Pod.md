# 三、Pod

> 运行中的一组容器，Pod是kubernetes中应用的最小单位。

常见Pod状态

| 状态名称                   | 含义                                                 | 常见原因                                     |
|------------------------|----------------------------------------------------|------------------------------------------|
| **`Pending`**          | Pod已被系统接受，但一个或多个容器尚未创建和运行。                         | 资源不足、节点选择器不匹配、镜像拉取中。                     |
| **`Running`**          | Pod已绑定到节点，所有容器已被创建，且至少有一个容器正在运行或重启中。               | 这是正常工作的状态。但需注意可能有个别容器启动失败。               |
| **`Succeeded`**        | Pod中所有容器均已成功执行完毕并退出（退出码为0）。                        | 通常见于**Job**或**CronJob**管理的批量任务完成后。       |
| **`Failed`**           | Pod中所有容器都已终止，且至少有一个容器是异常退出的（退出码非0）。                | 应用代码错误、内存不足被系统杀死(OOMKilled)、健康检查失败。      |
| **`Unknown`**          | 无法从Pod所在节点获取状态信息。                                  | 节点失联（宕机、重启）、节点与控制平面的网络通信故障。              |
| **`CrashLoopBackOff`** | 容器反复启动后立即崩溃。Kubernetes会以指数退避策略延迟重启（如等10秒、20秒、40秒）。 | 应用依赖服务不可用（如数据库）、应用启动配置错误、资源限制过小。         |
| **`ImagePullBackOff`** | 无法拉取容器镜像。Kubernetes会不断重试，但间隔时间越来越长。                | 镜像名称或标签错误、私有镜像仓库认证失败、网络问题导致拉取超时。         |
| **`Terminating`**      | Pod正在被删除，但尚未完全停止。                                  | 容器未响应终止信号、**Finalizer**（清理逻辑）未完成、节点通信中断。 |

---

#### 1、命令行

```shell
# 创建一个叫 `mynginx` 的 `nginx` 容器
kubectl run mynginx --image=nginx

# 查看`default`空间的Pod
kubectl get pod

# 如果应用未运行，可查看描述信息，看看应用执行相关事件处理
# kubectl describe pod Pod名
kubectl describe pod mynginx

# 删除
kubectl delete pod mynginx

# 查看运行日志
kubectl logs -f mynginx

# 输出更完善的信息 -- 每个Pod，k8s都会分配一个ip   集群中的任意机器都能访问
kubectl get pod -owide

# 查看
curl 10.0.169.136:80

# 进入容器
kubectl exec -it mynginx -- /bin/bash
```

![](images/k8s-actual-03.png)

#### 2、配置文件

```shell
cat <<EOF | sudo tee ./mynginx.yaml

apiVersion: v1
kind: Pod
metadata:
  labels:
    run: mynginx
  name: mynginx
  namespace: default
spec:
  containers:
  - image: nginx
    name: mynginx
  
EOF


# 创建
kubectl apply -f mynginx.yaml
# 删除
kubectl delete -f mynginx.yaml
```

一个Pod部署多个容器

> tips: 无法部署多个相同容器，会出现端口占用问题！

```shell
cat <<EOF | sudo tee ./my-pods.yaml

apiVersion: v1
kind: Pod
metadata:
  labels:
    run: my-pods
  name: my-pods
spec:
  containers:
  - image: nginx
    name: nginx
  - image: tomcat
    name: tomcat
    
EOF


# 创建
kubectl apply -f my-pods.yaml
# 删除
kubectl delete -f my-pods.yaml


# 每隔1秒运行 查看数据
watch -n 1 kubectl get pod
```

![](images/k8s-actual-04.png)

#### 3、`Kubernetes Dashboard`可视化界面中操作

切换到指定命名空间下 -> `＋` -> `输入并创建`
![](images/k8s-actual-05.png)
![](images/k8s-actual-06.png)

查看日志
![](images/k8s-actual-07.png)
![](images/k8s-actual-08.png)

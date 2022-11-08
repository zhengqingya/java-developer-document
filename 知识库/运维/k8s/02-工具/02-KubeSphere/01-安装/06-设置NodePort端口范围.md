# 设置NodePort端口范围

> tips：以下未实际测试过... 仅临时记录，因为tke没有这个文件

修改master节点

```shell
vim /etc/kubernetes/manifests/kube-apiserver.yaml

# 添加参数
--service-node-port-range=20000-22767


# 重启apiserver
# 获得 apiserver 的 pod 名字
export apiserver_pods=$(kubectl get pods --selector=component=kube-apiserver -n kube-system --output=jsonpath={.items..metadata.name})
# 删除 apiserver 的 pod
kubectl delete pod $apiserver_pods -n kube-system

# 验证结果
kubectl describe pod $apiserver_pods -n kube-system
```
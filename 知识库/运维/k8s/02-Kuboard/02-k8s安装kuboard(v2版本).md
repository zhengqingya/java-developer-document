# K8S 安装 Kuboard v2

> 可参考： https://www.kuboard.cn

Kuboard 是基于 Kubernetes 的微服务管理界面。同时提供 Kubernetes 免费中文教程，入门教程。

```shell
kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml

kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kuboard-user | awk '{print $1}')

# 获取token
echo $(kubectl -n kube-system get secret $(kubectl -n kube-system get secret | grep ^kuboard-user | awk '{print $1}') -o go-template='{{.data.token}}' | base64 -d)
```

访问： `http://集群任意节点IP:32567/dashboard`

![img.png](images/kuboard-dashboard-v2.png)

--- 

相关日志：

```shell
[root@VM-188-7-centos ~]# kubectl apply -f https://kuboard.cn/install-script/kuboard.yaml
deployment.apps/kuboard created
service/kuboard created
serviceaccount/kuboard-user created
clusterrolebinding.rbac.authorization.k8s.io/kuboard-user created
serviceaccount/kuboard-viewer created
clusterrolebinding.rbac.authorization.k8s.io/kuboard-viewer created
[root@VM-188-7-centos ~]# kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kuboard-user | awk '{print $1}')
Name:         kuboard-user-token-4tbwj
Namespace:    kube-system
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: kuboard-user
              kubernetes.io/service-account.uid: 10a1dd21-fe36-4dcd-bd68-4be687b159c1

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  11 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6Ik92Zi1uR2dPVGdRMXBvejlRSW5mUEdwZEptSzNJX1lMTnFYWEdsMkVvR28ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXVzZXItdG9rZW4tNHRid2oiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoia3Vib2FyZC11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMTBhMWRkMjEtZmUzNi00ZGNkLWJkNjgtNGJlNjg3YjE1OWMxIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmt1Ym9hcmQtdXNlciJ9.eHvTLbbuC00DbsqSOZ-ZhBhTCd0fDItVXvQv5RFoYr5jQQi2Eb_soC4bFXP1VcUEbQEkSnfRucCpfe-p11LxEQ-c8eUFtnkIrrvh8_SrpYt3mOWNvdauuXFD56-RUdLh7cZBzYL2nipGLD9UgA3HGojfNCHDJjo0uRYiH16OL_R20PJc61pnf1G6JxE__XTuUqSEKhEvAEjl77A_a18RsBI40Zp8Wg29Cnxzec-YRX9hkgiZpXXwZXrX0ySp49YG-KI-4mzXSAZxg0X73r0TYMc6rMMq2kFEsp8eRveDnqrF31jEYTddGksMYQa6yiU-ejcmr68f9T8XRhrRE1Rz6g
[root@VM-188-7-centos ~]#
```

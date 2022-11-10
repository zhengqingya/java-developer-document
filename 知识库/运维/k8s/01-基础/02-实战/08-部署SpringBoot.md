# 部署SpringBoot

```shell
# 创建namespace
kubectl create namespace my-project

# 查看
kubectl get namespace

# 删除
kubectl delete namespaces my-project

# 使用 kubectl 部署
kubectl apply -f k8s-deploy-springboot.yml

# 查看
kubectl get pods -n my-project

# 查看日志
kubectl logs -f springboot-app-7685f98c59-t5bng -n my-project

# 删除部署
kubectl delete -f k8s-deploy-springboot.yml
```

见 [k8s-deploy-springboot.yml](k8s-deploy-springboot.yml)

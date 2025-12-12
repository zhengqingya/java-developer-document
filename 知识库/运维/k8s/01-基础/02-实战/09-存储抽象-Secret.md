# Secret -- 保存密码等敏感数据

> Secret 对象类型用来保存敏感信息，ex：密码、OAuth令牌、SSH密钥。

```shell
# 命令格式
kubectl create secret docker-registry docker-secret-zhengqingya \
    --docker-server=镜像仓库服务器 \
    --docker-username=用户名 \
    --docker-password=密码 \
    --docker-email=邮箱地址

# ex:
kubectl create secret docker-registry docker-secret-zhengqingya \
    --docker-server=registry.cn-hangzhou.aliyuncs.com \
    --docker-username=zhengqingya \
    --docker-password=xxx \
    --docker-email=xxx@qq.com
  
# 查看
kubectl get secret
kubectl get secret docker-secret-zhengqingya -oyaml

# 对密码进行base64解密查看
echo 'emhxxxnLg==' | base64 --decode
```

![](images/k8s-actual-44.png)

测试

```shell
cat <<EOF | sudo tee ./docker-secret-test.yaml

apiVersion: v1
kind: Pod
metadata:
  name: private-nginx
spec:
  containers:
  - name: private-nginx
    image: registry.cn-hangzhou.aliyuncs.com/zhengqing/nginx
  imagePullSecrets:
  - name: docker-secret-zhengqingya   # 使用自己的密钥信息
            
EOF


# 创建
kubectl apply -f docker-secret-test.yaml
# 删除
kubectl delete -f docker-secret-test.yaml
```

---

> 今日分享语句：
> 生活可以是甜的，也可以是苦的，但不能是没味的。你可以胜利，也可以失败，但你不能屈服。

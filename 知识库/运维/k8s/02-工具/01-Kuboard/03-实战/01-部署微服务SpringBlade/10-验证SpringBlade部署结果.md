# 验证SpringBlade部署结果

| 软件        | URL                         |
| ----------- |-----------------------------|
| `nacos`     | `http://任意节点IP:32000/nacos` |
| `sentinel`  | `http://任意节点IP:32100`       |
| `saber-web` | `http://任意节点IP:32102`       |

### `名称空间` -> `spring-blade` -> `概要`

![img.png](images/kuboard-springblade-schema.png)

### 问题： `FailedScheduling 0/3 nodes are available: 3 Too many pods.`

![img.png](images/kuboard-springblade-problem-FailedScheduling.png)

腾讯云tke的节点pod数量限制

![img.png](images/tke-cluster-pod-num-01.png)

增大一点即可...

![img.png](images/tke-cluster-pod-num-02.png)


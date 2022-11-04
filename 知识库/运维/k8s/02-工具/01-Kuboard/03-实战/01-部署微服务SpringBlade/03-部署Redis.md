# 部署Redis

### 1、创建 StatefulSet

#### ->`基本信息`

![img_22.png](images/kuboard-springblade-redis-01.png)

#### ->`容器信息`

| 字段名称            | 字段值                                            | 备注 |
|-----------------|------------------------------------------------| ---- |
| 名称              | `redis`                                        |      |
| 容器镜像            | `swr.cn-east-2.myhuaweicloud.com/blade/redis:5.0.2-alpine` |      |
| 镜像拉取策略          | `始终拉取新镜像（Always）`                              |      |
| 命令参数            | 命令 `redis-server --appendonly yes`             |      |
| 资源请求/限制         | 内存资源请求：`100Mi` 内存资源限制：`1024Mi`                 |      |
| 容器端口            | `TCP` `redis` `6379`                           |      |
| 健康检查-->容器启动检查探针 | 探测方式： `TCP连接` TCP端口： `6379` 不健康阈值：`20`         |      |
| 健康检查-->容器存活检查探针 | 探测方式： `TCP连接` TCP端口： `6379`                    |      |
| 健康检查-->容器就绪检查探针 | 探测方式： `TCP连接` TCP端口： `6379`                    |      |

![img_21.png](images/kuboard-springblade-redis-02.png)

![img_23.png](images/kuboard-springblade-redis-03.png)

#### ->`存储挂载`

![img_24.png](images/kuboard-springblade-redis-04.png)

#### ->`高级设置`

![img_25.png](images/kuboard-springblade-redis-05.png)

#### ->`服务/应用路由`

![img_26.png](images/kuboard-springblade-redis-06.png)

保存操作

![img_27.png](images/kuboard-springblade-redis-07.png)

### 2、验证部署结果

![img_28.png](images/kuboard-springblade-redis-08.png)

![img_29.png](images/kuboard-springblade-redis-09.png)

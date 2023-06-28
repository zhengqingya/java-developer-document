# rabbitmqctl管理工具

```shell
# 进入容器
docker exec -it rabbitmq /bin/bash

# 查看帮助
rabbitmqctl help

# 查看 RabbitMQ 服务的状态
rabbitmqctl status
# 查看用户
rabbitmqctl list_users
# 查看队列
rabbitmqctl list_queues [-p vhost]
# 查看exchanges
rabbitmqctl list_exchanges [-p vhost]
# 查看连接
rabbitmqctl list_connections
# 查看消费者信息
rabbitmqctl list_consumers
# 查看环境变量
rabbitmqctl environment
```

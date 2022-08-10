# Redis是什么?

> [https://redis.io](https://redis.io)

Redis 是一个开源（BSD 许可）的内存数据结构存储，用作数据库、缓存和消息代理。Redis 提供数据结构，例如字符串、散列、列表、集合、具有范围查询的排序集合、位图、超日志、地理空间索引和流。Redis 具有内置复制、Lua 脚本、LRU 驱逐、事务和不同级别的磁盘持久性，并通过 Redis Sentinel 和 Redis Cluster 自动分区提供高可用性。

单线程模型，6.0 之后多线程 （修改配置开启 io-threads-do-reads yes）

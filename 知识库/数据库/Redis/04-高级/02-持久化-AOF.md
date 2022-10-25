# 持久化

## AOF

日志文件追加记录
实时持久化,数据安全性更高.持久化效率低
当aof文件过大时，会进行重写，即命令压缩(根据类型使用一条命令来替代之前的键值对多条命令)

### 启用AOF

redis.conf

```shell
# 是否开启aof
appendonly yes

# 文件存放目录，与RDB共用。默认为当前工作目录。
dir ./

# 文件名称
appendfilename "appendonly.aof"


# 同步方式
# always：   每次操作都会立即写入aof文件中
# everysec： 每秒持久化一次(默认配置)
# no：       由操作系统决定，一般而言为了提高效率，操作系统会等待缓存区被填满，才会开始同步数据到磁盘。
appendfsync everysec


# 重写触发配置
# Redis会记住自从上一次重写后AOF文件的大小（如果自Redis启动后还没重写过，则记住启动时使用的AOF文件的大小）。
# 如果当前的文件大小比起记住的那个大小超过指定的百分比，则会触发重写。
# 同时需要设置一个文件大小最小值，只有大于这个值文件才会重写，以防文件很小，但是已经达到百分比的情况。
auto-aof-rewrite-percentage 100
# 禁用自动的日志重写功能 -- 百分比设置为0
# auto-aof-rewrite-percentage 0
auto-aof-rewrite-min-size 64mb


# aof重写期间是否同步
no-appendfsync-on-rewrite no
```

---

# 其它

两种方式的持久化是可以同时存在的，但是当Redis重启时，AOF文件会被优先用于重建数据。

# mysqlslap

> 性能压力测试工具

模拟MySQL服务器的客户端负载并报告每个阶段的时间。就像多个客户端正在访问服务器一样。

mysqlslap运行在三个阶段：

1. 创建架构，表以及可选的任何存储程序或数据以用于测试。此阶段使用单个客户端连接。
2. 运行负载测试。此阶段可以使用许多客户端连接。
3. 清理（断开连接，如果有指定的话放下桌子）。此阶段使用单个客户端连接。

```shell
# –defaults-file，配置文件存放位置
# –concurrency，并发数
# –engines，引擎
# –iterations，迭代的实验次数
# –socket，socket 文件位置
# 
# 自动测试：
# –auto-generate-sql，自动产生测试 SQL
# –auto-generate-sql-load-type，测试 SQL 的类型。类型有 mixed，update，write，key，read。
# –number-of-queries，执行的 SQL 总数量
# –number-int-cols，表内 int 列的数量
# –number-char-cols，表内 char 列的数量


# 并发100个连接测试
mysqlslap --no-defaults -hlocalhost -uroot -proot -P3306 -a -c 100

# 执行一次测试，分别100和200个并发，执行5000次总查询
mysqlslap --no-defaults -hlocalhost -uroot -proot -P3306 -a --concurrency=100,200 --number-of-queries 5000 --iterations=5


# 测试100个并发线程，测试次数1次，自动生成SQL测试脚本，读、写、更新混合测试，自增长字段，测试引擎为innodb，共运行5000次查询
mysqlslap --no-defaults -hlocalhost -uroot -proot -P3306 --concurrency=100 --iterations=1 --auto-generate-sql --auto-generate-sql-load-type=mixed --auto-generate-sql-add-autoincrement --engine=innodb --number-of-queries=5000

# 并发100 次数10
mysqlslap --no-defaults -hlocalhost -uroot -proot -P3306 -a -c 100 -i 10
```


```shell
# 查看数据库最大连接数
SHOW GLOBAL VARIABLES LIKE 'max_conn%';

# 查看当前连接数
show status like 'Threads%';
# 或
show full processlist;
```

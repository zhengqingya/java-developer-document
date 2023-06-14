# 问题

启动 https://gitee.com/dromara/RuoYi-Vue-Plus 项目中的`ruoyi-admin`模块时

```shell
2023-06-14 11:01:58 [main] ERROR com.zaxxer.hikari.pool.HikariPool - master - Exception during pool initialization.
java.sql.SQLException: null,  message from server: "Host '172.22.0.1' is blocked because of many connection errors; unblock with 'mysqladmin flush-hosts'"
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:130)
```

这个的意思是当一个ip连续多次出现错误后,mysql就会 中断这个ip的连接,抛出 mysqladmin flush-host

同一个ip在短时间内产生太多（超过mysql数据库max_connect_errors的最大值）中断的数据库连接而导致的阻塞。

```shell
show variables like "max_connections";
show variables like "max_connect_errors";

# 获取 IP 连接错误数的大小 （ 这个查询会从 information_schema.processlist 视图中筛选出连接状态为 "Access denied" 的进程，并统计每个 IP 对应的错误次数。 ）  经测试不能正常查出来...
SELECT SUBSTRING_INDEX(host, ':', 1) AS ip, COUNT(*) AS error_count
FROM information_schema.processlist
WHERE COMMAND = 'Connect' AND STATE = 'Access denied'
GROUP BY ip;
```

# 解决

> tips： 我是本地报错，用的 `flush hosts;` 方式解决

### 法一

提高连接错误数

临时修改

```shell
set global max_connect_errors=1000;
```

永久修改的话需要修改`my.cnf`配置文件

### 法二

清理hosts文件

```shell
flush hosts;
```


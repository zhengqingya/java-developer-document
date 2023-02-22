# 关闭SSL验证

> tips: 这个有需要再操作！！！
> 下面演示环境 MySQL5.7

查看是否开启SSL

```shell
SHOW VARIABLES LIKE '%ssl%';

# YES标识开启
# have_openssl	YES
# have_ssl	YES
```

修改配置文件`my.cnf`

```
[mysqld]

# 关闭SSL验证
skip_ssl
```

重启MySQL，再次查看

```shell
SHOW VARIABLES LIKE '%ssl%';

# have_openssl	DISABLED
# have_ssl	DISABLED
```

# MySQL

### 提供MySQL数据库驱动

> https://mvnrepository.com/artifact/mysql/mysql-connector-java

ex: 将 `mysql-connector-java-8.0.25.jar` 放到 `plugins/jdbc/lib/` 目录下

### 新增配置文件 `config/seatunnel.mysql.conf.template`

连接器配置见

- https://seatunnel.apache.org/docs/2.3.0/connector-v2/source/Jdbc
- https://seatunnel.apache.org/docs/2.3.0/connector-v2/sink/Jdbc

```
env { 
  execution.parallelism = 1
  job.mode = "BATCH"
}
 
source {
  Jdbc {
    url = "jdbc:mysql://172.16.16.88:3306/demo"
    driver = "com.mysql.cj.jdbc.Driver"
    connection_check_timeout_sec = 100
    user = "root"
    password = "root"
    query = "select * from t_test"
  }
}
 
transform {
}
 
sink {
  jdbc {
    url = "jdbc:mysql://172.16.16.88:3306/demo-bak"
    driver = "com.mysql.cj.jdbc.Driver"
    user = "root"
    password = "root"
    table = "t_test"
  }
  
}
```

### 运行

```shell
sh ./bin/seatunnel.sh --config ./config/seatunnel.mysql.conf.template -e local
```

### 问题

报错：`Plugin PluginIdentifier{engineType='seatunnel', pluginType='source', pluginName='Jdbc'} not found`
![img.png](images/jdbc-not-found.png)

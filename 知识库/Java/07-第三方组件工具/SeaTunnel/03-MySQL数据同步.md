# MySQL

### 一、下载

```shell
export version="2.3.0"
wget "https://archive.apache.org/dist/incubator/seatunnel/${version}/apache-seatunnel-incubating-${version}-bin.tar.gz"
tar -xzvf "apache-seatunnel-incubating-${version}-bin.tar.gz"
```

### 二、配置

#### 1、`config/plugin_config`配置

配置需要的插件`config/plugin_config`，插件名可参考`connectors/plugins-mapping.properties`

```
--connectors-v2--
connector-cdc-mysql
connector-jdbc
--end--
```

安装

```shell
# 先替换`bin/install-plugin.sh`中的 `${SEATUNNEL_HOME}/mvnw` 为 `mvn`  =>  使用自己本地配置的maven，不然后面安装插件会很慢...
sh bin/install-plugin.sh
# 安装后连接器在`connectors`目录下
```

#### 2、提供MySQL数据库驱动

> https://mvnrepository.com/artifact/mysql/mysql-connector-java

ex: 将 `mysql-connector-java-8.0.25.jar` 放到 `plugins/jdbc/lib/` 目录下

#### 3、新增配置文件 `config/seatunnel.mysql.conf.template`

连接器配置见

- https://seatunnel.apache.org/docs/2.3.0/connector-v2/source/Jdbc
- https://seatunnel.apache.org/docs/2.3.0/connector-v2/sink/Jdbc

> `demo`库下的`t_test`表数据同步到`demo-bak`库中

```
env { 
  execution.parallelism = 1
  job.mode = "BATCH"
}
 
source {
  Jdbc {
    url = "jdbc:mysql://127.0.0.1:3306/demo"
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
    url = "jdbc:mysql://127.0.0.1:3306/demo-bak"
    driver = "com.mysql.cj.jdbc.Driver"
    user = "root"
    password = "root"
    table = "t_test"
  }
  
}
```

### 三、运行

```shell
sh ./bin/seatunnel.sh --config ./config/seatunnel.mysql.conf.template -e local
```

---

### 问题

报错：`Plugin PluginIdentifier{engineType='seatunnel', pluginType='source', pluginName='Jdbc'} not found`
![img.png](images/jdbc-not-found.png)

之前在Linux上是通过链接直接下载的资源`https://dlcdn.apache.org/incubator/seatunnel/2.3.0/apache-seatunnel-incubating-2.3.0-bin.tar.gz`

下班回家在Mac上通过以下方式下载的，再运行就没报错了...

```shell
export version="2.3.0"
wget "https://archive.apache.org/dist/incubator/seatunnel/${version}/apache-seatunnel-incubating-${version}-bin.tar.gz"
tar -xzvf "apache-seatunnel-incubating-${version}-bin.tar.gz"
```
# 本地IDE运行

### 1、拉取代码

```shell
git clone https://github.com/PowerJob/PowerJob.git
```

### 2、创建库

```shell
CREATE DATABASE IF NOT EXISTS `powerjob-daily` DEFAULT CHARSET utf8mb4;
```

### 3、运行调度服务器 `powerjob-server/powerjob-server-starter`

修改配置 `application-daily.properties`

```
spring.datasource.core.jdbc-url=jdbc:mysql://localhost:3306/powerjob-daily?allowMultiQueries=true&useUnicode=true&characterEncoding=UTF8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
spring.datasource.core.username=root
spring.datasource.core.password=root
```

运行`PowerJobServerApplication`

### 4、运行示例工程 `powerjob-worker-samples`

运行`SampleApplication`

### 5、访问

http://127.0.0.1:7700

点击右上角`执行应用注册`
![img.png](images/powerjob-ide-01.png)

登陆
![img.png](images/powerjob-ide-02.png)

### 6、`任务管理` -> `新建任务`

![img.png](images/powerjob-ide-03.png)


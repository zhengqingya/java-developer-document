# maven将jar包安装到本地仓库

项目中pom待引入jar包依赖如下

```
<dependency>
    <groupId>com.zhengqing</groupId>
    <artifactId>app-demo</artifactId>
    <version>0.0.1.release</version>
</dependency>
```

> maven安装jar包命令

```shell
mvn install:install-file -DgroupId=com.zhengqing -DartifactId=app-demo -Dversion=0.0.1.release -Dfile=/home/soft/app-jar/app-demo-2.0.0.jar -Dpackaging=jar
```

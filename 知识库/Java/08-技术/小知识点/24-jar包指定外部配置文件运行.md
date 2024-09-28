# jar包指定外部配置文件运行

```shell
# `my-application.properties`: 和jar包在同一目录下的外部配置文件
# `application.properties`: jar包内部配置文件
# tips: 打包前注释掉内部`application.properties`配置文件，外部的才可以生效
java -jar -Dspring.config.location=my-application.properties,classpath:application.properties, ./app.jar
```


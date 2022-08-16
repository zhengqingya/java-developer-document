### gradle.properties

定义 系统属性、环境变量、项目属性、JVM 相关配置信息

> https://docs.gradle.org/current/userguide/build_environment.html#sec%3Agradle_configuration_properties

```
# jvm
org.gradle.jvmargs=-Xms1024m -Xmx1024m
# 开启gradle缓存
org.gradle.caching=true
# 开启并行编译
org.gradle.parallel=true
# 启用新的孵化模式
org.gradle.configureondemand=true
# 开启守护进程
org.gradle.daemon=true
```
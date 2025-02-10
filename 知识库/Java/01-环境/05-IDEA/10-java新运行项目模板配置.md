# java新运行项目配置

`File` -> `New Projects Setup` -> `Run Configuration Templates...`

![](images/idea-set-new-projects-run-configuration-templates.png)

idea每次打开新项目时，设置jvm启动默认参数 => 调优节省本地内存空间

```
-Xmx100M -Xms100M -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+HeapDumpOnOutOfMemoryError
```

### `Spring Boot`

![](images/idea-set-new-projects-run-configuration-templates-springboot.png)

![](images/idea-set-new-projects-run-configuration-templates-springboot-jar.png)

### `JUnit`

```
-Xmx100M -Xms100M -XX:+UseG1GC
```

![](images/idea-set-new-projects-run-configuration-templates-junit.png)

### `Application`

> main方法运行

```
-Xmx100M -Xms100M -XX:+UseG1GC
```

![](images/idea-set-new-projects-run-configuration-templates-main.png)


### 实时强制Maven检查SNAPSHOT更新

![](./images/36-实时强制Maven检查SNAPSHOT更新-1735286369466.png)

Always update snapshots: 始终更新快照。
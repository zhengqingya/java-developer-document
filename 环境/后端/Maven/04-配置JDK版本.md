### Maven - 配置JDK版本

修改`${MAVEN_HOME}\conf\settings.xml`

```
<profiles>
    <!-- 全局配置项目JDK版本 -->
    <profile>
        <id>jdk1.8</id>
        <activation>
            <activeByDefault>true</activeByDefault>
            <jdk>1.8</jdk>
        </activation>
        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
            <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
        </properties>
    </profile>
</profiles>
```

![maven-set-jdk.png](images/maven-set-jdk.png)
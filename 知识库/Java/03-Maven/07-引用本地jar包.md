`pom.xml`引入本地jar包

```xml
<!-- 本地jar包依赖 -->
<dependencies>
    <dependency>
        <groupId>com.zhengqing.common</groupId>
        <artifactId>common</artifactId>
        <version>1.0.0</version>
        <scope>system</scope>
        <systemPath>${pom.basedir}/src/main/resources/lib/common-1.0.0.jar</systemPath>
    </dependency>
</dependencies>
```

通过上面方式引入本地jar包后，打包时并不会将本地jar包一起打包，还需要如下配置

```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <!-- 作用:项目打成jar时把本地jar包也引入进去 -->
                <includeSystemScope>true</includeSystemScope>
            </configuration>
        </plugin>
    </plugins>
</build>
```

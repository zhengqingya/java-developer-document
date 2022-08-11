`pom.xml`

```xml
<!-- springboot打包插件 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>${spring-boot.version}</version>
            <configuration>
                <finalName>${project.build.finalName}</finalName>
                <!-- 作用:项目打成jar，同时把本地jar包也引入进去 -->
                <includeSystemScope>true</includeSystemScope>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <!-- 可以把依赖的包都打包到生成的Jar包中 -->
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```
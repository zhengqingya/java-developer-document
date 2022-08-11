### 编译xml文件

maven默认不编译xml文件

> 此配置可解决mybatis中mapper与xml映射关系不对应问题

`pom.xml`

```
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
    <testResources>
        <testResource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </testResource>
    </testResources>
</build>
```
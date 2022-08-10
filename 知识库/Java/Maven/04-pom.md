`pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <!-- 坐标信息 -->
    <!-- 某公司或组织 通常与域名反向一一对应 -->
    <groupId>com.zhengqing</groupId>
    <!-- 项目模块名 -->
    <artifactId>maven-demo</artifactId>
    <!-- 版本 -->
    <version>0.0.1-SNAPSHOT</version>

    <!-- 打包方式:jar、war、pom（标识当前工程管理其它工程，ex:微服务父子工程） -->
    <packaging>jar</packaging>

    <!-- 当前项目名 -->
    <name>maven-demo</name>
    <!-- 当前项目描述 -->
    <description>maven-demo</description>

    <!-- 定义属性值 -->
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <!-- jar依赖 -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <!-- jar依赖作用域 -->
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```
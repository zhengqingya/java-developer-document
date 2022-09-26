### 前言

1. **本次目的**：将jar包上传到maven远程中央仓库上
2. **作用**：在Java - maven项目中可在pom文件中引入相应jar包依赖
3. **问题**：maven不支持直接上传jar包
4. **解决**：将jar包部署到第三方Maven仓库（如：sonatype ossrh仓库）中，之后再将jar包同步更新到Maven中央仓库中
5. **Sonatype OSSRH官方介绍地址**：https://central.sonatype.org/pages/ossrh-guide.html
6. **中央组件要求**：https://central.sonatype.org/pages/requirements.html
7. **Maven部署到OSSRH参考配置文档**： https://central.sonatype.org/pages/apache-maven.html

### 一、注册sonatype账号：【申请上传资格】

https://issues.sonatype.org/secure/Signup!default.jspa
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624114719621.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
如下注册成功！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624115239574.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 二、登录

https://issues.sonatype.org/secure/Dashboard.jspa
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624115900673.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
登录成功进来之后可选择自己喜欢的语言显示~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624122551986.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
接下来的就是创建头像等等了，这里不多说

进来之后如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624140008456.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 三、新建issue

https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134

> **My issue : https://issues.sonatype.org/browse/OSSRH-49683**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624141507639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
创建之后如下，等待审核...

> Status状态从OPEN变成RESOLVED表示成功！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190624141724571.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
小编第一次创建后审核失败，现如今改成如下，再看看是否成功吧~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625234907804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625091516120.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
第二次审核失败，修改如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625234835345.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625234733425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
第三次审核失败，修改如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626085120695.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062608522157.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
在第三次修改后，没有任何回复，这时我就重新创建了一个issue，如下审核成功，这次审核速度就非常快了，可能也就几分钟过后就通过了，如下Status状态从OPEN变成了RESOLVED ~
https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134    
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627093418654.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

#### 新建issue遇坑问题总结：

1. 这里可以采用github作为Group Id、Project URL、SCM url
2. 如何使用github的信息呢？
   ① Group Id：填写com.github.xx -> xx为github用户名
   ② Project URL：刚创建时随便填写一个github中已有的一个开放仓库名，创建后修改为与之对应的名称，如下：
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627094135638.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
   ③ SCM url：填写github中的仓库名.git
3. 用户名设置不要太长，因为小编之前填写名称过长，被要求过重新创建新账号

### 四、构件仓库上传jar包：https://oss.sonatype.org/#welcome

> 将jar包上传到这里，Release 之后就会同步到maven中央仓库

#### 1、本地安装gpg，并使用gpg生成密钥对

> 注：发布到Maven仓库中的所有文件都要使用GPG签名，以保障完整性。

##### ① 下载安装gpg4win

Windows系统下载地址： https://www.gpg4win.org/download.html

安装很简单，如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627145958607.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627150053484.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627150109488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
因为我们只需要GnuPG，所以其它的可以不必勾选
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627150325388.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627150404189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062715042383.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627150448205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
cmd执行如下命令验证是否安装成功：

```java
gpg--version
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627150929325.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

##### ② 使用gpg生成密钥对

cmd执行如下命令：

```java
gpg--gen-key
```

【注】输入的 **Passphrase** 值相当于密钥的密码，后面会用到！！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627153204208.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
如果ok之后出现如下界面，是提示密码安全度不高，需要包含至少一个数字或特殊字符~ 重新输入一下即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062715292373.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627153128810.png)
ok之后，我们的密钥对就设置好了
【注】，下图中的 **448854BCFF61E7F7** 相当于我们生成的key，后面要用到！！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190701150608183.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

##### ③ 上传GPG公钥

> 目的：将公钥上传到公共的密钥服务器（也就是上传到第三方的key验证库）让其他人可以通过公钥来验证jar包的完整性

查看公钥

```java
gpg--list-keys
```

其中3408AAAFEE3AB847DE82602B448854BCFF61E7F7为公钥ID
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190701112937982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
将公钥或key发布到 PGP 密钥服务器（注：这里我暂时未发现有何区别~）

```java
gpg--keyserver hkp://pool.sks-keyservers.net --send-keys 公钥ID或上面提到的key
        gpg--keyserver hkp://keyserver.ubuntu.com:11371 --send-keys 公钥ID或上面提到的key
```

查询公钥是否发布成功

```java
gpg--keyserver hkp://pool.sks-keyservers.net --recv-keys 公钥ID或上面提到的key
        gpg--keyserver hkp://keyserver.ubuntu.com:11371 --recv-keys 公钥ID或上面提到的key
```

#### 2、在maven的setting.xml配置文件中添加如下节点信息：

```xml

<servers>
    <!-- 上传jar包到maven中央仓库配置start -->
    <server>
        <id>ossrh</id>
        <username>Sonatype账号</username>
        <password>Sonatype密码</password>
    </server>
    <!-- 上传jar包到maven中央仓库配置end -->
</servers>
```

#### 3、配置项目的pom.xml文件

> 可参考Sonatype提供的要求： https://central.sonatype.org/pages/requirements.html
> Sonatype提供的pom文件demo：https://github.com/simpligility/ossrh-demo/blob/master/pom.xml

我的pom文件配置如下：https://github.com/zhengqingya/OSSRH-49683/blob/master/pom.xml

```xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.github.zhengqing</groupId>
    <artifactId>OSSRH-49683</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>${project.groupId}:${project.artifactId}</name>
    <description>The test uploads the jar to the maven central repository</description>
    <url>https://github.com/zhengqingya/OSSRH-49683</url>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>${java.version}</maven.compiler.source>
        <maven.compiler.target>${java.version}</maven.compiler.target>
        <maven.deploy.skip>true</maven.deploy.skip>
    </properties>

    <dependencies>
        <!-- ... -->
    </dependencies>

    <!-- 许可证信息 -->
    <licenses>
        <!-- Apache许可证 -->
        <license>
            <name>The Apache Software License, Version 2.0</name>
            <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
        </license>
        <!-- MIT许可证 -->
        <!--	<license>
                <name>MIT License</name>
                <url>http://www.opensource.org/licenses/mit-license.php</url>
            </license>-->
    </licenses>
    <!-- SCM信息 -> git在github上托管 -->
    <scm>
        <connection>scm:git:git://github.com/zhengqingya/OSSRH-49683.git</connection>
        <developerConnection>scm:git:ssh://github.com/zhengqingya/OSSRH-49683.git</developerConnection>
        <url>https://github.com/zhengqingya/OSSRH-49683/tree/master</url>
    </scm>
    <!-- 开发者信息 -->
    <developers>
        <developer>
            <name>zhengqingya</name>
            <email>960869719@qq.com</email>
            <url>https://github.com/zhengqingya</url>
        </developer>
    </developers>

    <!-- 使用个人资料：由于生成javadoc和源jar以及使用GPG签署组件是一个相当耗时的过程，因此这些执行通常与正常的构建配置隔离并移动到配置文件中。然后，在通过激活配置文件执行部署时，将使用此配置文件。 -->
    <profiles>
        <profile>
            <id>ossrh</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <build>
                <plugins>
                    <!-- 要生成Javadoc和Source jar文件，您必须配置javadoc和源Maven插件 -->
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-source-plugin</artifactId>
                        <version>2.2.1</version>
                        <executions>
                            <execution>
                                <id>attach-sources</id>
                                <goals>
                                    <goal>jar-no-fork</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-javadoc-plugin</artifactId>
                        <version>2.9.1</version>
                        <executions>
                            <execution>
                                <id>attach-javadocs</id>
                                <goals>
                                    <goal>jar</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                    <!--  必须配置GPG插件用于使用以下配置对组件进行签名 -->
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-gpg-plugin</artifactId>
                        <version>1.5</version>
                        <executions>
                            <execution>
                                <id>sign-artifacts</id>
                                <phase>verify</phase>
                                <goals>
                                    <goal>sign</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                </plugins>
            </build>
            <!-- 【注】snapshotRepository 与 repository 中的 id 一定要与 setting.xml 中 server 的 id 保持一致！ -->
            <distributionManagement>
                <snapshotRepository>
                    <id>ossrh</id>
                    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
                </snapshotRepository>
                <repository>
                    <id>ossrh</id>
                    <url>https://oss.sonatype.org/service/local/staging/deploy/maven2/</url>
                </repository>
            </distributionManagement>
        </profile>
    </profiles>

</project>
```

#### 4、部署和发布Jar包

###### 方法一： 命令

部署命令如下：

```java
mvn clean deploy
```

当我们的项目中含有多个模块时，我们可以使用 **-projects** 来指定部署哪一个模块

**举例：**

1. 部署一个模块如下： 【demo和demo2为模块名】
   ```
   mvn clean deploy -projects demo
   ```
2. 部署两个模块如下：
   ```
   mvn clean deploy -projects demo,demo2
   ```

###### 方法二： idea图形化 -> 直接双击deploy

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627171640655.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

【注】第一次执行时需要输入之前设置的passphrase密码 ~
> 如果不想出现此，也可在一开始直接执行如下命令：
```
mvn clean deploy -P sonatype-oss-release -Darguments="gpg.passphrase=设置gpg密钥时输入的Passphrase"
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190627171347817.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

##### 上传所遇问题

如果出现上传问题，可以尝试将 https://oss.sonatype.org/#stagingRepositories 上之前上传的错误项目全部删除【选中点击Drop即可删除】，然后再次上传~
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190701135516639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

最后成功如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019070117500660.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
本地仓库：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190702092712200.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 五、同步到maven中央仓库

到 https://oss.sonatype.org/#stagingRepositories 中勾选自己上传的构件（我们的jar包上传到这里哦）点击Close然后再Release，Release之后就会同步到maven中央仓库
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190702092911688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

最终到 [maven中央仓库](https://mvnrepository.com/) 中就可以搜索到了







>
Windows安装教程可参考：[https://zhengqing.blog.csdn.net/article/details/95232353](https://zhengqing.blog.csdn.net/article/details/95232353)

### 一、安装JDK

```shell
# 通过yum安装的默认路径为：`/usr/lib/jvm`
yum -y install java-1.8.0-openjdk*
```

###### 配置环境变量

```shell
vi /etc/profile
```

在文件最后加入以下内容：

```shell
############################## ↓↓↓↓↓↓ set java environment ↓↓↓↓↓↓ #############################
JAVA_HOME=/usr/lib/jvm/java
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/jre/lib/rt.jar
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME CLASSPATH PATH
###############################################################################################
```

###### 使配置生效

```shell
. /etc/profile
```

###### 查看java环境配置

```shell
echo $JAVA_HOME
echo $PATH
```

###### 验证

```shell
java
javac
java -version
```

###### 如何卸载JDK？？？

```shell
# 查看CentOS自带JDK是否已安装:
yum list installed | grep java
# 如果存在自带的jdk，删除自带的jdk
yum -y remove java-1.8.0-openjdk*
yum -y remove tzdata-java.noarch
```

温馨小提示：这里创建目录存放之后要下载的安装包

```shell
mkdir -p /zhengqingya/soft
cd /zhengqingya/soft
```

### 二、安装Maven

```shell
# 法一：
# 安装yum配置工具
yum install -y yum-utils
# 使用配置工具配置第三方epel源仓库
yum-config-manager --add-repo http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo
yum-config-manager --enable epel-apache-maven
# 安装maven
yum install -y apache-maven

# --------------------------- 法一失败 -------------------------------

# 法二：
#配置源
wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
#安装
yum install -y maven

# --------------------------- 法二失败 -------------------------------

# 法三：【成功】
# 下载`apache-maven-3.6.3-bin.tar.gz` : http://maven.apache.org/download.cgi
wget https://mirrors.bfsu.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
# 解压
tar -zxvf apache-maven-3.6.3-bin.tar.gz
```

###### 配置环境变量

```shell
vi /etc/profile
```

```shell
############################## ↓↓↓↓↓↓ set maven environment ↓↓↓↓↓↓ #############################
MAVEN_HOME=/zhengqingya/soft/apache-maven-3.6.3
PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin
export MAVEN_HOME PATH
################################################################################################
```

###### 使配置生效

```shell
source /etc/profile
```

###### 验证

```shell
mvn -v
```

### 三、安装NodeJS

```shell
# 下载`node-v12.18.3-linux-x64.tar.xz` : https://nodejs.org/en/download/
wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
# 解压
tar -xvf node-v12.18.3-linux-x64.tar.xz
```

###### 配置环境变量

```shell
vi /etc/profile
```

```shell
############################## ↓↓↓↓↓↓ set nodejs environment ↓↓↓↓↓↓ #############################
NODEJS_HOME=/zhengqingya/soft/node-v12.18.3-linux-x64
PATH=$PATH:$NODEJS_HOME/bin
export NODEJS_HOME PATH
#################################################################################################
```

###### 使配置生效

```shell
source /etc/profile
```

###### 验证

```shell
node -v
npm -v
```

```shell
# 将npm软连接到`/usr/bin`目录下 => 解决`sudo: npm：找不到命令`问题
sudo ln -s /zhengqingya/soft/node-v12.18.3-linux-x64/bin/node /usr/bin/node
sudo ln -s /zhengqingya/soft/node-v12.18.3-linux-x64/bin/npm /usr/bin/npm
sudo ln -s /zhengqingya/soft/node-v12.18.3-linux-x64/bin/cnpm /usr/bin/cnpm
sudo ln -s /zhengqingya/soft/node-v12.18.3-linux-x64/bin/npx /usr/lib/npx
```

### 四、安装Tomcat (可选)

```shell
# 下载`apache-tomcat-9.0.38-src.tar.gz` : https://tomcat.apache.org/download-90.cgi
wget https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-9/v9.0.38/src/apache-tomcat-9.0.38-src.tar.gz
# 解压
tar -zxv -f apache-tomcat-9.0.38-src.tar.gz
```

### 五、Git

```shell
yum install -y git
```

### 六、安装Jenkins

```shell
# 创建目录
mkdir -p /zhengqingya/soft/jenkins
cd /zhengqingya/soft/jenkins
# 下载 【 根据自己需要的版本下载 http://mirrors.jenkins.io/war-stable/ 】
wget  http://mirrors.jenkins.io/war-stable/2.235.2/jenkins.war
# 启动 (这里指定新的端口10000运行)
nohup java -jar jenkins.war --ajp13Port=-1 --httpPort=10000 &
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200725134951836.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
运行成功后，jenkins配置方面可参考:
【Jenkins持续集成(二)
】Windows上安装Jenkins教程: [https://zhengqing.blog.csdn.net/article/details/95232353](https://zhengqing.blog.csdn.net/article/details/95232353)

其中`全局工具配置`: [http://ip:10000/jenkins/configureTools/](http://localhost:10000/jenkins/configureTools/)
Liunx配置如下:

> 路径可能有所差异

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200725135350540.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 七、OTHER

```shell
# 关闭jenkins
http://ip:10000/exit 

# 重启jenkies
http://ip:10000/restart 

# 重新加载配置信息
http://ip:10000/reload 
```

---

### 八、Docker如何安装Jenkins？？？

> 参考：[https://gitee.com/zhengqingya/docker-compose](https://gitee.com/zhengqingya/docker-compose)

```shell
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose/Liunx
docker-compose -f docker-compose-jenkins.yml -p jenkins up -d
```

---

> 今日分享语句：
> 真正的强大，不是我们从来没有眼泪，而是流着泪还能微笑着坚定前行。人生总是在前行，那些所有你以为过不去的过去，最后都留在了最后。没有安全感的孩子，会爱音乐，会怕黑，却习惯晚睡。

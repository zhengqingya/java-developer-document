### 安装 Maven

```shell
mkdir -p /home/soft/maven
cd /home/soft/maven
```

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
MAVEN_HOME=/home/soft/maven/apache-maven-3.6.3
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

### Maven配置

```shell
vim /home/soft/maven/apache-maven-3.6.3/conf/settings.xml
```

###### 1、配置本地仓库位置

```
<localRepository>/home/soft/maven/repository</localRepository>
```

###### 2、配置阿里云中央仓库

```
<mirrors>
    <!-- 国内中央仓库的配置-阿里云中央仓库 -->
    <mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
</mirrors>
```


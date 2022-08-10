### Maven

```shell
# 下载`apache-maven-3.6.3-bin.tar.gz` : http://maven.apache.org/download.cgi
wget https://mirrors.bfsu.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
# 解压
x apache-maven-3.6.3-bin.tar.gz

# 配置环境变量
open ~/.bash_profile

############################## ↓↓↓↓↓↓ set maven environment ↓↓↓↓↓↓ #############################
MAVEN_HOME=/zhengqingya/soft/soft-dev/Maven/apache-maven-3.6.3
PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin
export MAVEN_HOME PATH
################################################################################################

# 使配置生效
source ~/.bash_profile

# 解决zsh下找不到mvn命令问题
echo 'source ~/.bash_profile' >> ${ZDOTDIR:-$HOME}/.zshrc
# 更新zsh配置
source ~/.zshrc

# 验证
mvn -v
```
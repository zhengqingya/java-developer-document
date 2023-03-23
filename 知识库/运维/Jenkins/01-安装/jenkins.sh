#!/bin/bash

####################################
# @description jenkins运行脚本
# @params $? => 代表上一个命令执行后的退出状态: 0->成功,1->失败
#         $1 => 脚本第一个参数-操作类型(init|start|stop|restart)
# @example => sh jenkins.sh init & source /etc/profile
# @author zhengqingya
# @date 2021/7/17 3:59 下午
####################################


# 在执行过程中若遇到使用了未定义的变量或命令返回值为非零，将直接报错退出
# set -eu

# 检查参数个数
if [ "${#}" -lt 1 ]; then
	echo "\033[41;37m 脚本使用示例: sh jenkins.sh init(初始化环境)|start(运行)|stop(停止)|restart(重启)  \033[0m"
	exit
fi

# SOFT_DIR='/home/soft'

# 获取脚本第一个参数
APP_OPT=${1}
# 端口
APP_PORT=10000
# 名称
APP_NAME=jenkins
# jar名 | war名
APP_JAR=${APP_NAME}.war
# 程序根目录
APP_JAR_HOME=.
# 日志名
APP_LOG_NAME=jenkins
# 日志根目录
APP_LOG_HOME=.
# 程序运行参数
JAVA_OPTS="--ajp13Port=-1 --httpPort=${APP_PORT} --prefix=/jenkins"

echo "本次操作服务名：[${APP_NAME}]"
echo "本次操作选择：[${APP_OPT}]"

# 初始化环境
function init() {
    install_git
    install_jdk
    install_maven
    install_nodejs
    # 使配置生效
    source /etc/profile
}

function install_git() {
  echo "*******************************************************************************"
  echo "            ↓↓↓↓↓↓ [检查环境：git] ↓↓↓↓↓↓         "
  which git
  # $?: 指上一次命令执行的状态 成功：0 失败：1
  if [ "$?" -eq 1 ]; then
    echo "安装git..."
    yum install -y git
  fi
}

function install_jdk() {
    echo "*******************************************************************************"
    echo "            ↓↓↓↓↓↓ [检查环境：java] ↓↓↓↓↓↓         "
    which java
    if [ "$?" -eq 1 ]; then
    	echo "安装jdk..."
    	yum -y install java-1.8.0-openjdk*
      # 配置环境变量 -- 注意$前加上\ 避免shell中获取其变量值追加到配置文件中
cat>> /etc/profile <<EOF

############################## ↓↓↓↓↓↓ set java environment ↓↓↓↓↓↓ #############################
JAVA_HOME=/usr/lib/jvm/java
CLASSPATH=.:\$JAVA_HOME/lib/dt.jar:\$JAVA_HOME/lib/tools.jar:\$JAVA_HOME/jre/lib/rt.jar
PATH=\$PATH:\$JAVA_HOME/bin
export JAVA_HOME CLASSPATH PATH
###############################################################################################

EOF
      # 使配置生效
      . /etc/profile
    fi
}

function install_maven() {
    echo "*******************************************************************************"
    echo "            ↓↓↓↓↓↓ [检查环境：maven] ↓↓↓↓↓↓         "
    which mvn
    if [ "$?" -eq 1 ]; then
    	echo "安装maven..."
    	mkdir -p /home/soft/maven/repository
      cd /home/soft/maven
    	wget https://mirrors.bfsu.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
      # 解压
      tar -zxvf apache-maven-3.6.3-bin.tar.gz
      # 修改配置文件
      isExist=$(cat /home/soft/maven/apache-maven-3.6.3/conf/settings.xml | grep "<localRepository>/home/soft/maven/repository</localRepository>")
      if [[ "$isExist" == "" ]]
      then
          # 不包含
          # 在第55行插入
          sed -i '55i <localRepository>/home/soft/maven/repository</localRepository>' /home/soft/maven/apache-maven-3.6.3/conf/settings.xml
          # 在第160行插入
          sed -i '160i \
              <!-- 国内中央仓库的配置-阿里云中央仓库 --> \
              <mirror> \
                  <id>nexus-aliyun</id> \
                  <mirrorOf>central</mirrorOf> \
                  <name>Nexus aliyun</name> \
                  <url>http://maven.aliyun.com/nexus/content/groups/public</url> \
              </mirror> \
          ' /home/soft/maven/apache-maven-3.6.3/conf/settings.xml
      fi
      # 配置环境变量
cat>> /etc/profile <<EOF

############################## ↓↓↓↓↓↓ set maven environment ↓↓↓↓↓↓ #############################
MAVEN_HOME=/home/soft/maven/apache-maven-3.6.3
PATH=\$PATH:\$JAVA_HOME/bin:\$MAVEN_HOME/bin
export MAVEN_HOME PATH
################################################################################################

EOF
      # 使配置生效
      source /etc/profile
    fi
}

function install_nodejs() {
    echo "*******************************************************************************"
    echo "            ↓↓↓↓↓↓ [检查环境：NodeJS] ↓↓↓↓↓↓         "
    which npm
    if [ "$?" -eq 1 ]; then
    	echo "安装NodeJS..."
    	mkdir -p /home/soft
      cd /home/soft
    	wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
      # 解压
      tar -xvf node-v12.18.3-linux-x64.tar.xz
      # 配置环境变量
cat>> /etc/profile <<EOF

############################## ↓↓↓↓↓↓ set nodejs environment ↓↓↓↓↓↓ #############################
NODEJS_HOME=/home/soft/node-v12.18.3-linux-x64
PATH=\$PATH:\$NODEJS_HOME/bin
export NODEJS_HOME PATH
#################################################################################################

EOF
      # 使配置生效
      source /etc/profile
      # 将npm软连接到`/usr/bin`目录下 => 解决`sudo: npm：找不到命令`问题
      sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/node /usr/bin/node
      sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/npm /usr/bin/npm
      sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/cnpm /usr/bin/cnpm
      sudo ln -s /home/soft/node-v12.18.3-linux-x64/bin/npx /usr/lib/npx
      # 设置淘宝`NPM`镜像
      npm install -g cnpm --registry=https://registry.npm.taobao.org
    fi
}

# 停止
function stop(){
  echo "<-------------------------------------->"
  echo "[${APP_NAME}] ... stop ..."
  # 查看该jar进程
  pid=`ps -ef | grep ${APP_JAR} | grep -v 'grep' | awk '{print $2}'`
  echo "[${APP_NAME}] pid="${pid}
  # 存在则kill,不存在打印一下吧
  if [ "${pid}" ]; then
    kill -9 ${pid}
      # 检查kill是否成功
      if [ "$?" -eq 0 ]; then
          echo "[${APP_NAME}] stop success"
      else
          echo "[${APP_NAME}] stop fail"
      fi
  else
    echo "[${APP_NAME}] 进程不存在"
  fi
}


# 运行
function start(){
  echo "<-------------------------------------->"
  echo "[${APP_NAME}] ... start ..."
  cd ${APP_JAR_HOME}
  echo "当前路径:`pwd`"
  # 赋予可读可写可执行权限
  chmod 777 ${APP_JAR}
  echo "启动命令: nohup java -jar ${APP_JAR} ${JAVA_OPTS} >> ${APP_LOG_HOME}/${APP_NAME}.log 2>&1 &"
  nohup java -jar ${APP_JAR} ${JAVA_OPTS} >> ${APP_LOG_HOME}/${APP_NAME}.log 2>&1 &
  if [ "$?" -eq 0 ]; then
    echo "[${APP_NAME}] start success"
  else
    echo "[${APP_NAME}] start fail"
  fi
}


# 重启
function restart(){
  echo "<-------------------------------------->"
  echo "[${APP_NAME}] ... restart ..."
	stop
	start
}


# 多分支条件判断执行参数
case "${APP_OPT}" in
	"init")
		init
		;;
	"stop")
		stop
		;;
	"start")
		start
		;;
	"restart")
		restart
		;;
	*)
	echo "\033[41;37m 提示:不支持参数 命令 -> ${APP_OPT} \033[0m"
	;;
esac

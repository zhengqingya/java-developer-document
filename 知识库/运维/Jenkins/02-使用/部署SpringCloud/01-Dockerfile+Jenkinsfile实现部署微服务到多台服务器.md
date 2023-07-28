@[TOC](文章目录)

### 一、前言

1. [Jenkins(7) 参数化构建配置](https://zhengqing.blog.csdn.net/article/details/118879799)
2. [Jenkins(8) 远程服务器部署](https://zhengqing.blog.csdn.net/article/details/118882105)

本文将通过`Dockerfile`+`Jenkinsfile`方案实现部署SpringCloud微服务项目到多台服务器

项目地址 [https://gitee.com/zhengqingya/small-tools](https://gitee.com/zhengqingya/small-tools)

> 温馨小提示：本文示例项目基于码云仓库和阿里云镜像仓库环境

### 二、jenkins插件安装

1. Publish Over SSH : 远程发布
2. Extended Choice Parameter ：参数化构建
3. Git Parameter ： Git参数化

### 三、jenkins配置

#### 1、远程服务器配置

`Manage Jenkins` -> `Configure System`
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730562.png)
`Publish over SSH`配置

> 温馨小提示：多台服务器则配置多个...

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730586.png)

#### 2、全局凭证配置

> 注：后面Jenkinsfile中需要使用到这里配置的全局凭证

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730610.png)
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730632.png)

###### ① git全局凭证配置

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730656.png)

###### ② docker镜像仓库全局凭证配置

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730676.png)

配置完后如下：
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730697.png)

### 四、项目配置

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730720.png)

#### 1、Dockerfile

```
#FROM openjdk:8-jre-alpine   【 注：jre中并没有携带工具文件，但arthas需要依赖lib包和bin包里面的包和工具，arthas需要jps工具和lib包里的内容 具体参考：https://www.cnblogs.com/sky-chen/p/9887777.html 】
#FROM openjdk:8-jdk-alpine
#RUN apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/*
# 注：此镜像支持字体！
FROM registry.cn-hangzhou.aliyuncs.com/zhengqing/openjdk:8-jdk-alpine-font

# 维护者信息
MAINTAINER zhengqingya

# 构建镜像时传参数据
ARG APP_NAME
ARG APP_PORT
ARG JAVA_OPTS

# 设置环境变量-运行时也可传参进来耍哈
ENV APP_NAME ${APP_NAME}
ENV APP_JAR ${APP_NAME}.jar
ENV APP_PORT ${APP_PORT}
ENV JAVA_OPTS ${JAVA_OPTS}
# -XX:+UseG1GC -Xms64m -Xmx64m -Xmn16m -XX:MetaspaceSize=100m -XX:MaxMetaspaceSize=100m -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -Ddefault.client.encoding=UTF-8 -Dfile.encoding=UTF-8 -Duser.language=Zh -Duser.region=CN -Dspring.profiles.active=xx -Dspring.cloud.nacos.discovery.server-addr=xx -Dspring.cloud.nacos.discovery.username=nacos  -Dspring.cloud.nacos.discovery.password=nacos
# 远程调试参数： -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5001

# 解决时差8小时问题
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# copy arthas
COPY --from=hengyunabc/arthas:latest /opt/arthas /opt/arthas

ADD ${APP_JAR} /home/
RUN sh -c 'touch /'

VOLUME /tmp

# 对外暴漏的端口号
# [注：EXPOSE指令只是声明容器运行时提供的服务端口，给读者看有哪些端口，在运行时只会开启程序自身的端口！！]
EXPOSE ${APP_PORT}

# 让你先休息3秒再开始运动吧🏃🏃🏃
CMD echo "****** Start... " & \
    echo "****** APP_JAR: ${APP_JAR} " & \
    echo "****** APP_PORT: ${APP_PORT} " & \
    echo "****** JAVA_OPTS: ${JAVA_OPTS} " & \
    echo "****** ${APP_JAR} will run ..." & \
    sleep 3 & \
    echo "****** 运行命令：nohup java -jar ${JAVA_OPTS} /home/${APP_JAR} >> /home/${APP_NAME}.log 2>&1 &" & \
    nohup java -jar ${JAVA_OPTS} /home/${APP_JAR} >> /home/${APP_NAME}.log 2>&1 & \
    echo "****** 查看日志..." & \
    tail -f /home/${APP_NAME}.log
```

#### 2、Jenkinsfile

>
流水线语法可参考：[https://www.jenkins.io/zh/doc/book/pipeline/syntax](https://www.jenkins.io/zh/doc/book/pipeline/syntax)

```
// ==================== ↓↓↓↓↓↓ docker ↓↓↓↓↓↓ ====================
// 镜像仓库地址
def DOCKER_REGISTRY_URL = "registry.cn-hangzhou.aliyuncs.com"
// 镜像仓库命名空间名称
def DOCKER_REGISTRY_NAMESPACE = "zhengqingya"
// 镜像拉取凭证 => jenkins全局凭证中配置
def DOCKER_REGISTRY_AUTH = "aliyun_docker_registry_auth"


// ==================== ↓↓↓↓↓↓ git ↓↓↓↓↓↓ ====================
// git凭证 => jenkins全局凭证中配置
def GIT_AUTH = "gitee_auth"


// ==================== ↓↓↓↓↓↓ project ↓↓↓↓↓↓ ====================
// 项目-git地址
def PROJECT_GIT_URL = "https://gitee.com/zhengqingya/small-tools.git"
// 项目-公共模块名称
def PROJECT_SERVICE_COMMON_NAME = "small-tools-api/common"
def PROJECT_SERVICE_API_NAME = "small-tools-api/service-api"
// 项目-基础目录
def PROJECT_BASE_HOME = "/Users/zhengqingya/IT_zhengqing/soft/small-tools"
// 项目-服务日志目录
def PROJECT_SERVICE_LOG_HOME = "${PROJECT_BASE_HOME}/logs"
// 项目-jar文件目录
def PROJECT_JAR_HOME = "${PROJECT_BASE_HOME}/target"
// 项目-docker部署的历史jar目录
def PROJECT_DOCKER_HISTORY_JAR_HOME = "${PROJECT_BASE_HOME}/docker-history-jar"


node {
    // jenkins工作空间
    def JENKINS_WORKSPACE = "${WORKSPACE}"
    // 取哪一块网卡值
    def ETH_VALUE = ""
    // 当前时间
    def CURRENT_TIME = ""
    // 获取选择的项目服务名称
    def project_service_name_select = "${PROJECT_SERVICE_NAME}".split(",")
    // 获取选择的服务器名称
    def publish_ssh_server_select = "${PUBLISH_SSH_SERVER}".split(",")
    // app镜像tag
    def app_docker_image_tag = ""


    stage('初始化准备') {
        echo '****************************** 初始化准备 ******************************'
        // 网卡值设置 [注:正常linux取eth0的内网ip，局域网取enp5s0的内网ip]
        ETH_VALUE = sh(script: "( [[ \"${JAVA_OPTS}\" = *'-Dspring.cloud.nacos.discovery.ip'* ]] && echo enp5s0 || echo eth0 )", returnStdout: true).trim()
        CURRENT_TIME = sh(script: "echo `date +\"%Y-%m-%d %H:%M:%S\"`", returnStdout: true).trim()
        script {
            app_docker_image_tag = GIT_BRANCH.replaceAll('origin/', '')
        }
        echo "当前工作空间：${JENKINS_WORKSPACE}"
        echo "使用分支：${GIT_BRANCH}"
        echo "使用docker镜像tag：${app_docker_image_tag}"
        echo "使用网卡：${ETH_VALUE}"
        echo "当前时间：${CURRENT_TIME}"
        sh "mkdir -p ${PROJECT_SERVICE_LOG_HOME}"
        sh "mkdir -p ${PROJECT_JAR_HOME}"
        sh "mkdir -p ${PROJECT_DOCKER_HISTORY_JAR_HOME}"
    }


    stage('拉取代码') {
        echo '****************************** 拉取代码 ******************************'
        checkout([$class: 'GitSCM', branches: [[name: "${GIT_BRANCH}"]], extensions: [], userRemoteConfigs: [[credentialsId: "${GIT_AUTH}", url: "${PROJECT_GIT_URL}"]]])
        sh "pwd"
    }


    stage('公共工程打包') {
        echo '****************************** 公共工程打包 ******************************'
        sh "mvn -f ${PROJECT_SERVICE_COMMON_NAME} clean install -Dmaven.test.skip=true"
        sh "mvn -f ${PROJECT_SERVICE_API_NAME} clean install -Dmaven.test.skip=true"
    }

    stage('微服务打包&删除旧容器和镜像&推送镜像&部署远程服务器') {
        echo '****************************** 微服务打包&删除旧容器和镜像&推送镜像&部署远程服务器 ******************************'

        for (int i = 0; i < project_service_name_select.length; i++) {

            // 当前待处理项目
            def current_app_name = project_service_name_select[i];
            def current_app_jar = "${current_app_name}.jar";
            // 父工程
            def current_app_parent = ""
            // 端口号
            def current_app_port = ""

            echo "当前操作项目: ${current_app_name}"

            script {
                switch (current_app_name) {
                    case "demo":
                        current_app_parent = "small-tools-api/service"
                        current_app_port = "20040"
                        break
                    case "system":
                        current_app_parent = "small-tools-api/service"
                        current_app_port = "20010"
                        break
                    case "tool":
                        current_app_parent = "small-tools-api/service"
                        current_app_port = "20030"
                        break
                    case "gateway":
                        current_app_port = "1218"
                        current_app_parent = "small-tools-api"
                        break
                }
            }

            echo "当前操作项目： ${current_app_name} 端口：${current_app_port}"

            sh "mvn -f ${current_app_parent}/${current_app_name} clean install -Dmaven.test.skip=true"

            sh "cp ${current_app_parent}/${current_app_name}/target/${current_app_jar} ${JENKINS_WORKSPACE}/small-tools-api/docker"

            // app镜像
            def app_docker_image = "${DOCKER_REGISTRY_URL}/${DOCKER_REGISTRY_NAMESPACE}/${current_app_name}:${app_docker_image_tag}"

            echo "app镜像: ${app_docker_image}"

            // 删除旧容器
            sh "docker ps -a | grep ${current_app_name} | grep ${app_docker_image_tag} | awk '{print \$1}' | xargs -I docker stop {} | xargs -I docker rm {}"
            // 删除旧镜像
            sh "docker images | grep -E ${current_app_name} | grep ${app_docker_image_tag}| awk '{print \$3}' | uniq | xargs -I {} docker rmi --force {}"
            // 构建新镜像 -f:指定Dockerfile文件路径
            sh "cd ${JENKINS_WORKSPACE}/small-tools-api/docker && docker build -f Dockerfile --build-arg JAVA_OPTS=\"${JAVA_OPTS}\" --build-arg APP_NAME=${current_app_name} --build-arg APP_PORT=${current_app_port} -t ${app_docker_image} . --no-cache"


            echo '****************************** 推送镜像 ******************************'

            withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_AUTH}", passwordVariable: 'password', usernameVariable: 'username')]) {
                // 登录镜像仓库
                sh "docker login -u ${username} -p ${password} ${DOCKER_REGISTRY_URL}"
                // 推送镜像
                sh "docker push ${app_docker_image}"
                sh "echo 镜像推送成功：${app_docker_image}"
            }

            // 操作完后移除docker目录下的jar文件，防止下次docker将多个jar一起构建导致镜像过大问题
            sh "mv -f ${JENKINS_WORKSPACE}/small-tools-api/docker/*.jar ${PROJECT_DOCKER_HISTORY_JAR_HOME}/"


            echo '****************************** 项目部署 ******************************'

            // 遍历所有服务器，分别部署
            for (int j = 0; j < publish_ssh_server_select.length; j++) {
                // 获取当前服务器名称
                def currentServerName = publish_ssh_server_select[j]
                echo '开始发布远程机器'
                sshPublisher(publishers: [sshPublisherDesc(configName: "${currentServerName}",
                        transfers: [sshTransfer(cleanRemote: false, excludes: '',
                                execCommand: """
                                    // 远程服务器下依次执行如下命令
                                    // 删除旧容器
                                    docker ps -a | grep ${current_app_name} | grep ${app_docker_image_tag} | awk '{print \$1}' | xargs -i docker stop {} | xargs -i docker rm {}
                                    // 删除旧镜像
                                    docker images | grep -E ${current_app_name} | grep ${app_docker_image_tag}| awk '{print \$3}' | uniq | xargs -I {} docker rmi --force {}
                                    // 拉取新镜像
                                    docker pull ${app_docker_image}
                                    // 创建日志文件
                                    mkdir -p ${PROJECT_SERVICE_LOG_HOME}
                                    cd ${PROJECT_SERVICE_LOG_HOME}
                                    touch ${current_app_name}.log
                                    // 运行容器
                                    echo "*** ${CURRENT_TIME} docker run -d -p ${current_app_port}:${current_app_port} -e JAVA_OPTS="${JAVA_OPTS} -Dspring.cloud.nacos.discovery.ip=`ifconfig ${ETH_VALUE} | grep inet | grep -v inet6 | awk '{print \$2}'`" -v ${PROJECT_SERVICE_LOG_HOME}/${current_app_name}.log:/home/${current_app_name}.log --name ${current_app_name}  ${app_docker_image}" >> ${PROJECT_SERVICE_LOG_HOME}/run.log
                                    docker run -d -p ${current_app_port}:${current_app_port} -e JAVA_OPTS="${JAVA_OPTS} -Dspring.cloud.nacos.discovery.ip=`ifconfig ${ETH_VALUE} | grep inet | grep -v inet6 | awk '{print \$2}'`" -v ${PROJECT_SERVICE_LOG_HOME}/${current_app_name}.log:/home/${current_app_name}.log --name ${current_app_name}  ${app_docker_image}
                                """,
                                execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false,
                                patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '',
                                sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }

        }

    }

}
```

### 五、jenkins新建任务

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730749.png)
参数化配置
`GIT_BRANCH`
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730774.png)
`PROJECT_SERVICE_NAME`
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730797.png)
`PUBLISH_SSH_SERVER`

> 注：value值为之前在`Manage Jenkins` -> `Configure System`中配置的`SSH Server` Name值
> ![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730818.png)

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730841.png)
`JAVA_OPTS`
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730860.png)
流水线
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730880.png)
配置完成后应用保存

### 六、构建测试

> 温馨小提示：第1次构建的时候会出现如下情况，是因为未拉取远程git仓库获取分支信息，第2次就好了...
> ![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730905.png)

![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730933.png)

构建成功如下
![](./images/01-Dockerfile+Jenkinsfile实现部署微服务到多台服务器-20230728144730957.png)

一个简单的部署方案完成 `^_^`

### 七、其它

```shell
# 打包镜像 -f:指定Dockerfile文件路径
docker build -f Dockerfile --build-arg JAVA_OPTS="-XX:+UseG1GC -Xms64m -Xmx64m -Xmn16m -XX:MetaspaceSize=100m -XX:MaxMetaspaceSize=100m -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -Ddefault.client.encoding=UTF-8 -Dfile.encoding=UTF-8 -Duser.language=Zh -Duser.region=CN" --build-arg APP_NAME="demo" --build-arg APP_PORT="80" -t "registry.cn-hangzhou.aliyuncs.com/zhengqingya/demo:dev" . --no-cache

# 推送镜像
docker push registry.cn-hangzhou.aliyuncs.com/zhengqingya/demo:dev

# 拉取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/zhengqingya/demo:dev

# 运行
docker run -d -p 80:80 -v /home/zhengqingya/demo.log:/home/demo.log --name demo registry.cn-hangzhou.aliyuncs.com/zhengqingya/demo:dev

# 删除旧容器
#docker ps -a | grep demo | grep dev | awk '{print $1}' | xargs -i docker stop {} | xargs -i docker rm {}
docker ps -a | grep demo | grep dev | awk '{print $1}' | xargs -I docker stop {} | xargs -I docker rm {}

# 删除旧镜像
docker images | grep -E demo | grep dev | awk '{print $3}' | uniq | xargs -I {} docker rmi --force {}
```

---

> 今日分享语句：
> 总有一天，你会明白：你的委屈要自己消化，你的故事不用逢人就讲起；真正理解你的没有几个，大多人只会站在他们自己的立场，偷看你的笑话；你能做的就是把秘密藏起来，然后一步一步变得越来越强大！

FROM registry.cn-hangzhou.aliyuncs.com/zhengqing/openjdk:8-jdk-alpine

# 维护者信息
MAINTAINER zhengqingya

# 设置环境变量
ENV JAVA_OPTS "-XX:+UseG1GC -Xms100m -Xmx100m -Xmn32m -XX:MetaspaceSize=100m -XX:MaxMetaspaceSize=100m -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -Ddefault.client.encoding=UTF-8 -Dfile.encoding=UTF-8 -Duser.language=Zh -Duser.region=CN -Dspring.profiles.active=xx -Dspring.cloud.nacos.discovery.server-addr=xx -Dspring.cloud.nacos.discovery.username=nacos -Dspring.cloud.nacos.discovery.password=nacos"

# copy arthas
COPY --from=hengyunabc/arthas:latest /opt/arthas /opt/arthas

# 添加jar包到容器中
ADD *.jar /home/

# 对外暴漏的端口号
# [注：EXPOSE指令只是声明容器运行时提供的服务端口，给读者看有哪些端口，在运行时只会开启程序自身的端口！！]
EXPOSE 5000
EXPOSE 50001

# RUN 🏃🏃🏃
CMD echo "****** Run ... " & \
    nohup java -jar ${JAVA_OPTS} /home/app.jar >> /home/app.log 2>&1 & \
    echo "****** 查看日志..." & \
    tail -f /home/app.log

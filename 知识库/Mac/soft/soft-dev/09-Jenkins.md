###### Jenkins

```shell
# 创建目录
mkdir -p /zhengqingya/soft/soft-dev/jenkins
cd /zhengqingya/soft/soft-dev/jenkins
# 下载 【 根据自己需要的版本下载 http://mirrors.jenkins.io/war-stable 】
wget  http://mirrors.jenkins.io/war-stable/2.263.1/jenkins.war
# 启动 (这里指定新的端口10000运行)
nohup java -jar jenkins.war --ajp13Port=-1 --httpPort=10000 &

# 查看密码
cat /Users/zhengqingya/.jenkins/secrets/initialAdminPassword
# d8c40d8b5cab47ef94fe8eccda05fe48


# 关闭jenkins
http://ip:10000/exit 
# 重启jenkies
http://ip:10000/restart 
# 重新加载配置信息
http://ip:10000/reload 
```
# 01-部署一个简单的SpringBoot项目

### 新建任务

![img.png](images/jenkins-springboot-demo-01.png)

#### 源码管理 -> Git -> 填写项目地址与拉取认证信息

![img.png](images/jenkins-springboot-demo-02.png)

#### Build

```shell
clean package -Dmaven.test.skip=true
```

![img.png](images/jenkins-springboot-demo-03.png)

#### Post Steps

构建成功后执行shell命令运行项目

![img.png](images/jenkins-springboot-demo-04.png)

```shell
cd target
nohup java -jar demo-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
```

保存配置

### Build Now

![img.png](images/jenkins-springboot-demo-05.png)

#### 查看日志

![img.png](images/jenkins-springboot-demo-06.png)

![img.png](images/jenkins-springboot-demo-07.png)

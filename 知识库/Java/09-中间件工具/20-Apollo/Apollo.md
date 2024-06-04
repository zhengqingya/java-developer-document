### 部署

```
docker run -e SPRING_DATASOURCE_URL=jdbc:mysql://[MySQL_host]:[port]/ApolloConfigDB \
           -e SPRING_DATASOURCE_USERNAME=[MySQL_username] \
           -e SPRING_DATASOURCE_PASSWORD=[MySQL_password] \
           -p [config_service_port]:8080 \
           apolloconfig/apollo-configservice

docker run -e SPRING_DATASOURCE_URL=jdbc:mysql://[MySQL_host]:[port]/ApolloConfigDB \
           -e SPRING_DATASOURCE_USERNAME=[MySQL_username] \
           -e SPRING_DATASOURCE_PASSWORD=[MySQL_password] \
           -p [admin_service_port]:8090 \
           apolloconfig/apollo-adminservice

```



> [Apollo配置中心详解](https://blog.csdn.net/m0_66490875/article/details/136165444)

### 四个维度管理

#### 1、application

app.id 应用唯一身份标识

#### 2、environment

环境 

1. FAT（Feature Acceptance Test）：功能测试环境
2. UAT（User Acceptance Test）：集成测试环境
3. DEV（Develop）：开发环境
4. PRO（Produce）：生产环境

#### 3、cluster

集群配置，eg：上海机房、成都机房

#### 4、namespace

配置文件隔离

1. 私有 -- 其他应用无法访问
2. 公共 -- 多个应用可读取
3. 继承 -- 继承公共配置，可覆盖

### 配置更新策略

1. 配置中心主动更新推送配置
2. 客户端主动拉取服务端配置

长连接 -- 定时

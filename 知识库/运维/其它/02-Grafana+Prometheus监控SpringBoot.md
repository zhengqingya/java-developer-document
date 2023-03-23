# Grafana+Prometheus监控SpringBoot

### 一、前言

1. Prometheus：一个开源系统监控和警报工具包。
2. Grafana：Go语言开发的开源数据可视化工具，可以做数据监控和数据统计，带有告警功能。
3. Micrometer：收集Java性能数据

[运维(12) Prometheus+Grafana 搭建监控系统监控Linux主机](https://zhengqing.blog.csdn.net/article/details/120464947)

### 二、SpringBoot集成Micrometer

#### 1、`pom.xml`中引入依赖

```
<!-- micrometer:收集Java性能数据 -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

#### 2、`application.yml`配置

```
server:
  port: 9200

spring:
  application:
    name: demo

management:
  endpoints:
    web:
      exposure:
        include: '*'
  metrics:
    tags:
      application: ${spring.application.name}
```

#### 3、Micrometer配置

```
@Configuration
public class MetricsConfig {

    @Bean
    MeterRegistryCustomizer<MeterRegistry> configurer(
            @Value("${spring.application.name}") String applicationName) {
        return (registry) -> registry.config().commonTags("application", applicationName);
    }

}
```

启动应用，访问 [http://127.0.0.1:9200/actuator/prometheus](http://127.0.0.1:9200/actuator/prometheus)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9ceb1278ce743f980c04e85b2ff2344.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 三、部署Prometheus+Grafana

![在这里插入图片描述](https://img-blog.csdnimg.cn/db65ec8e55d747a29b9763e4d7c4044a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

```
# 准备
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose/Linux

# `docker-compose-prometheus.yml` 需修改grafana中配置的mysql连接信息
# `prometheus.yml` 自行配置

# 运行服务
docker-compose -f docker-compose-prometheus.yml -p prometheus up -d
```

1. grafana访问地址 `ip地址:3000`  
   默认登录账号密码：`admin/admin`
2. prometheus访问地址: `ip地址:9090`
3. exporter访问地址: `ip地址:9100/metrics`

![在这里插入图片描述](https://img-blog.csdnimg.cn/8d4ada76671440139993d172158e79d7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

注意`prometheus.yml`配置需和`springboot`应用对应  
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b08f9b94eb34e93beb3a92a30c2019d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 四、监控SpringBoot

#### 1、新增Prometheus数据源

`Configuration` -> `Data sources` -> `Add data source` -> `Prometheus`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/78b899ecc47c47ac9041b6cbc2b39acb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/db919f1efe9f4bbf9488f41d4b113307.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/38b4c638296f45c796b367af200ba9b3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、导入Dashboard

`Create` -> `Import`

> grafana面板资源 [https://grafana.com/grafana/dashboards/4701](https://grafana.com/grafana/dashboards/4701)

![在这里插入图片描述](https://img-blog.csdnimg.cn/053ec6365411408b8eb791aa3079b087.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/f1655c9f36e44114ba9fc3b484672305.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/2bdecb737d06465388819daa7d472b43.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 五、邮件告警

#### 1、配置`grafana.ini`

![在这里插入图片描述](https://img-blog.csdnimg.cn/8022ff90bd4944cca15fa5b7908a5806.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

```
#################################### SMTP / Emailing ##########################
[smtp]
# 是否启用
enabled = true
# 服务地址
host = smtp.qq.com:465
# 邮箱用户名
user = xxx@qq.com
# If the password contains # or ; you have to wrap it with triple quotes. Ex """#password;"""
# 授权密码
password = xxx
;cert_file =
;key_file =
skip_verify = true
# 邮件From地址
from_address = xxx@qq.com
from_name = Grafana
# EHLO identity in SMTP dialog (defaults to instance_name)
;ehlo_identity = dashboard.example.com
# SMTP startTLS policy (defaults to 'OpportunisticStartTLS')
;startTLS_policy = NoStartTLS

[emails]
;welcome_email_on_sign_up = false
;templates_pattern = emails/*.html
```

#### 2、`Alerting` -> `Notification channels`

![在这里插入图片描述](https://img-blog.csdnimg.cn/b45390050e654dadb339838fc7c19959.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/d4e81c9d6f1e4455a6605605e70fd901.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
测试发送通知  
![在这里插入图片描述](https://img-blog.csdnimg.cn/28cf53f71dc548ee970e3e811abe5285.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、`Add panel`

![在这里插入图片描述](https://img-blog.csdnimg.cn/7bdb2fadb48243f9b7a5cfe2f310b208.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
仿造`Heap used`配置一个

> tips: `Metrics browser`中不支持`模板变量` ( ex: `$application` )

```
sum(jvm_memory_used_bytes{application="demo", instance="192.168.101.88:9200", area="heap"})*100/sum(jvm_memory_max_bytes{application="demo",instance="192.168.101.88:9200", area="heap"})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/33bfeae5c7124d09afd4f610b6afb7f5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/35fc6382c36c4be8afd85af06aa1d7c6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
Apply  
![在这里插入图片描述](https://img-blog.csdnimg.cn/bb78b80be37547c9991023f56943666a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
超标告警通知  
![在这里插入图片描述](https://img-blog.csdnimg.cn/ae60b042770f41cbb19dc20fabf83932.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/8b1a153484f64b538cc4e989c5e353a8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 六、本文案例demo源码

[https://gitee.com/zhengqingya/java-workspace](https://gitee.com/zhengqingya/java-workspace)

---

> 今日分享语句：  
> 不奋斗，你的才华如何配得上你的任性。  
> 不奋斗，你的脚步如何赶得上父母老去的速度。  
> 不奋斗，世界这么大你靠什么去看看。

# Grafana+Prometheus搭建Linux监控系统

### 一、docker-compose部署

```
# 环境准备
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose/Linux
# 注：
# 	1. `docker-compose-prometheus.yml` 需修改grafana中配置的mysql连接信息
# 	2. `prometheus.yml` 自行配置
# 运行
docker-compose -f docker-compose-prometheus.yml -p prometheus up -d
```

### 二、访问

#### 1、exporter

`http://ip地址:9100/metrics`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/5aa4931794174f6cb264764eef7bbdeb.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、prometheus

`http://ip地址:9090/targets`

`Status` -> `Targets`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/b485c63b1b384be39d93364b5ec0d16e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、grafana

`http://ip地址:3000`  
默认登录账号密码：`admin/admin`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/973b6aa131474de2ab905d3e1d571cdf.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 三、Grafana配置

#### 1、新增Prometheus数据源

`Configuration` -> `Data sources` -> `Add data source` -> `Prometheus`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/0718abb1428248fc8d7266695483812e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/442ddc1296294a67b851af519c9f89ee.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
配置prometheus地址  
![在这里插入图片描述](https://img-blog.csdnimg.cn/8e5de565fe02420fbaa142cea3d31e07.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
保存并测试连接  
![在这里插入图片描述](https://img-blog.csdnimg.cn/00cb23f92c604d8a91934e2a8263a389.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、导入Prometheus Dashboard

`Create` -> `Import`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/b90fe1a4a6c04d48ad67da68c466cc09.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
输入`8919`

> 温馨小提示：资源可从 [https://grafana.com/grafana/dashboards](https://grafana.com/grafana/dashboards) 中选择

![在这里插入图片描述](https://img-blog.csdnimg.cn/9fefcd88de294af79b0533c71aaf4f98.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/bbb6b8cc1af94cc0a51d5e6e5f49eed3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
查看Linux监控信息如下  
![在这里插入图片描述](https://img-blog.csdnimg.cn/4acd571bad0540a4b2f5e83848c61aa6.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

---

> 今日分享语句：  
> 不论你在什么时候开始，重要的是开始之后就不要停止。


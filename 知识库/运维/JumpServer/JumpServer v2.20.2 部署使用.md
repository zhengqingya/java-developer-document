@[TOC](文章目录)

### 一、前言

JumpServer 是全球首款开源的堡垒机，使用 GNU GPL v3.0 开源协议，是符合 4A 规范的运维安全审计系统。

本文将基于`CentOS Linux release 7.6.1810 (Core)`对`JumpServer v2.20.2`进行部署使用。

[https://github.com/jumpserver/jumpserver](https://github.com/jumpserver/jumpserver)

### 二、部署

#### 1、在线一键部署

```shell
# 默认会安装到 /opt/jumpserver-installer-v2.20.2 目录
curl -sSL https://github.com/jumpserver/jumpserver/releases/download/v2.20.2/quick_start.sh | bash

# 安装完成后配置文件 /opt/jumpserver/config/config.txt

cd /opt/jumpserver-installer-v2.20.2

# 启动
./jmsctl.sh start
# 停止
./jmsctl.sh down
# 卸载
./jmsctl.sh uninstall
# 帮助
./jmsctl.sh -h
```

#### 2、离线部署

>
下载 [https://community.fit2cloud.com/#/products/jumpserver/downloads](https://community.fit2cloud.com/#/products/jumpserver/downloads)

```shell
cd /opt
tar zxvf jumpserver-offline-installer-v2.20.2-amd64-19.tar.gz
cd jumpserver-offline-installer-v2.20.2-amd64-19

# 根据需要修改配置文件模板, 如果不清楚用途可以跳过修改
cat config-example.txt

# 安装
./jmsctl.sh install

# 安装完成后配置文件 /opt/jumpserver/config/config.txt

# 启动
./jmsctl.sh start
# 停止
./jmsctl.sh down
# 卸载
./jmsctl.sh uninstall
# 帮助
./jmsctl.sh -h
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a5a56336702f41318bb85561ae9e93e8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b03823f88d9048a291812851aac2cb0e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、docker-compose部署

> 参考 [https://github.com/jumpserver/Dockerfile](https://github.com/jumpserver/Dockerfile)

```shell
# 准备
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose/Linux/jumpserver
cp config_example.conf .env
# 运行
docker-compose -f docker-compose-redis.yml -f docker-compose-mariadb.yml -f docker-compose.yml up
```

### 三、Web访问

访问地址: `ip:80`
默认账号密码:  `admin/admin`
![在这里插入图片描述](https://img-blog.csdnimg.cn/4cb2606f9d144015a8b9c04cad4c5fd0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/1c7d3c60279b4d23ae8351ab9e865e16.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 四、使用

#### 1、分配用户

##### a、用户管理 -- 创建角色

![在这里插入图片描述](https://img-blog.csdnimg.cn/09bb481e852d46909b5e0ef39eb42910.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
分配权限
![在这里插入图片描述](https://img-blog.csdnimg.cn/109d38e3a8a942c5b8f764bdd4411f1c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### b、用户管理 -- 创建用户组

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5d83de4e6e5489f83bcc9654db013d7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### c、用户管理 -- 创建用户

![在这里插入图片描述](https://img-blog.csdnimg.cn/1f68c0d16e184d2392f8e08d1fe4b1df.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### d、切换`test`账号登录查看访问权限

使用测试账号`test/123456`去登录访问看看
![在这里插入图片描述](https://img-blog.csdnimg.cn/5f3a2222377e4025a6cc23883faa7e79.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9719aa4429b4248b9ac6761cf78f5bf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、创建资产

##### a、资产管理 -- 创建系统用户 -- 特权用户

![在这里插入图片描述](https://img-blog.csdnimg.cn/803cb414bdc345d1b84ce37e4a3d54c7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### b、资产管理 -- 创建资产

![在这里插入图片描述](https://img-blog.csdnimg.cn/bbe68d9381ff40ceb6c055a88b01e26a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4610ca82e50243e0936cad0350c167bd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/12072536612a4953844d96c61ce814de.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、给用户分配资产

##### a、权限管理 -- 创建资产授权规则

![在这里插入图片描述](https://img-blog.csdnimg.cn/e338d9950c294060942dedceece40062.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/66523d823abd454da07157f2fe173367.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### b、切换`test`账号登录查看资产

![在这里插入图片描述](https://img-blog.csdnimg.cn/b5d0d358371e49f78b93e2ecb05c46d9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
进入web终端
![在这里插入图片描述](https://img-blog.csdnimg.cn/773f82af1dfd43eebe004b427653ddd9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 4、创建应用

##### a、资产管理 -- 创建系统用户 -- 普通用户 -- MySQL

![在这里插入图片描述](https://img-blog.csdnimg.cn/8a329d71da1c42f2bf66cc9425c7b969.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### b、应用管理 -- 创建数据库应用

![在这里插入图片描述](https://img-blog.csdnimg.cn/a2dcb378d7ae4c73befb8bd5bd503c30.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 5、给用户分配应用

##### a、权限管理 -- 创建应用授权规则

![在这里插入图片描述](https://img-blog.csdnimg.cn/9ff9a02cae77447bac43b9c4d2288d04.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

##### b、切换`test`账号登录查看应用

> tips: 记得给此账号分配应用权限 `^_^`

![在这里插入图片描述](https://img-blog.csdnimg.cn/52c795e82fa0473da40653d041163e84.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
进入web终端
![在这里插入图片描述](https://img-blog.csdnimg.cn/78f5a1786e524668976db9c0bac7464e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

--- 

> 今日分享语句：
> 快乐要懂得分享，才能加倍的快乐。


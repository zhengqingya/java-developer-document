@[TOC](文章目录)

### 一、前言

![在这里插入图片描述](https://img-blog.csdnimg.cn/dd47362a8fbd47d4809f5faad0add12c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
[https://github.com/ehang-io/nps](https://github.com/ehang-io/nps)

### 二、CentOS7.6上启动服务端

```shell
# 下载服务端
wget https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_amd64_server.tar.gz
# 解压
tar -zxvf linux_amd64_server.tar.gz

# 安装
sudo ./nps install

# 修改配置 `nps.conf` -- 这里默认配置也可  【 小编因端口占用问题，修改了 http_proxy_port 和 https_proxy_port 】
vim /etc/nps/conf/nps.conf

# 启动
sudo nps start

# 查看日志
tail -fn 100 /var/log/nps.log
```

访问 `ip:8080`
默认账号密码 `admin/123`
![在这里插入图片描述](https://img-blog.csdnimg.cn/57dbfee5b04d49f0b59cc8b59d1305ff.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a72f4ed984404f80b08a40d9a4709025.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 新增客户端

![在这里插入图片描述](https://img-blog.csdnimg.cn/a8265a1db49647549adbee571c615ecd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 新增TCP隧道

访问 `8100` 端口可代理到本地 `127.0.0.1:20040`
![在这里插入图片描述](https://img-blog.csdnimg.cn/b7cc9b7f667840eaa9ee1e2ca1c0ef1d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 三、Windows上启动客户端

>
下载解压 [https://github.com/ehang-io/nps/releases/download/v0.26.10/windows_386_client.tar.gz](https://github.com/ehang-io/nps/releases/download/v0.26.10/windows_386_client.tar.gz)

```shell
npc.exe -server=www.zhengqingya.com:8024 -vkey=test123 -type=tcp
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8788521f9a714e1380075691229c77e5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
客户端启动成功后，可在服务端中查看是否在线
![在这里插入图片描述](https://img-blog.csdnimg.cn/adc953841ec145c083a0ea27e03fb685.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 四、访问测试

访问 `8100` 端口可代理到本地 `127.0.0.1:20040`
![在这里插入图片描述](https://img-blog.csdnimg.cn/1c6b2ac73b5f4bc385224c7680493cb3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 五、SSH连接局域网Linux服务器

#### 1、修改 `TCP隧道` -> `目标 (IP:端口)` -> `127.0.0.1:22`

![在这里插入图片描述](https://img-blog.csdnimg.cn/9fc7898a6f114de79b9bea7aa844248e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、局域网Linux服务器启动客户端

```shell
# 下载服务端
wget https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_amd64_client.tar.gz
# 解压
tar -zxvf linux_amd64_client.tar.gz

# 赋予可执行权限
chmod +x npc

# 启动
sudo ./npc -server=www.zhengqingya.com:8024 -vkey=test123 -type=tcp
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/cf186b1e9c614a7bb5fd12342478f9f9.png)

#### 3、SSH 连接

![在这里插入图片描述](https://img-blog.csdnimg.cn/8dd5527a7e724fdaa3cca8deecd4deea.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/49baa074b4724e7e9fe12f340a0260b3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 六、docker-compose部署NPS

> 可参考 [https://gitee.com/zhengqingya/docker-compose](https://gitee.com/zhengqingya/docker-compose)

```shell
# 准备
git clone https://gitee.com/zhengqingya/docker-compose.git
cd docker-compose/Linux

# 运行服务端 NPS
docker-compose -f docker-compose-nps.yml -p nps up -d

# 运行客户端 NPC
docker run -d --name npc --net=host ffdfgdfg/npc:v0.26.10 -server=服务端ip地址:8024 -vkey=唯一验证密钥 -type=tcp
```

--- 

> 今日分享语句：
> 在改变自己心态的瞬间，人生就出现了转机，此前的恶性循环会被切断，良性循环就开始了。

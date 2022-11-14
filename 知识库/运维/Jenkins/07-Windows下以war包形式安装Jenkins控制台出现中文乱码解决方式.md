### 一、问题

如下图，我在Windows下以war包形式放在tomcat上运行Jenkins后，控制台输出信息出现中文乱码...
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190711134934394.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 二、解决

#### （1）全局设置新增参数

http://localhost:8080/jenkins/configure
进入全局设置找到全局属性新增键值对 LANG < - > zh_CN.UTF-8 ，保存
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190711134306234.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

#### （2）修改tomcat安装目录下的server.xml配置文件

修改 **URIEncoding="utf-8"** 为 **useBodyEncodingForURI="true"**


> 如果没有 **URIEncoding="utf-8"** ， 直接添加 **useBodyEncodingForURI="true"** 即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190711141552311.png)

#### （3）配置计算机环境变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190711141357207.png)

#### （4）重启Jenkins

重启之后，进入控制台查看输出信息，如下图，成功解决中文乱码！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190711142808529.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

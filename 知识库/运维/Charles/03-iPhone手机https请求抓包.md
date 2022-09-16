@[TOC](文章目录)

### 一、前言

1.

Charles请求转发可参考 [https://zhengqing.blog.csdn.net/article/details/111597213](https://zhengqing.blog.csdn.net/article/details/111597213)

2. Charles下载地址 [https://www.charlesproxy.com/download](https://www.charlesproxy.com/download)
3. 解决半小时使用 [https://www.zzzmode.com/mytools/charles](https://www.zzzmode.com/mytools/charles)

本文将基于`Charlesv4.6.2`版本进行iPhone的https请求抓包 `^_^`

### 二、Charles代理开启

`Proxy` -> `Proxy Settings`
![在这里插入图片描述](https://img-blog.csdnimg.cn/40a5b40f651d4d46854d7d0f58d3b24c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`Proxy` -> `SSL Proxying Settings...`
![在这里插入图片描述](https://img-blog.csdnimg.cn/30cd480a0dfa47f0ade37957712a95a6.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/d13f5bf64534437fb3700dfce03390a0.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 三、iPhone手机代理配置

`设置` -> `无线局域网` -> `WiFi配置`
![在这里插入图片描述](https://img-blog.csdnimg.cn/041ac210f8704cb4b7a7b026bcc306a7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
服务器填写自己的电脑ip地址，端口即上面Charles中配置的
![在这里插入图片描述](https://img-blog.csdnimg.cn/3001284111684120944163159405b281.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
接下来Charles会收到下面的连接消息，允许即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/6c1c183063be43b9895e219c9887b80b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
手机再次访问网络时，Charles便会获取到手机上的网络请求。
但对于https请求，会出现如下情况，抓取不到...
![在这里插入图片描述](https://img-blog.csdnimg.cn/516508db3180461bacbe3e4020f6e602.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
下面来解决这个问题

### 四、iPhone手机ssl证书安装

手机浏览器中访问 [http://chls.pro/ssl](http://chls.pro/ssl) 下载ssl证书
![在这里插入图片描述](https://img-blog.csdnimg.cn/930fa25b0c3a485797c549e34869f5b7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/3a684d425f394368a80b299f32dc2a70.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`设置`
![在这里插入图片描述](https://img-blog.csdnimg.cn/65b2b97cd56e449f9080e90b7a481529.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/6b675a42aeb5480b96bf578ff789c6dd.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/924e354d4c8243b3965730533e60a2a3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`设置` -> `通用` -> `关于本机` -> `证书信任设置`
![在这里插入图片描述](https://img-blog.csdnimg.cn/74230f7bb09c463589ce6e6f5e72c85b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
手机证书到这里已经处理完成，再次发起https请求测试抓包，发现正常了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/83925302759d499582ea9d3610f4e9fe.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 五、其它

如果出现无法抓取手机https的时候，可尝试保存电脑的证书提供给手机下载使用
![charles-ssl-save.png](images/charles-ssl-save.png)

---

> 今日分享语句：
> 征服畏惧、建立自信的最快最确实的方法，就是去做你害怕的事，直到你获得成功的经验。

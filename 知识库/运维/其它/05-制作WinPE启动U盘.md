# 制作WinPE启动U盘

### 一、前言

本文将基于`Dell Inspiron 7577`笔记本使用`微PE工具箱`制作`WinPE`启动U盘  
![在这里插入图片描述](https://img-blog.csdnimg.cn/132cf1d808de4f9ca1ec1d25772c242a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 二、制作PE启动U盘

> 下载 [https://www.wepe.com.cn/download.html](https://www.wepe.com.cn/download.html)  
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/55a036da805a4c0997ea4f056f9729fc.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/d2ff92d33b5b47259a7ba092f3f5e06e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/0a4b6924be854063ad35fda0533563d2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/4f7cc209d1874aa5b0ebbd4942ce33c5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
完成之后，会多一个`EFI`分区  
![在这里插入图片描述](https://img-blog.csdnimg.cn/908027b86c1445dcb15d1789cafcef58.png)

### 三、进入PE

> 根据自己的电脑配置将BIOS设置为U盘启动方式

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad9ed4a5d56544ebae30b1e9ee1a7ca9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/cef6db08b87b44ddb972680814c4b975.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

### 四、WinPE安装win10系统

#### 1、下载win10镜像

[https://www.microsoft.com/zh-cn/software-download](https://www.microsoft.com/zh-cn/software-download)

#### 2、WinPE中装载ISO镜像

![在这里插入图片描述](https://img-blog.csdnimg.cn/b5ee2142d38f4061887e8a2ccdad6c41.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、`sources` -> `setup.exe` -> `运行安装界面`

![在这里插入图片描述](https://img-blog.csdnimg.cn/1f4d3ac1cc2949eb976d2e225913cb25.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b60f7f3b15b44af93de03d692e9bdd5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
后面就不说了，跟着提示操作即可`^_^`  
![在这里插入图片描述](https://img-blog.csdnimg.cn/b46491e2babd4ea7964f28a44792df4a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/c5c29c92c3cb4279b77bc28c6010d8bc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

---

> 今日分享语句：  
> 我不敢休息，因为我没有存款。  
> 我不敢说累，因为我没有成就。  
> 我不敢偷懒，因为我还要生活。  
> 我能放弃选择，但是我不能选择放弃。  
> 坚强拼搏是我唯一的选择。

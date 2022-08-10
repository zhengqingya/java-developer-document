@[TOC](文章目录)

### 一、前言

本文将基于windows系统制作U盘启动盘来安装centos7系统
![在这里插入图片描述](https://img-blog.csdnimg.cn/01644021ecf84154968f12874918d69a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


### 二、制作U盘启动盘

#### 1、下载CentOS的iso镜像

> [https://www.centos.org/download](https://www.centos.org/download)

![在这里插入图片描述](https://img-blog.csdnimg.cn/f855e7dd209d463e9e8d4a86a60966ff.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c69cb35e22dd4a99b8dd11645cb5c415.png)

#### 2、使用Rufus创建USB启动盘 -- 法一

> 下载Rufus [http://rufus.ie/zh](http://rufus.ie/zh)
> tips: 建议使用法一，法二可能会出现问题

双击运行即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/ed36d96769ba48b4bbb9fcd18d67d631.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8cf3dc1259dc488cb041c913168ec8e8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
成功后查看U盘内容如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/744b94af32ff4a05967bf3a352c92ce2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、使用UltraISO创建USB启动盘 -- 法二

>  下载UltraISO [https://gitee.com/zhengqingya/java-developer-document](https://gitee.com/zhengqingya/java-developer-document)
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/17e73f7bec0b41b59aaa4464f4866dc0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_16,color_FFFFFF,t_70,g_se,x_16)


双击安装自己玩吧`^_^`
![在这里插入图片描述](https://img-blog.csdnimg.cn/f6c91856a45e4812bc5d4cba0ceb73d4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)



`文件` -> `打开` -> `选择之前下载的 CentOS-7-x86_64-DVD-2009.iso 文件`
![在这里插入图片描述](https://img-blog.csdnimg.cn/d68d42cc3a9a488d9a7cc6438edbb784.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/48479c4f1d5f46bba69f8a46ad85f409.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`启动` -> `写入硬盘映像`
![在这里插入图片描述](https://img-blog.csdnimg.cn/ea4194a453254e6b93f6fafe46c8d6ff.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

> tips: 记得备份U盘中的数据防止丢失！
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/7fd75a3d870942618660b33f20abed3c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8f22bb5ba56749de9bb77ad6c1b88aaa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)




### 三、安装CentOS7系统

#### 1、设置U盘启动

> tips: 不同电脑配置自行百度如何进入`^_^`
> 这里以`Dell Inspiron 7577`为例

重启电脑，出现商标时按`F2`进入`BIOS`

`Secure Boot`  -> `Secure Boot Enable` -> `Disabled` -> `Apply`

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e17b0d6f06d4cc1840d2bfefdf2442c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`Security` -> `PTT security` -> `去掉勾选 PTT On` -> `Apply`
![在这里插入图片描述](https://img-blog.csdnimg.cn/f4b96cf4f0f544a080ca83f5a0fb5766.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`General` -> `Advanced Boot Options` -> `勾选 Enable Legacy Option ROMs` -> `Apply`
![在这里插入图片描述](https://img-blog.csdnimg.cn/0e11401510cb40888415e93028a82c65.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`System Configuration` -> `SATA Operation` -> `勾选AHCI` -> `Apply`
![在这里插入图片描述](https://img-blog.csdnimg.cn/87ab70a04da04867afebc1a2d9da244d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`General` -> `Boot Sequence` -> `Legacy` -> `Apply`
![在这里插入图片描述](https://img-blog.csdnimg.cn/a13f80dc4e094c55a68ee117f1ae70c6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`Exit` -> `重启电脑` -> `出现商标时按F12` -> `LEGACY BOOT` -> `USB Storage Device` -> `回车`
![在这里插入图片描述](https://img-blog.csdnimg.cn/2eaec5494a5c4e5a99617015b5f125a1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、安装CentOS7

![在这里插入图片描述](https://img-blog.csdnimg.cn/f4cf648fd91c48d58fd0cddf5429ba2e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e57f908a91324e26a0f1f58f6abf9f4e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/dc27f4cf1093476ca1ea80965e5cd8aa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
安装位置配置
![在这里插入图片描述](https://img-blog.csdnimg.cn/75f1f94433594b129f75341bbc9bb443.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9a5c9e8c5a142cfaf7a3946a8dfeb0b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/510b555547c442d384bff1e0cf66a8f2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/619645eda0654109b590e9ca2692c921.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_18,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/ea9e34e2015d4242af935c660b6c7a0e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
图形化配置
![在这里插入图片描述](https://img-blog.csdnimg.cn/604bbe73b81c4366a563331c59e5c54c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/919a9c509c1b4f3e864b19c3431b9182.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/3e3d860ad69244cc98a3a9812f9f1dcd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
`开始安装` -> `设置root密码`
![在这里插入图片描述](https://img-blog.csdnimg.cn/5237885146fc4ee5a3e00a9d51e467bc.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/94ecff6ada724bafa6d1fc9e6f744e6a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
下面自己配置即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/fa79725872444dea8108312882c7a66b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc7f27e0814046729a86048b9e059824.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

---

> 今日分享语句：
> 我们最值得自豪的不在于从不跌倒,而在于每次跌倒之后都爬起来。

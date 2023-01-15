@[TOC](文章目录)

### 一、前言

本文基于`Jenkins 2.289.2`环境

### 二、问题

jenkins在`Execute shell`中执行如下命令启动jar失败

```shell
nohup java -jar app.jar >> /home/logs/app.log  2>&1 &
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/15db5d0052ca4bd2b47a5aa36c6460cb.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

问题原因：shell脚本运行时会产生进程，而jenkins默认会自动终止产生进程！

>
可参考: [https://wiki.jenkins.io/display/JENKINS/ProcessTreeKiller](https://wiki.jenkins.io/display/JENKINS/ProcessTreeKiller)
![在这里插入图片描述](https://img-blog.csdnimg.cn/fa917fb321fc47b68edad119cdbdb2ec.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

### 三、解决

###### 法一：全局

`Manage Jenkins` -> `Manage Nodes and Clouds` -> `master` -> 设置
![在这里插入图片描述](https://img-blog.csdnimg.cn/60bb218f298443b88104f20688be64e5.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/fc373c6184c04e8db9df78bedb161053.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

`节点属性`添加环境变量：`BUILD_ID` -> `dontKillMe`

![在这里插入图片描述](https://img-blog.csdnimg.cn/e6c1d467de33440290b97d551ebf493d.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)

###### 法二：局部

在shell脚本前加上`BUILD_ID=dontKillMe`参数
![在这里插入图片描述](https://img-blog.csdnimg.cn/6b23fcaa43c44459ba6abaa3c69d22a4.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MjI1NTU4,size_16,color_FFFFFF,t_70)


---

> 今日分享语句：
> 只有登上山顶,才能看到那边的风光。

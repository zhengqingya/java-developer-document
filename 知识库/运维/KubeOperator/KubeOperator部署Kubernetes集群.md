@[TOC](文章目录)

### 一、前言

[运维(28) CentOS7.6安装KubeOperator](https://zhengqing.blog.csdn.net/article/details/124061737)

本文将基于`CentOS Linux release 7.6.1810 (Core)`通过`KubeOperator`部署`Kubernetes集群`

| 机器           | 说明         |
| -------------- | ------------ |
| 192.168.101.89 | KubeOperator |
| 192.168.101.90 | Kubernetes   |

### 二、KubeOperator配置

> KubeOperator文档 [https://kubeoperator.io/docs](https://kubeoperator.io/docs)

#### 1、系统设置 -- 仓库

> 地址：KubeOperator部署机ip

![在这里插入图片描述](https://img-blog.csdnimg.cn/36494b70284448d685d18730a2b19812.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 2、系统设置 -- 凭据

> 部署KubeSphere机器登录凭据

![在这里插入图片描述](https://img-blog.csdnimg.cn/cff502f8077f45ce879322b1d0587442.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 3、项目管理 -- 添加项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/0420e8fa43b740559e6ab5bb001418a3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)


#### 4、主机 -- 添加

![在这里插入图片描述](https://img-blog.csdnimg.cn/40ec660925bf42579d29e8ac038937f9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/821b583d40984061ba26274f3ed0e12a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 5、集群 -- 添加

![在这里插入图片描述](https://img-blog.csdnimg.cn/b4b37dad34814594b557e3131f092fbb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/791691106923417fb134867a34a7105d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8ff66db449c2492c93feab98fe596ed8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/fc5430704ba7409c9b6db7cac6ee994c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a415e1a4d20044a98850f65bde470059.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/9f9896f2e1da4abb80310f8d9be2c7b2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/7f305a0844274b3d9ca47dc25fcc48aa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2e448169e0414b178ff3cb12166e420d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
查看日志
![在这里插入图片描述](https://img-blog.csdnimg.cn/4b15d7366aa84128a9f123ad5721e10d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
等待集群完成
![在这里插入图片描述](https://img-blog.csdnimg.cn/449aa7552a064259ac0f4a1ddd330e03.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
点击`Dashboard`进入`KubePi`

> KubePi 是一款简单易用的开源 Kubernetes 可视化管理面板。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ede91ab1033343a38a528fd919f4e452.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)
查看集群详情 & 执行`WebKubeCtl`命令行

> WebKubectl 帮助您管理 Kubernetes 集群的凭据，并在 Web 浏览器中运行 kubectl 命令，从而不必在本地 PC 或其他服务器上安装 kubectl。

![在这里插入图片描述](https://img-blog.csdnimg.cn/fccdb707a91f48c5a417b444aef41d34.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6YOR5riF,size_20,color_FFFFFF,t_70,g_se,x_16)



--- 

> 今日分享语句：
> 善于把握生命的每一个瞬间,才能感受人生的每一个精彩。


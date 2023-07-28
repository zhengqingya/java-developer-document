# 制作U盘启动盘安装CentOS7

### 一、前言

本文将基于windows系统制作U盘启动盘来安装centos7系统  
![](./images/03-制作U盘启动盘安装CentOS7-1690510208674.png)

### 二、制作U盘启动盘

#### 1、下载CentOS的iso镜像

> [https://www.centos.org/download](https://www.centos.org/download)

![](./images/03-制作U盘启动盘安装CentOS7-1690510209232.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209278.png)

#### 2、使用Rufus创建USB启动盘 – 法一

> 下载Rufus [http://rufus.ie/zh](http://rufus.ie/zh)  
> tips: 建议使用法一，法二可能会出现问题

双击运行即可  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209299.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209321.png)  
成功后查看U盘内容如下  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209346.png)

#### 3、使用UltraISO创建USB启动盘 – 法二

>
下载UltraISO [https://gitee.com/zhengqingya/java-developer-document](https://gitee.com/zhengqingya/java-developer-document)
> ![](./images/03-制作U盘启动盘安装CentOS7-1690510209369.png)

双击安装自己玩吧`^_^`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209389.png)

`文件` -> `打开` -> `选择之前下载的 CentOS-7-x86_64-DVD-2009.iso 文件`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209411.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209437.png)  
`启动` -> `写入硬盘映像`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209465.png)

> tips: 记得备份U盘中的数据防止丢失！  
> ![](./images/03-制作U盘启动盘安装CentOS7-1690510209495.png)

![](./images/03-制作U盘启动盘安装CentOS7-1690510209518.png)

### 三、安装CentOS7系统

#### 1、设置U盘启动

> tips: 不同电脑配置自行百度如何进入`^_^`  
> 这里以`Dell Inspiron 7577`为例

重启电脑，出现商标时按`F2`进入`BIOS`

`Secure Boot` -> `Secure Boot Enable` -> `Disabled` -> `Apply`

![](./images/03-制作U盘启动盘安装CentOS7-1690510209538.png)  
`Security` -> `PTT security` -> `去掉勾选 PTT On` -> `Apply`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209683.png)  
`General` -> `Advanced Boot Options` -> `勾选 Enable Legacy Option ROMs` -> `Apply`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209807.png)  
`System Configuration` -> `SATA Operation` -> `勾选AHCI` -> `Apply`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510209921.png)  
`General` -> `Boot Sequence` -> `Legacy` -> `Apply`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210105.png)  
`Exit` -> `重启电脑` -> `出现商标时按F12` -> `LEGACY BOOT` -> `USB Storage Device` -> `回车`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210223.png)

#### 2、安装CentOS7

![](./images/03-制作U盘启动盘安装CentOS7-1690510210308.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210336.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210366.png)  
安装位置配置  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210411.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210439.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210482.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210509.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210536.png)  
图形化配置  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210558.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210583.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210624.png)  
`开始安装` -> `设置root密码`  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210654.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210679.png)  
下面自己配置即可  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210714.png)  
![](./images/03-制作U盘启动盘安装CentOS7-1690510210749.png)

---

> 今日分享语句：  
> 我们最值得自豪的不在于从不跌倒,而在于每次跌倒之后都爬起来。


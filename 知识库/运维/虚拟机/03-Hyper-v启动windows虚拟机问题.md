# Hyper-v启动windows虚拟机问题

### 问题

提示错误 `Start PXE over IPv4.`
![](./images/03-Hyper-v启动windows虚拟机问题-1707118975334.png)
然后变成下面这样
![](./images/03-Hyper-v启动windows虚拟机问题-1707118598768.png)

### 解决

![](./images/03-Hyper-v启动windows虚拟机问题-1707118809618.png)
![](./images/03-Hyper-v启动windows虚拟机问题-1707118863772.png)
然后重启显示如下
![](./images/03-Hyper-v启动windows虚拟机问题-1707119821734.png)
原因：虚拟机新建的硬盘格式与虚拟机设置不一致导致。

解决：重启的时候狂按F2

![](./images/03-Hyper-v启动windows虚拟机问题-1707121368366.png)

> 我这里失败了... 
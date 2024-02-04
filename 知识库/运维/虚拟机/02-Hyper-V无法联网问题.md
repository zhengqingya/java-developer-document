# 虚拟机Hyper-V无法联网问题

### 法一

![](./images/02-Hyper-V无法联网问题-1706843349788.png)
![](./images/02-Hyper-V无法联网问题-1706843562941.png)
为虚拟交换机命名 -> 应用
![](./images/02-Hyper-V无法联网问题-1706843785027.png)

网络连接中查看刚刚新建的虚拟交换机
![](./images/02-Hyper-V无法联网问题-1706843915936.png)

然后选择现有的网络连接
![](./images/02-Hyper-V无法联网问题-1706844048531.png)
![](./images/02-Hyper-V无法联网问题-1706844089701.png)


然后在虚拟机设置中配置上面新建的虚拟机交换机
![](./images/02-Hyper-V无法联网问题-1706844561987.png)

然后重新启动虚拟机就可以正常联网了
![](./images/02-Hyper-V无法联网问题-1706844768525.png)

### 法二

新建虚拟交换机 选择 外部网络
![](./images/02-Hyper-V无法联网问题-1707032290949.png)

虚拟机 -> 设置 -> 网络适配器 选择刚才新建的即可
![](./images/02-Hyper-V无法联网问题-1707032332210.png)

![](./images/02-Hyper-V无法联网问题-1707040922377.png)


### 法三

> 参考 https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/user-guide/setup-nat-network#create-a-nat-virtual-network

### 关闭ipv6

> 源于windows系统上安装的虚拟机下载网速问题

```
echo 'net.ipv6.conf.all.disable_ipv6=1' >> /etc/sysctl.conf

echo 'NETWORKING_IPV6=no' >> /etc/sysconfig/network

# 修改 IPV6INIT=no          -- tips: 根据自己网卡信息来选择`ifcfg-eth0`或其他的
vim /etc/sysconfig/network-scripts/ifcfg-eth0

# 关闭防火墙的开机自启动
systemctl disable ip6tables.service

# 重启
reboot
```
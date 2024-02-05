# Dsniff套件安装

Dsniff是一个基于unix系统网络嗅探工具。

Dsniff是一个工具集，主要分为四类：

1. 纯粹被动地进行网络活动监视的工具，包括：dsniff、filesnarf、mailsnarf 、msgsnarf、urlsnarf、webspy;
2. 针对SSH和SSL的MITM（Man-In-The-Middle）"攻击"工具，包括sshmitm和webmitm;
3. 发起主动欺骗的工具，包括：arpspoof、dnsspoof、macof;
4. 其它工具，包括tcpkill、tcpnice。


```shell
# 更新软件列表
sudo apt-get update
# 从软件列表中下载安装dsniff
sudo apt-get install dsniff
# 测试是否安装成功
sudo arpspoof -h
```


